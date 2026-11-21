#!/usr/bin/env bash
# Junta: comercial da Andrade (0–5,40 s, ampliado pro 4K) + quadros do filme (fr/, 120 q/s → 30 q/s com desfoque de movimento) + audio.wav
set -euo pipefail
cd "$(dirname "$0")"
A=orig/andrade-comercial-davi.mp4
ffmpeg -y -v error -stats -t 5.40 -i "$A" -framerate 120 -i fr/%05d.jpg -i audio.wav -filter_complex \
 "[0:v]scale=2160:3840:flags=lanczos,fps=30,setsar=1,format=yuv420p[a];
  [1:v]tmix=frames=4:weights='1 1 1 1',fps=30,noise=alls=5:allf=t,setsar=1,format=yuv420p[b];
  [a][b]concat=n=2:v=1:a=0[v];[2:a]volume=-1.2dB[au]" \
 -map "[v]" -map "[au]" -c:v libx264 -preset medium -crf 21 -maxrate 20M -bufsize 40M -profile:v high -level 5.2 -c:a aac -b:a 256k -movflags +faststart -shortest ../gudev-proximo-passo-4k.mp4
ffmpeg -y -v error -stats -i ../gudev-proximo-passo-4k.mp4 -vf "scale=1080:1920:flags=lanczos" -c:v libx264 -preset slow -crf 19 -maxrate 9M -bufsize 18M -c:a copy -movflags +faststart ../gudev-proximo-passo.mp4
