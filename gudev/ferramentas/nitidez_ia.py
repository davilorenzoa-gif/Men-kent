#!/usr/bin/env python3
"""Upscale 4x com Real-ESRGAN (realesr-general-x4v3) SEM torch: lê o .pth na mão, monta o ONNX e roda no onnxruntime.
Serve pra vídeo de IA em 720p ou vídeo de WhatsApp que vai virar tela cheia no celular (lição no 05).

Uso:
  python3 nitidez_ia.py modelo <saida.onnx>                 # baixa o .pth do GitHub e converte (uma vez só)
  python3 nitidez_ia.py quadros <modelo.onnx> <pasta_entrada> <pasta_saida> [largura_final]
       → cada .png/.jpg da pasta sai 4x maior (ou redimensionado pra largura_final), em .jpg q95

Precisa: numpy, onnx, onnxruntime, pillow. Velocidade (4 núcleos): ~3 s por quadro de 480x720.
"""
import io, os, pickle, sys, zipfile, subprocess
import numpy as np

URL = "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesr-general-x4v3.pth"


def ler_pth(path):
    """Lê um checkpoint do torch (formato zip) sem o torch."""
    z = zipfile.ZipFile(path)
    raiz = z.namelist()[0].split("/")[0]
    tipos = {"FloatStorage": np.float32, "HalfStorage": np.float16, "LongStorage": np.int64, "IntStorage": np.int32}

    def rebuild(storage, offset, size, stride, *_):
        arr = storage
        if not size:
            return arr[offset:offset + 1].reshape(())
        n = 1 + sum((s - 1) * st for s, st in zip(size, stride))
        return np.lib.stride_tricks.as_strided(arr[offset:offset + n], size, [st * arr.itemsize for st in stride]).copy()

    class U(pickle.Unpickler):
        def find_class(self, mod, name):
            if name == "_rebuild_tensor_v2":
                return rebuild
            if name in tipos:
                return name
            if mod == "torch._utils" and name == "_rebuild_parameter":
                return lambda data, *a: data
            return super().find_class(mod, name)

        def persistent_load(self, pid):
            _, tipo, chave, _, _ = pid
            return np.frombuffer(z.read(f"{raiz}/data/{chave}"), tipos[tipo]).copy()

    return U(io.BytesIO(z.read(f"{raiz}/data.pkl"))).load()


def montar_onnx(pth, saida):
    import onnx
    from onnx import helper, TensorProto, numpy_helper
    sd = ler_pth(pth)
    sd = sd.get("params", sd.get("params_ema", sd))
    nodes, inits = [], []
    convs = sorted({int(k.split(".")[1]) for k in sd if k.endswith("weight") and sd[k].ndim == 4})
    x = "input"
    for i in convs:
        w, b = sd[f"body.{i}.weight"], sd[f"body.{i}.bias"]
        inits += [numpy_helper.from_array(w.astype(np.float32), f"w{i}"), numpy_helper.from_array(b.astype(np.float32), f"b{i}")]
        nodes.append(helper.make_node("Conv", [x, f"w{i}", f"b{i}"], [f"c{i}"], pads=[1, 1, 1, 1], kernel_shape=[3, 3]))
        x = f"c{i}"
        pk = f"body.{i + 1}.weight"
        if pk in sd and sd[pk].ndim == 1:
            inits.append(numpy_helper.from_array(sd[pk].astype(np.float32).reshape(-1, 1, 1), f"p{i}"))
            nodes.append(helper.make_node("PRelu", [x, f"p{i}"], [f"a{i}"]))
            x = f"a{i}"
    nodes.append(helper.make_node("DepthToSpace", [x], ["up"], blocksize=4, mode="CRD"))
    inits.append(numpy_helper.from_array(np.array([1, 1, 4, 4], np.float32), "scales"))
    nodes.append(helper.make_node("Resize", ["input", "", "scales"], ["base"], mode="nearest"))
    nodes.append(helper.make_node("Add", ["up", "base"], ["output"]))
    g = helper.make_graph(nodes, "srvgg", [helper.make_tensor_value_info("input", TensorProto.FLOAT, [1, 3, "h", "w"])],
                          [helper.make_tensor_value_info("output", TensorProto.FLOAT, [1, 3, "H", "W"])], inits)
    m = helper.make_model(g, opset_imports=[helper.make_opsetid("", 17)])
    m.ir_version = 8
    onnx.checker.check_model(m)
    onnx.save(m, saida)
    print("ONNX salvo:", saida, f"({len(convs)} convs)")


def quadros(modelo, ent, sai, largura=None):
    import onnxruntime as ort
    from PIL import Image
    os.makedirs(sai, exist_ok=True)
    so = ort.SessionOptions()
    so.intra_op_num_threads = int(os.environ.get("THREADS", os.cpu_count()))
    s = ort.InferenceSession(modelo, so, providers=["CPUExecutionProvider"])
    arqs = sorted(f for f in os.listdir(ent) if f.lower().endswith((".png", ".jpg", ".jpeg")))
    parte, total = [int(v) for v in os.environ.get("PARTE", "0/1").split("/")]
    for f in arqs[parte::total]:
        dst = os.path.join(sai, os.path.splitext(f)[0] + ".jpg")
        if os.path.exists(dst) or not os.path.exists(os.path.join(ent, f)):
            continue
        im = np.asarray(Image.open(os.path.join(ent, f)).convert("RGB"), np.float32) / 255
        y = s.run(None, {"input": im.transpose(2, 0, 1)[None]})[0][0]
        out = Image.fromarray((np.clip(y, 0, 1).transpose(1, 2, 0) * 255 + 0.5).astype(np.uint8))
        if largura:
            out = out.resize((largura, round(out.height * largura / out.width)), Image.LANCZOS)
        out.save(dst, quality=95)
        print(dst, flush=True)


if __name__ == "__main__":
    if sys.argv[1] == "modelo":
        pth = os.path.splitext(sys.argv[2])[0] + ".pth"
        if not os.path.exists(pth):
            subprocess.run(["curl", "-sSfL", "-o", pth, URL], check=True)
        montar_onnx(pth, sys.argv[2])
    else:
        quadros(sys.argv[2], sys.argv[3], sys.argv[4], int(sys.argv[5]) if len(sys.argv) > 5 else None)
