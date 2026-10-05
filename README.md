# PoliNetwork Skills

Skill per agenti AI (Claude, Claude Code, Codex e gli altri agenti supportati da
[`npx skills`](https://github.com/vercel-labs/skills)) usate da PoliNetwork APS.

## Skill disponibili

| Skill | A cosa serve | Documentazione |
|---|---|---|
| [`polinetwork-slides`](skills/polinetwork-slides/) | Presentazioni HTML animate con il tema PoliNetwork, per assemblee e riunioni | [README](skills/polinetwork-slides/README.md) · [Guida](skills/polinetwork-slides/GUIDA.md) |

## Installazione

Con Node.js, da qualsiasi agente supportato:

```bash
npx skills add PoliNetworkOrg/skills                               # sceglie quali installare
npx skills add PoliNetworkOrg/skills --skill polinetwork-slides    # una sola skill
npx skills update                                                  # aggiorna quelle installate
```

`-a claude-code` o `-a codex` sceglie l'agente, `-g` installa per l'utente invece che nel
progetto. Le istruzioni passo passo (claude.ai, Claude Code, Codex, anche senza Node.js) sono
nella guida di ogni skill.

## Struttura

```
skills/
  <nome-skill>/
    SKILL.md      istruzioni per l'agente, con frontmatter name e description
    README.md     cosa fa, installazione, manutenzione
    …             template, riferimenti, script e asset della skill
```

## Aggiungere una skill

1. Crea `skills/<nome-skill>/` con il suo `SKILL.md`. Il campo `name` del frontmatter deve
   coincidere con il nome della cartella.
2. Tieni dentro la cartella tutto quello che serve alla skill: ogni skill si installa da sola,
   senza file condivisi fuori dalla sua cartella.
3. Aggiungi una riga alla tabella "Skill disponibili" qui sopra.
4. Controlla che venga trovata: `npx skills add . --list`.

Non mettere un `SKILL.md` nella radice della repo: `npx skills` si fermerebbe lì e non vedrebbe
le skill in `skills/`.
