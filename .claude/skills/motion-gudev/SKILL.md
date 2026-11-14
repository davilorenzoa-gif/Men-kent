---
name: motion-gudev
description: Use ao criar ou animar qualquer site da GuDev. Define as bibliotecas de animação padrão (GSAP, Lenis e efeitos do React Bits).
---

# Motion padrão da GuDev

- **Lenis**: rolagem suave em todo site.
- **GSAP + ScrollTrigger**: animações ligadas à rolagem.
- **React Bits** (reactbits.dev): banco de ideias de efeito. Nunca usar React; converter pra JS puro, como em `gudev/efeitos/react-bits-convertidos.html`.
- Carregar GSAP e Lenis por CDN com versão fixa. No HTML único, rodar `gudev/ferramentas/arquivo_unico.py`.
- Animar só transform/opacity. Tudo liso a 60fps no celular.
- Antes de criar um efeito, ler `gudev/aprendizados/guia-motion-premium.md`.
