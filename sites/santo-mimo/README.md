# Santo Mimo by Hanna (lead do Davi)

Cafeteria e confeitaria na Vila Matilde, Zona Leste de SP. Lead, **ainda não é cliente**.

- `index.html` + `img/`: versão pra subir no Netlify (`proposta-santo-mimo` → `santo-mimo.netlify.app`).
- `404.html`, `robots.txt`, `sitemap.xml`: já prontos. O `_headers` sai do gerador do Gu.

## Dados usados (todos reais)
- Nome: Café Santo Mimo By Hanna. Slogan do logo: "Um doce para você".
- Endereço: Rua José Mascarenhas, 1063, Vila Matilde, São Paulo, CEP 03515-000 (geo -23.5378459, -46.5270372).
- WhatsApp: (11) 97430-8633. Instagram: @santomimobyhanna (5 mil seguidores).
- Google: Cafeteria, $$, "Café com doces, sobremesas, Donuts e tortas salgadas". Instagram: "doces inclusivos" e delivery no iFood.
- Logo: recortado da print do Google que o Davi mandou.
- Avaliações: 7 trechos reais com o nome de quem escreveu (vieram do Google via Bendito Guia).

## O que precisa confirmar antes de mandar
1. **Nota 4,9**: veio do Restaurant Guru (que puxa do Google). Conferir no Maps. Se mudar, trocar em 3 lugares: hero, seção de avaliações e `.placar`.
2. **Horário**: o Maps mostra terça 8h30 às 18h45. Segunda 10h às 18h veio do Instagram. Quarta a sábado foi assumido igual à terça e domingo fechado. Editar o objeto `HORAS` no JS e o texto do FAQ e do rodapé.
3. **Link do iFood**: não achei a página da loja. Quando tiver, colar em `IFOOD` no JS (aparece o link sozinho).
4. **Encomenda, presente e entrega**: o "Mande um mimo" só pergunta valor e disponibilidade, sem prometer nada. Mesmo assim, confirmar se eles montam caixinha pra presente.
5. **Analytics**: criar o GoatCounter e descomentar o script no `<head>`.

## Fotos
Todas as fotos de produto são **ilustrativas** (Pexels, licença livre) e estão marcadas como "Fotos ilustrativas" no site.
Quando a Santo Mimo liberar as fotos dela (Instagram ou Maps), é só salvar com o mesmo nome por cima:

| Arquivo | Onde aparece | O que colocar |
|---|---|---|
| `donut-prato.jpg` | Prato do topo (círculo) | Donut ou doce visto de cima, quadrado |
| `cafe.jpg` | Começo do zoom da vitrine (tela cheia) | Café visto de cima, quadrado, **1800px ou mais** |
| `donuts-torre.jpg`, `brigadeiros.jpg`, `bolo-chocolate.jpg`, `torta-salgada.jpg`, `sobremesa.jpg`, `cafe-bandeja.jpg`, `donuts-granulado.jpg`, `bolo-crepe.jpg` | Grade da vitrine, cardápio e "Mande um mimo" | Quadradas, 900px |

Foto pequena do Instagram (1080px) serve. Se vier menor, passar no Real-ESRGAN antes. Depois de trocar, tirar os avisos "Fotos ilustrativas".

## Os 3 WOWs
1. **A caixinha se abre** (abertura): tampa rosa com fita dourada; o laço se desfaz, as fitas são puxadas, a tampa sobe e o selo (logo real) voa pro topo do site. Toque pula.
2. **Da xícara pra vitrine** (meio): começa com um café em tela cheia e, rolando, a câmera se afasta até mostrar a vitrine inteira (9 fotos com o nome de cada categoria).
3. **Mande um mimo** (interativo): escolhe a ocasião (muda a cor da fita), escreve o bilhete (aparece em letra de mão, ao vivo), escolhe os doces e pede pelo WhatsApp com a mensagem pronta. Depois o bilhete vira e mostra o "Pedido montado!".

Extras: "Aberto agora / Abre às..." calculado na hora de São Paulo; carrossel de avaliações com arrastar no celular; cardápio onde cada categoria pergunta pelo WhatsApp "o que tem hoje".
