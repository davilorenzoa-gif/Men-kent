# Vídeos Davi

Edições de vídeo pessoais do Davi. **Não é GuDev**: não usar como case, portfólio nem divulgar pela GuDev.
As edições usam fotos de figuras públicas e música de terceiros. Elas são pra guardar, não pra postar.

## Edições

| Pasta | O que é | Versões |
|---|---|---|
| `2026-10-xo-sai-pra-la/` | Edição "xô sai pra lá" estilo TikTok (verde e amarelo, letra animada) com fotos do Lula, do Flávio e um meme | v1 (igual à referência), v2 (transições, Juliet, corrente, enfeites) |

## Como fazer uma edição nova a partir de um vídeo de referência

Tudo roda numa pasta de trabalho temporária (`$T`), fora do repositório. No repositório ficam só o vídeo final, os recortes e o script da edição.

1. **Preparar:** `bash "Vídeos Davi/ferramentas/setup.sh" $T`. Instala onnxruntime, baixa as fontes e o modelo de recorte.
2. **Desmontar a referência:** `bash "Vídeos Davi/ferramentas/analisar_referencia.sh" referencia.mp4 $T/ref 3.0 7.7`.
   Gera folhas com 30 quadros cada (10 por segundo, com o tempo escrito), a lista de cortes de cena e quadros-chave em tamanho cheio.
   Com isso dá pra anotar em que segundo entra cada palavra da letra e o que acontece em cada cena.
3. **Ritmo da música:** `python3 "Vídeos Davi/ferramentas/analisar_audio.py" referencia.mp4`. Mostra o BPM, as batidas fortes e onde a música acaba.
4. **Recortar as fotos (PNG sem fundo):** `python3 "Vídeos Davi/ferramentas/recortar.py" $T/models/birefnet_lite.onnx $T/cut foto1.jpg foto2.jpg ...`.
   Antes, cortar marca d'água e legenda da foto, senão o recorte leva junto.
5. **Escrever o `edit.py` da edição:** copiar o da última edição e trocar cenas, tempos, fontes e cores.
   Ele já tem o motor pronto: texto em camadas, contorno, blur de movimento, câmera (zoom e tremida), transições (whip, zoom com flash, círculo, glitch RGB), enfeites (brilhos, estrelinhas, risquinhos) e granulado.
6. **Conferir antes de renderizar tudo:** `python3 edit.py $T preview 3.0 7.8 12.1` gera quadros soltos.
   Montar folhas de comparação lado a lado com a referência, nos mesmos segundos, pra checar a sincronia.
7. **Renderizar e colocar a música:** ver o README da edição. Renderiza em 4 partes em paralelo, junta as partes e põe o áudio.
   Pra guardar no repositório, usar `-crf 25` (cerca de 30 MB pra 25 s em 1080p).

## Lições aprendidas

- **Tempo dos quadros:** escrever o tempo no quadro pelo número do quadro (`n`), não por `%{pts}`. Com `pts` o tempo saiu 2 s adiantado e quase bagunçou toda a sincronia.
- **Bordas escuras nos recortes:** compor as camadas em alfa pré-multiplicado (modo `RGBa` do Pillow). Senão aparece uma borda escura em volta dos recortes e das letras.
- **Blur de movimento nas letras:** usar uns 0,5× da velocidade. Mais que isso as letras viram borrão e não dá pra ler.
- **Bolinhas de enfeite:** definir áreas proibidas em cima dos textos, senão elas tampam as palavras.
- **Zoom com blur:** usar 6 cópias com passo pequeno. Com 3 cópias aparece imagem tripla.
- **Tamanho do arquivo:** o granulado deixa o arquivo pesado. Pra mandar pro celular, `-crf 21`; pra guardar no repositório, `-crf 25`.
- **Tempo de render:** 25 s em 1080p levam cerca de 2 min com 4 processos.

## Uso futuro na GuDev

O mesmo motor serve pro vídeo de 15 s do primeiro contato (ver `gudev/02-VENDAS-E-MENSAGENS.md`).
Dá pra fazer com texto animado no ritmo, prints do site recortados e as mesmas transições.
Nesse caso valem as regras da GuDev: só dado real do cliente, nada inventado.
