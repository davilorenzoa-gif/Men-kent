# Lume (projeto conceito GuDev)

Joalheria de alianças **fictícia**. Arquivo recebido do Davi em 11/11/2026. **Nunca é case nem cliente.** O site diz: "A Lume é uma joalheria fictícia. O site é real." CTA: "Chamar a GuDev na DM" (Instagram).

- `index.html`: arquivo único, **Three.js 0.160 por importmap (unpkg)** + Lenis 1.1.13. A aliança é modelada no código, sem arquivo 3D.
- Paleta: veludo verde `#0A1A15` (fundo de estojo), osso `#EDE7DA`, ouro `#D9B26A`. Fontes: Bodoni Moda + Manrope.

## Os 3 WOWs
1. **Nasce em brasa e esfria até virar ouro:** nos primeiros 3,2 s a aliança gira rápido, vermelha e emissiva; `calor` cai de 1 a 0 e mistura cor, `emissive`, `metalness`, `roughness`, `clearcoat` e `envMapIntensity` até o ouro polido.
2. **O túnel:** numa seção de 240svh a aliança vem pra perto da câmera (`z: 3.05`) e a gente atravessa por dentro dela, com o texto no meio do furo.
3. **Grave a sua + arrastar + o par:** você digita os dois nomes, a data e escolhe a letra; a gravação aparece na hora por dentro da aliança. Dá pra arrastar a aliança pra girar (com inércia). No fim, a 2ª aliança chega e "encaixa" com um tranco e um brilho.

## Como funciona (técnica pra reaproveitar)
- **Aliança = `LatheGeometry`** de um perfil "conforto anatômico": meio círculo por fora (`esp*.5`) e curva rasa por dentro (`esp*.18`), girado 220 vezes. Material `MeshPhysicalMaterial` metalness 1, roughness .16, clearcoat .4, com `RoomEnvironment` + `PMREMGenerator` como reflexo (sem HDR externo).
- **Gravação = `CanvasTexture`** (2048x128) num `CylinderGeometry` aberto um tiquinho maior que o furo (r 1.012), `side: BackSide`, `repeat.x = -1` pra não ficar espelhado, `depthWrite:false`. Redesenha no `input` e depois do `document.fonts.ready`. Só aparece quando a brasa esfriou.
- **Poses por seção:** cada `<section data-pose>` tem uma pose `{x,y,z,s,rx,ry,rz,b,gira}`; a pose alvo é a interpolação (smoothstep) entre a seção cujo centro já passou do meio da tela e a próxima; a atual persegue o alvo com `+= (alvo-atual)*.075`. Tabela separada pro celular (`PC`): joia em cima, texto embaixo, `fov` 42.
- **Parada de frente:** quando `gira` é baixo, o giro é puxado pro múltiplo de 2π mais perto, então a gravação volta a ficar virada pra câmera.
- **Arrastar sem matar a rolagem:** canvas `fixed` atrás de tudo, `main{pointer-events:none}` e só links, botões, campos e `.txt` com `pointer-events:auto`; canvas com `touch-action:pan-y` (o dedo na vertical ainda rola a página).
- **Texto que some no celular sem brigar com a entrada:** a entrada usa `opacity` (classe `.ent`), o sumiço por rolagem usa `filter:opacity(var(--vis))`, então um não sobrescreve o outro.
- Sem WebGL: classe `sem3d` esconde o canvas e o texto fica.

## Pontos de atenção (se virar base de cliente)
- Lenis liga em qualquer aparelho (o padrão GuDev é só no computador).
- Bodoni Moda gigante sem `opsz`: ver lição no `05` (o "M" vira "VI"); usar `font-variation-settings:'opsz' ...`.
- O `requestAnimationFrame` de `some()` e o do Three rodam sempre, mesmo parado: em cliente, pausar quando a aba some.
- Joalheria de verdade: usar foto/vídeo real das peças sempre que tiver; o 3D é o WOW, não substitui a foto.
