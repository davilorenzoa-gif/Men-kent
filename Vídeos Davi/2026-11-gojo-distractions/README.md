# Gojo · "Distractions" (speed edit estilo tutorial de Photoshop)

Pedido do Davi (28/11/2026): pegar o vídeo de referência (tutorial de edit do Kakashi/Itachi com a música
"Distractions", do Haiti Babii) e fazer o mesmo tipo de edição no vídeo do Gojo, igual ao original e com a mesma música.

- `gojo-distractions.mp4`: 62 s, 1920×1080, 30 fps, áudio da referência intacto.
- `projeto/edit.py`: o motor. Cada cena segue os mesmos segundos da referência; dá pra conferir quadro a quadro.
- `projeto/a/`: recortes e fundos prontos (mesa do PC limpa, capa da música, Gojo recortado, moça apagada).

## Mapa referência → Gojo
| Tempo | Referência | Gojo |
|---|---|---|
| 0–3,5 s | "baby" na bandana do Kakashi | "baby" gravado na lente dos óculos (quadro 82,6 s) |
| 3,5–6,7 | "nothing" na bandana, close no olho | "nothing" na testa, close nos olhos azuis (29,0 s) |
| 6,7–14,4 | "i can't … Deny" entre as mãos | Gojo de braços abertos (30,6 s), contorno branco |
| 14,5–15,5 | apaga o Shikamaru | apaga a moça de rabo de cavalo (72,6 s) |
| 15,5–17,4 | explorador de arquivos | explorador com miniaturas do Gojo |
| 17,5–24,6 | anime na tela do PC, kunai saindo da tela | Gojo sai da tela e pisa na base do monitor |
| 25,2–50 | Itachi no fundo vermelho, rosto na sombra, olhos vermelhos, card da música | Gojo no mesmo fundo, rosto na sombra com os **olhos azuis** brilhando, mesmo card e mesma letra |
| 50–53,7 | card isolado, letra desfocada | igual (linha do meio nítida) |
| 54–56 | nome do criador embaixo do monitor | "SATORU GOJO" (troque em `edit.py` se quiser outro) |
| 56–58,7 | recap rápido | recap das cenas do Gojo |

Fora do vídeo: marca d'água e tela final do TikTok (o próprio TikTok coloca) e o nome do autor da referência.

## Como refazer
```
T=<pasta de trabalho>; cp ref.mp4 src.mp4 $T; bash "Vídeos Davi/ferramentas/setup.sh" $T
# fonte gótica: ofl/unifrakturmaguntia/UnifrakturMaguntia-Book.ttf em $T/fonts
# quadros-chave em $T/k (gXX.X.png do vídeo do Gojo), recortes em $T/a (ou copie projeto/a)
python3 edit.py $T preview 2.2 14 44      # quadros soltos
python3 edit.py $T frames 0 1861          # (4 processos em paralelo ≈ 1 min)
ffmpeg -framerate 30 -i $T/out/%05d.png -i ref.mp4 -map 0:v -map 1:a -vf scale=1920:1080:flags=lanczos,format=yuv420p -c:v libx264 -crf 21 -c:a aac -shortest gojo-distractions.mp4
```

## Lições
- **Recorte de anime:** `rembg` com o modelo `isnet-anime` (baixa do GitHub; o Hugging Face está bloqueado). Melhor que o BiRefNet pra desenho.
- **Recorte com alfa fraco na roupa escura:** reforçar o alfa deixa aparecer lixo do fundo. Zerar alfa < 70, multiplicar o resto e ficar só com o maior pedaço conectado.
- **"Apagar" pessoa:** `cv2.inpaint` (Telea) com máscara dilatada; fica borrado igual ao preenchimento do Photoshop no tutorial.
