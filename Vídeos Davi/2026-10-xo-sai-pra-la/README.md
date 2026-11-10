# Edição "xô sai pra lá" (24/10/2026)

Edição pessoal pra galeria do Davi, não é GuDev.
Recria um TikTok de referência (verde e amarelo com a letra animada) trocando as imagens pelas fotos que o Davi mandou.
Nem o vídeo de referência nem a música são nossos: guardar, não postar.

- `xo-sai-pra-la-v2.mp4`: versão final, 1080p, 30 quadros/s, 24,6 s, com a música.
- `xo-sai-pra-la-v1.mp4`: primeira versão, mais fiel à referência e sem enfeites.
- `recortes/`: Lula, Flávio, Flávio com Juliet e corrente, e o meme. Tudo em PNG sem fundo.
- `edit.py`: o script que gera o vídeo quadro a quadro.

## Quem é quem

- **Lula:** a foto fazendo o L. Fica em preto e branco com o X vermelho, igual o cara do X na referência.
- **Flávio:** a foto com a faixa presidencial. Entra no lugar do boneco de Juliet e corrente da referência, e na v2 ganha a Juliet e a corrente.
- **Meme:** o bombado segurando o mini-Lula. Entra no lugar do Bob Esponja no final.

## Letra e tempos (BPM 123, batida a cada 0,486 s)

| Tempo (s) | Letra | Cena |
|---|---|---|
| 0–2,77 | (abertura) | Flashes verde e amarelo. Na v2 as fotos piscam junto. Preto de 2,4 a 2,77. |
| 2,77–4,30 | xô 2,88 · sai 3,38 · pra 3,62 · lá 3,88 | Fundo verde. O Lula sobe, dança, o X é desenhado do lado dele, gruda nele e ele sai pela esquerda. A palavra cantada acende. |
| 4,30–6,0 | esquerdista 4,30 · sai 5,40 · do 5,70 · meio 6,00 | Fundo amarelo. Zoom-soco no "do". |
| 6,18–8,0 | a direita 6,18 · **DIREITA** 6,64 · tá 7,30 · chegando 7,50 | O Flávio sobe pela direita e o "DIREITA" entra voando. Na v2, a Juliet cai às 7,78 e a corrente às 8,02. |
| 8,10–10,5 | o 8,10 · bonde 8,30 · todo 8,80 · tá 9,18 · sem 9,22 · freio 9,70 | Aparecem as bolinhas e o "freio" escrito à mão. |
| 10,54–12,08 | xô 10,60 · sai 10,98 · pra 11,35 · lá 11,55 | Repete a cena do Lula. |
| 12,08–13,80 | NÃO 12,08 · ADIANTA 12,30 · SE 12,70 · ESCONDER 13,02 | Na v2, o Lula espia atrás do "SE ESCONDER", leva o X e se abaixa. Termina com zoom-soco. |
| 13,80–14,6 | TODO 13,80 · MUNDO 13,97 | Fundo verde escuro, letra creme. |
| 14,6–24,6 | tá 14,80 · ligado 14,92 · quem 16,10 · ficar 16,38 · parado 16,58 · é 16,62 · **PETISTA** 17,78 · disfarçado 18,95 | Fundo bege. O meme entra voando e dança. Fade no final, de 24,25 a 24,6. |

## Fontes (todas do Google Fonts) e cores

- **Letra corrida:** Baloo 2 Bold.
- **Texto fino** ("a direita", "ficar parado é"): Quicksand.
- **"DIREITA":** Sancreek, a fonte faroeste, esticada 1,32× na vertical, com contorno escuro e faixa clara.
- **Palavras grandes** ("NÃO", "ADIANTA", "SE ESCONDER", "TODO MUNDO"): Montserrat SemiBold/Bold.
- **Manuscrita** ("freio", "disfarçado"): Sacramento.
- **"PETISTA":** Fredoka Bold, com uma cor por letra e contorno deslocado.
- **Cores** (centro → borda da vinheta):
  - amarelo `#ECC03A` → `#8E701C`
  - verde `#1E5212` → `#051A02`
  - bege `#E4CE7C` → `#807040`
  - texto `#204812`
  - creme `#E0DABC`
  - vermelho do X `#CE161C`

## O que mudou na v2

- **Transições:** whip pan do verde pro amarelo, zoom com flash na volta do "xô", flash e glitch RGB no "NÃO", glitch no "TODO" e círculo abrindo pro bege. Também tem tremida de câmera e glitch no "DIREITA" e no "PETISTA".
- **Juliet e corrente:** a Juliet espelhada e a corrente de ouro dupla caem do céu no Flávio, com um brilho quando encaixam. Depois ficam brilhinhos piscando em volta dele.
- **X e rastro:** o X é desenhado traço por traço, e o Lula sai com rastro de velocidade.
- **Lula no "SE ESCONDER":** ele espia atrás das letras e leva o X.
- **Enfeites:** estrelinhas, risquinhos de destaque e brilhos no meme.

## Renderizar de novo

```bash
T=/tmp/edit-xo
bash "Vídeos Davi/ferramentas/setup.sh" $T
python3 "Vídeos Davi/ferramentas/recortar.py" $T/models/birefnet_lite.onnx $T/cut lula.jpg flavio.jpg meme.jpg
E="Vídeos Davi/2026-10-xo-sai-pra-la/edit.py"
python3 "$E" $T full $T/p0.mp4 0 6.2 &
python3 "$E" $T full $T/p1.mp4 6.2 12.4 &
python3 "$E" $T full $T/p2.mp4 12.4 18.5 &
python3 "$E" $T full $T/p3.mp4 18.5 24.6 &
wait
printf "file '%s'\n" $T/p0.mp4 $T/p1.mp4 $T/p2.mp4 $T/p3.mp4 > $T/lista.txt
ffmpeg -f concat -safe 0 -i $T/lista.txt -i referencia.mp4 -map 0:v -map 1:a -t 24.6 \
  -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart \
  -af "afade=t=out:st=24.15:d=0.45" -c:a aac -b:a 192k xo-sai-pra-la.mp4
```

O `referencia.mp4` é o TikTok original. Ele não fica no repositório: o Davi tem o arquivo.
O áudio sai dele a partir do 0 s, e a música acaba sozinha perto de 24,6 s.
