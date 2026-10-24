#!/usr/bin/env bash
# Prepara a pasta de trabalho de uma edição: dependências, fontes e modelo de recorte.
# Uso: setup.sh <pasta-de-trabalho>   (use uma pasta temporária, fora do repositório)
set -euo pipefail
T="${1:?informe a pasta de trabalho}"
mkdir -p "$T/fonts" "$T/models" "$T/cut"

pip install --quiet --break-system-packages onnxruntime numpy pillow

# Fontes do Google Fonts (licença OFL/Apache), as mesmas da edição "xô sai pra lá"
G=https://raw.githubusercontent.com/google/fonts/main
for p in "ofl/baloo2/Baloo2%5Bwght%5D.ttf" "ofl/quicksand/Quicksand%5Bwght%5D.ttf" \
         "ofl/sancreek/Sancreek-Regular.ttf" "ofl/montserrat/Montserrat%5Bwght%5D.ttf" \
         "ofl/sacramento/Sacramento-Regular.ttf" "ofl/fredoka/Fredoka%5Bwdth,wght%5D.ttf" \
         "ofl/rye/Rye-Regular.ttf" "ofl/lilitaone/LilitaOne-Regular.ttf" "apache/chewy/Chewy-Regular.ttf"; do
  f=$(basename "$p" | sed 's/%5B/[/;s/%5D/]/')
  [ -s "$T/fonts/$f" ] || curl -sSfL -o "$T/fonts/$f" "$G/$p"
done

# BiRefNet lite (licença MIT) pra tirar o fundo das fotos
M="$T/models/birefnet_lite.onnx"
[ -s "$M" ] || curl -sSfL -o "$M" https://huggingface.co/onnx-community/BiRefNet_lite-ONNX/resolve/main/onnx/model.onnx
echo "pronto: $T"
