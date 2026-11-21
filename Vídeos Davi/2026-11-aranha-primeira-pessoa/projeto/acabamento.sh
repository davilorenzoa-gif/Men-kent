#!/usr/bin/env bash
# pos.sh <pasta-quadros> <audio.wav ou -> <saida.mp4> [crf]
set -euo pipefail
Q="$1"; A="$2"; OUT="$3"; CRF="${4:-20}"
FILTRO="tmix=frames=4:weights='1 1 1 1',select='eq(mod(n\,4)\,3)',setpts=N/24/TB,scale=1920:1080:flags=lanczos,split[a][b];[b]curves=all='0/0 0.62/0 1/1',gblur=sigma=26[g];[a][g]blend=all_mode=screen:all_opacity=0.42,eq=contrast=1.07:saturation=1.1:gamma=0.98,colorbalance=rs=-0.03:gs=-0.01:bs=0.04:rh=0.04:gh=0.01:bh=-0.04,rgbashift=rh=-1:bh=1,unsharp=5:5:0.5,vignette=PI/5,noise=alls=5:allf=t,format=yuv420p"
if [ "$A" = "-" ]; then
  ffmpeg -v error -y -framerate 96 -i "$Q/q%05d.jpg" -filter_complex "$FILTRO" -r 24 -c:v libx264 -preset slow -crf "$CRF" -movflags +faststart "$OUT"
else
  ffmpeg -v error -y -framerate 96 -i "$Q/q%05d.jpg" -i "$A" -filter_complex "[0:v]$FILTRO[v]" -map "[v]" -map 1:a -r 24 -c:v libx264 -preset slow -crf "$CRF" -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT"
fi
