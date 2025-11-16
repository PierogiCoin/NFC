# PierogiCoin NFC

Krótki opis: biblioteka do komunikacji NFC dla projektu PierogiCoin — szybki, typowany TypeScript API do odczytu/zapisu tagów NFC.

Badges: CI | coverage | npm

## Szybki start

Install:

```bash
npm install @pierogicoin/nfc
```

Przykład:

```ts
import { NfcReader } from '@pierogicoin/nfc';

const reader = new NfcReader();
await reader.connect();
const tag = await reader.read();
console.log(tag);
```

Dokumentacja API:
- /docs (TypeDoc)
- /examples

Testy:

```bash
npm run lint
npm run typecheck
npm test
```

Contributing:
- Zobacz CONTRIBUTING.md
- Używaj conventional commits
