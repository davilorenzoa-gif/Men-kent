"""Separa os 3 efeitos da Névoa em arquivos independentes em gudev/efeitos/ (o código é o mesmo do site, sem cópia à mão)."""
import re

src = open("sites/nevoa/index.html", encoding="utf-8").read()
L = src.split("\n")

def entre(ini, fim, incluir_fim=True):
    a = next(i for i, l in enumerate(L) if l.startswith(ini))
    b = next(i for i in range(a + 1, len(L)) if L[i].startswith(fim))
    return "\n".join(L[a:b + 1 if incluir_fim else b])

HELPERS = """const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
const toque = matchMedia("(pointer: coarse)").matches;
const $ = (s, el = document) => el.querySelector(s);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const hex = h => [parseInt(h.slice(1,3),16)/255, parseInt(h.slice(3,5),16)/255, parseInt(h.slice(5,7),16)/255];"""

FONTES = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">'

def pagina(titulo, css, corpo, js):
    return f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{titulo}</title>
{FONTES}
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{background:var(--fundo,#DAD5E2);color:#221B33;font:400 16px/1.5 Manrope,system-ui,sans-serif;overflow-x:hidden}}
canvas{{display:block}} button,input{{font:inherit;color:inherit}}
.nota{{position:fixed;left:12px;bottom:12px;z-index:50;max-width:min(520px,calc(100% - 24px));font-size:12px;background:rgba(255,255,255,.75);border-radius:10px;padding:8px 12px}}
{css}
</style>
</head>
<body>
{corpo}
<script>
(() => {{
"use strict";
{HELPERS}
{js}
}})();
</script>
</body>
</html>
"""

# ---------- 1. fumaça de fluido ----------
fluido = entra = entre("const Fluido = (() => {", "  return { fps: () => fps };") + "\n})();"
fluido = fluido.replace('const FUNDO = hex("#DAD5E2");', "const FUNDO = hex(CONFIG.fundo);")
fluido = fluido.replace("const TINTAS = [COR.coracao, COR.fundo, COR.saida, \"#D0577A\"];", "const TINTAS = CONFIG.tintas;")
assert "CONFIG.fundo" in fluido and "CONFIG.tintas" in fluido
js1 = """/* ===== TROQUE AQUI pra cada cliente =====
   fundo: cor da página (a fumaça "tinge" esse fundo como tinta na água; funciona melhor em fundo claro)
   tintas: as cores da fumaça, em ordem (cada borrifada e cada toque usa a próxima) */
const CONFIG = { fundo: "#DAD5E2", tintas: ["#6A55D0", "#C2702A", "#8FAE45", "#D0577A"] };
document.documentElement.style.setProperty("--fundo", CONFIG.fundo);
""" + fluido + """
if (Fluido) setInterval(() => { const f = Fluido.fps(); if (f) $("#fps").textContent = f + " quadros/s"; }, 600);
else $("#fps").textContent = "sem WebGL2: plano B em CSS";"""
css1 = """.topo{position:relative;height:100vh;height:100svh;min-height:520px;overflow:hidden;touch-action:pan-y;cursor:crosshair}
#fluido{position:absolute;inset:0;width:100%;height:100%}
.topo-fallback{position:absolute;inset:0;display:none;background:radial-gradient(40% 50% at 30% 60%,rgba(106,85,208,.28),transparent 70%),radial-gradient(35% 45% at 70% 40%,rgba(194,112,42,.25),transparent 70%)}
.sem-gl .topo-fallback{display:block}
.topo-texto{position:absolute;inset:0;display:grid;place-items:center;text-align:center;pointer-events:none;padding:0 16px}
.topo h1{font:400 clamp(72px,18vw,240px)/.85 "Bodoni Moda",Georgia,serif;letter-spacing:-.035em}
.dica{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);font-size:13px;font-weight:600;transition:opacity .6s}
.dica.some{opacity:0}
.borrifar{position:absolute;right:16px;bottom:18px;border:1px solid rgba(34,27,51,.16);background:rgba(255,255,255,.6);border-radius:99px;padding:10px 16px;font-size:13px;font-weight:600;cursor:pointer}
.nota{top:12px;bottom:auto}
@media (max-width:640px){.dica{bottom:76px}.borrifar{left:50%;right:auto;transform:translateX(-50%)}}"""
corpo1 = """<section class="topo" id="topo">
  <div class="topo-fallback" aria-hidden="true"></div>
  <canvas id="fluido" aria-hidden="true"></canvas>
  <div class="topo-texto"><h1>Fumaça</h1></div>
  <p class="dica" id="dica">Passe o dedo na fumaça</p>
  <button class="borrifar" id="borrifar" type="button">Borrifar de novo</button>
</section>
<p class="nota">Efeito da Névoa (24/11/2026): simulação de fluido Navier-Stokes em WebGL2, sem biblioteca. <b id="fps">--</b>. Cores em <code>CONFIG</code> no topo do script.</p>"""
open("gudev/efeitos/fumaca-fluido-gpu.html", "w", encoding="utf-8").write(pagina("Fumaça de fluido", css1, corpo1, js1))

# ---------- 2. evaporação na rolagem ----------
pele = entre("/* ===================================================================\n   WOW 2", "})();") if False else None
a = next(i for i, l in enumerate(L) if "WOW 2: o perfume abrindo na pele" in l) - 1
b = next(i for i in range(a, len(L)) if "WOW 3: monte o seu frasco" in L[i]) - 1
pele = "\n".join(L[a:b]).rstrip()
js2 = """/* ===== TROQUE AQUI =====
   COR: as 3 cores das famílias (no site: saída, coração, fundo). Os nomes que flutuam, as fases e as curvas
   ficam dentro do bloco (NOMES, FASES, curva). Serve pra qualquer coisa que "some em tempos diferentes":
   café esfriando, pão saindo do forno, tinta secando, maquiagem que dura. */
const COR = { saida:"#8FAE45", coracao:"#6A55D0", fundo:"#C2702A" };
""" + pele
html_pele = re.search(r'  <section class="pele".*?</section>', src, re.S).group(0)
css_ini = src.index("/* ---------- WOW 2: a pele hora a hora ---------- */")
css_fim = src.index("/* ---------- matérias-primas ---------- */")
css2 = """:root{--perola-2:#E8E4EE;--berinjela-2:#4B4260;--ambar:#C2702A;--iris:#6A55D0;--bergamota:#8FAE45;--linha:rgba(34,27,51,.16);--serif:"Bodoni Moda",Georgia,serif;--sans:Manrope,system-ui,sans-serif}
.antes,.depois{height:70vh;display:grid;place-items:center;font:400 clamp(28px,5vw,56px)/1.1 var(--serif);text-align:center;padding:0 16px}
""" + src[css_ini:css_fim]
corpo2 = '<div class="antes">Role pra ver evaporar</div>\n' + html_pele + '\n<div class="depois">Fim do dia</div>\n<p class="nota">Efeito da Névoa (24/11/2026): a rolagem é o relógio. <span id="npart">0</span> partículas.</p>'
open("gudev/efeitos/evaporacao-na-rolagem.html", "w", encoding="utf-8").write(pagina("Evaporação na rolagem", css2, corpo2, js2))

# ---------- 3. frasco de vidro 3D ----------
a = next(i for i, l in enumerate(L) if "WOW 3: monte o seu frasco" in l) - 1
b = next(i for i, l in enumerate(L) if l.startswith("window.__frasco"))
frasco = "\n".join(L[a:b]).rstrip()
js3 = """/* ===== TROQUE AQUI =====
   CONC muda a força da cor do líquido e o texto pequeno do rótulo; GOTAS são os botões de cor.
   O líquido base (cor champanhe) está em camadas.push(...) dentro do módulo.
   Geometria do vidro (frasco 3D): constantes BO, CAV, BI no shader FS3 (meia largura do corpo = 1). */
const CONC = [
  {id:"edt", nome:"Eau de toilette", faixa:"5 a 15% de óleo", forca:.55},
  {id:"edp", nome:"Eau de parfum", faixa:"15 a 20% de óleo", forca:.8},
  {id:"ext", nome:"Extrait", faixa:"20 a 40% de óleo", forca:1}
];
const GOTAS = [ {nome:"Rosa", cor:"#D0577A"}, {nome:"Violeta", cor:"#6A55D0"}, {nome:"Âmbar", cor:"#C2702A"} ];
""" + frasco + """
GOTAS.forEach((g, i) => { const bt = document.createElement("button"); bt.type = "button"; bt.textContent = g.nome; bt.style.setProperty("--c", g.cor);
  bt.addEventListener("click", () => Frasco.escolhe(i, g)); $("#acoes").append(bt); });
$("#sacudir").addEventListener("click", () => Frasco.sacode());
$("#nome").addEventListener("input", e => Frasco.nomeia(e.target.value.trim()));
const st = $("#estado"); setInterval(() => { const e = Frasco.estado; st.textContent = e.tres ? `3D (resolução ${e.escala.toFixed(2)}×)` : "2D (sem WebGL2)"; }, 800);"""
css3 = """:root{--berinjela-2:#4B4260;--ease:cubic-bezier(.2,.7,.2,1)}
main{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,340px);gap:24px;align-items:center;min-height:100vh;padding:24px max(16px,calc((100vw - 1100px)/2))}
.frasco-box{position:relative;aspect-ratio:4/5;border-radius:28px;background:#C4BBD5;overflow:hidden}
#frasco3d{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
#frasco{position:absolute;inset:0;width:100%;height:100%;touch-action:pan-y;-webkit-tap-highlight-color:transparent;user-select:none}
.frasco-dica{position:absolute;left:0;right:0;bottom:14px;text-align:center;font-size:13px;font-weight:600;color:var(--berinjela-2);pointer-events:none;transition:opacity .5s}
.frasco-dica.some{opacity:0}
.painel{display:grid;gap:12px}
.painel h1{font:400 40px/1 "Bodoni Moda",Georgia,serif}
#acoes{display:flex;flex-wrap:wrap;gap:8px}
#acoes button,#sacudir{border:1px solid rgba(34,27,51,.2);background:#fff;border-radius:99px;padding:10px 16px 10px 32px;cursor:pointer;font-weight:600;position:relative}
#acoes button::before{content:"";position:absolute;left:12px;top:50%;width:12px;height:12px;margin-top:-6px;border-radius:50%;background:var(--c)}
#sacudir{padding-left:16px;background:#221B33;color:#fff;justify-self:start}
#nome{border:1px solid rgba(34,27,51,.2);border-radius:12px;padding:12px 14px;background:#fff}
@media (max-width:820px){main{grid-template-columns:minmax(0,1fr)}.frasco-box{aspect-ratio:1/1;max-height:66vh}}"""
corpo3 = """<main>
  <div class="frasco-box" id="frascoBox" role="img" aria-label="Frasco de vidro arrastável com líquido">
    <canvas id="frasco3d" aria-hidden="true"></canvas>
    <canvas id="frasco"></canvas>
    <p class="frasco-dica" id="frascoDica">Pegue o frasco e arraste</p>
  </div>
  <div class="painel">
    <h1>Frasco de vidro 3D</h1>
    <p>Arraste, arremesse, solte. Pingue uma cor e sacuda.</p>
    <div id="acoes"></div>
    <input id="nome" maxlength="18" placeholder="Nome no rótulo" autocomplete="off">
    <button id="sacudir" type="button">Sacudir</button>
    <p style="font-size:13px;color:#4B4260">Renderizando em: <b id="estado">--</b></p>
  </div>
</main>
<p class="nota">Efeito da Névoa (24/11/2026): ray tracing de vidro e líquido em WebGL2, sem biblioteca; física em JS; plano B 2D.</p>"""
open("gudev/efeitos/frasco-vidro-3d.html", "w", encoding="utf-8").write(pagina("Frasco de vidro 3D", css3, corpo3, js3))
print("ok")
