# Fusca 3D (glb pronto pro Three.js)

- `fusca.glb`: 1,8 MB, ~40 mil triângulos, 19 peças, 4 materiais, 16 animações (portas, capô, porta-malas). Leve o bastante pro celular.
- Origem: "Beetle/Fusca (Version 1)" de **soujagah** (Sketchfab), licença **CC BY 4.0** (uso comercial liberado, **com crédito obrigatório**). Texto de crédito pronto em `CREDITS.txt`: vai no rodapé do site ou na legenda do vídeo.
- Como foi feito (17/11/2026): zip FBX da AiZity → `FBX2glTF` (npm `fbx2gltf`) → `gltf-transform optimize --compress quantize --texture-compress webp` (11 MB → 1,8 MB).
- Ressalva: o conversor descartou as texturas de metal/brilho (só ficaram cor + relevo). Na tela fica bom (ver `fusca-preview.jpg`); se precisar de mais reflexo, ajustar `metalness`/`roughness` no código.
- Carregar: `GLTFLoader` normal do Three.js (a quantização é suportada sem decoder extra).

O Fusca da Ju Designer (link `volkswagen-fusca-889c381...`) **não serve**: download desligado, sem licença e 766 mil triângulos.
