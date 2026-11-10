# APEX Automotive (projeto conceito GuDev)

Site automotivo de luxo, **demo de portfólio**. Não é cliente (igual Prumo, Peçaí e o 911): nunca usar como case.

Stack: React 19, TypeScript, Tailwind CSS 4, Motion, Lucide, Lenis, Vite.

## Rodar

```bash
cd sites/apex
npm install
npm run dev        # desenvolvimento
npm run build      # checa tipos e gera dist/
npm run preview    # serve o dist/ localmente
```

## Subir no Netlify

Criar o site apontando para este repositório com **Base directory = `sites/apex`**.
O `netlify.toml` já define o comando (`npm run build`), a pasta (`dist`) e os cabeçalhos de segurança.
O build usa caminhos relativos, então também funciona arrastando a pasta `dist/` no Netlify.

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Carros e especificações | `src/data/vehicles.ts` |
| Números de engenharia (aero, motor, câmbio, chassi) | `src/data/engineering.ts` |
| Vídeos do Cinematic Garage | `src/data/films.ts` |
| Fotos (fonte, recorte, tratamento, créditos) | `scripts/images.config.json` |
| Cores, fontes, easings | `src/index.css` (bloco `@theme`) |
| Menu e ordem das seções | `src/data/navigation.ts` |

### Colocar vídeo de verdade no Cinematic Garage

Hoje os três "filmes" são sequências de fotos (reels) tocadas pelo mesmo player, para ele funcionar antes de existir filmagem.
Para trocar por vídeo, editar `src/data/films.ts`:

```ts
// Arquivo próprio: colocar em public/video/ e listar os formatos que tiver
{ id: 'lancamento', kind: 'video', title: 'Launch', note: '…', poster: 'hero',
  sources: [
    { src: 'video/launch.webm', type: 'video/webm' },
    { src: 'video/launch.mp4',  type: 'video/mp4'  },
  ] }

// Vídeo hospedado: só o id
{ id: 'filme', kind: 'embed', provider: 'youtube', videoId: 'xxxxxxxxxxx', title: '…', note: '…', poster: 'hero' }
{ id: 'filme', kind: 'embed', provider: 'vimeo',   videoId: '123456789',   title: '…', note: '…', poster: 'hero' }
```

`poster` é o id de uma foto do manifesto. Play/pause, barra de progresso, mudo, tela cheia e teclado (espaço/K, setas, M, F) já funcionam para vídeo.

### Trocar ou adicionar foto

1. Achar a foto no Wikimedia Commons e anotar a URL do original, autor e licença.
2. Adicionar a entrada em `scripts/images.config.json` (recorte `crop`, tratamento `grade`, retoques `burn`, `alt`).
3. Rodar `NODE_USE_ENV_PROXY=1 npm run images` (ou só `npm run images` fora de ambiente com proxy).
   O script baixa, recorta, trata, gera AVIF + WebP em `public/img/` e reescreve `src/data/images.generated.ts`.

Os originais ficam em `.image-cache/` (fora do git). O Commons limita downloads anônimos, então a primeira rodada pode demorar.

## Regras deste site

- **Nenhum número inventado.** Toda especificação é dado de fabricante para a versão exata indicada, com link da fonte na ficha de cada carro. Se trocar a foto por outra versão do carro, trocar os números junto.
- **Fotos com crédito.** Todas vêm do Wikimedia Commons (CC BY-SA, CC BY). O painel "Photo credits and licences" no rodapé lista autor, licença, link do original e o que foi alterado. Não remover: é exigência das licenças.
- **Movimento reduzido.** Com "reduzir movimento" ligado, as animações viram fades curtos, a rolagem suave desliga e a galeria deixa de ser fixada.
- **Celular.** Rolagem nativa (sem Lenis), galeria com swipe nativo, sem estouro horizontal. Testado em 390 px.

## O que ainda vale confirmar antes de divulgar

- O site está em inglês, seguindo os textos do briefing. Se for usar com público daqui, traduzir os textos (ficam nos arquivos de `src/data/` e nas seções).
- As fotos mostram marcas reais (Porsche, Ferrari etc.). O rodapé já diz que é projeto conceito sem vínculo com os fabricantes; manter esse aviso.
- O link "Concept and build by GuDev" do rodapé abre o WhatsApp comercial com mensagem pronta.
