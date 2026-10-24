#!/usr/bin/env bash
# Desmonta o vídeo de referência: folhas de contato a 10 quadros/s com o tempo escrito,
# lista de cortes de cena e quadros-chave em tamanho cheio.
# Uso: analisar_referencia.sh <video.mp4> <pasta-saida> [tempos dos quadros-chave...]
set -euo pipefail
V="${1:?video}"; O="${2:?pasta de saida}"; shift 2
mkdir -p "$O"
FONT=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf

ffprobe -v error -show_entries format=duration:stream=codec_type,width,height,r_frame_rate -of default=nw=1 "$V"

# O tempo vem do número do quadro (n/10). Usar %{pts} aqui deu 2 s de diferença, não usar.
ffmpeg -v error -y -i "$V" -vf "fps=10,scale=384:-1,drawtext=fontfile=$FONT:text='%{eif\:n/10\:d}.%{eif\:mod(n\,10)\:d}s':x=4:y=h-30:fontsize=22:fontcolor=red:box=1:boxcolor=white,tile=5x6" "$O/folha_%02d.jpg"

echo "cortes de cena (s):"
ffmpeg -v info -i "$V" -vf "select='gt(scene,0.3)',showinfo" -an -f null - 2>&1 | grep -o "pts_time:[0-9.]*" | cut -d: -f2 | tr '\n' ' '
echo

for t in "$@"; do
  ffmpeg -v error -y -ss "$t" -i "$V" -frames:v 1 "$O/chave_$t.png"
done
echo "folhas e quadros em $O"
