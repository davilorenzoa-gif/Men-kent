#!/usr/bin/env bash
# Junta os quadros (fr/, 120 q/s → 30 q/s com desfoque de movimento) + audio.wav → ../pecai-black-friday.mp4
set -euo pipefail
cd "$(dirname "$0")"
ffmpeg -y -v error -stats -framerate 120 -i fr/%05d.jpg -i audio.wav -filter_complex \
 "[0:v]tmix=frames=4:weights='1 1 1 1',fps=30,noise=alls=4:allf=t,setsar=1,format=yuv420p[v];[1:a]volume=${GANHO:--2.1dB}[au]" \
 -map "[v]" -map "[au]" -c:v libx264 -preset slow -crf 18 -maxrate 12M -bufsize 24M -profile:v high -c:a aac -b:a 256k -movflags +faststart -shortest ../pecai-black-friday.mp4
