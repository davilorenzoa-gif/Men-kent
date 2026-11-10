# Skills de design deste repositório

Cópias fixadas (vendored) de skills públicas. Ficam no git para carregar em toda sessão do Claude Code neste repositório, inclusive na nuvem, sem depender de instalação na máquina.
Como usar no dia a dia: `gudev/06-SISTEMA-DE-DESIGN.md`.

| Pasta | Origem | Commit | Licença |
|---|---|---|---|
| `design-taste-frontend/` | github.com/Leonxlnx/taste-skill → `skills/taste-skill` (2.5.0) | `822e0b9` (2026-11-05) | MIT |
| `impeccable/` | github.com/pbakaus/impeccable → `plugin/skills/impeccable` (4.8.0) | `5af4319` (2026-11-04) | Apache 2.0 (`impeccable/LICENSE`, `NOTICE.md`) |
| `design-taste-frontend-v1/`, `gpt-taste/`, `high-end-visual-design/`, `minimalist-ui/`, `industrial-brutalist-ui/`, `stitch-design-taste/` | github.com/Leonxlnx/taste-skill-classics | `5e08c93` (2026-10-19) | MIT |

Os arquivos são os originais, sem edição. As regras da GuDev ficam em `gudev/` e têm prioridade sobre as skills.

## Observações
- **impeccable:** o script `scripts/impeccable` baixa um binário do GitHub Releases (pbakaus/impeccable) na primeira execução. Na nuvem, a política de rede ou a checagem de permissões pode bloquear. Sem ele, a skill segue no modo "Launcher unavailable": lê `PRODUCT.md`/`DESIGN.md` direto e usa os arquivos de `reference/`. O processo continua valendo.
- **design-taste-frontend:** os scripts (`scripts/*.mjs`, `assets/layout/*.mjs`) precisam de Node e Chrome. O ambiente na nuvem tem Node 22 e o Chromium do Playwright em `/opt/pw-browsers/chromium`. Eles **ainda não foram executados** aqui.
- As clássicas têm `disable-model-invocation: true`: só rodam se chamadas pelo nome.

## Atualizar
```bash
git clone --depth 1 https://github.com/Leonxlnx/taste-skill /tmp/ts
rm -rf .claude/skills/design-taste-frontend && cp -r /tmp/ts/skills/taste-skill .claude/skills/design-taste-frontend
cp /tmp/ts/LICENSE .claude/skills/design-taste-frontend/LICENSE
# Mesma ideia para pbakaus/impeccable (plugin/skills/impeccable) e taste-skill-classics.
```
Ler o CHANGELOG antes de atualizar, conferir o diff e atualizar a tabela acima com o commit novo.
