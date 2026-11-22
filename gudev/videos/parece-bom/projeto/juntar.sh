#!/usr/bin/env bash
# Junta os quadros (fr/, 120 q/s → 30 q/s com desfoque de movimento) + trilha.wav (ou audio.wav, se já tiver voz)
set -euo pipefail
cd "$(dirname "$0")"
A=${1:-trilha.wav}
ffmpeg -y -v error -stats -framerate 120 -i fr/%05d.jpg -i "$A" -filter_complex \
 "[0:v]tmix=frames=4:weights='1 1 1 1',fps=30,noise=alls=2:allf=t,setsar=1,format=yuv420p[v]" \
 -map "[v]" -map 1:a -c:v libx264 -preset medium -crf 20 -maxrate 6M -bufsize 12M -profile:v high -level 4.2 \
 -c:a aac -b:a 256k -ar 48000 -movflags +faststart -shortest ../gudev-parece-bom.mp4
