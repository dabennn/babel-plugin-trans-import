# babel-plugin-trans-import
a babel plugin that can transform library import from import declaration to default import declaration

### Installation

```bash
npm i babel-plugin-trans-import -D
```

### Usage

```json
plugins: [
  ["trans-import", { "lib": "library name", "dir": "library directory name" }]
]
```

### Paramters

**lib**: library name
- type: `<string>`

**dir**: library directory name
- type: `<string>`
- default: `'lib'`

### Example

```javascript
// plugins: [
//   ["trans-import", { "lib": "zcos", "dir": "zcos/lib" }]
// ]

// before transform
import { list, env } from 'zcos';

// after transform
import list from 'zcos/lib/list';
import env from 'zcos/lib/env';
```

### Development Plan

- [x] support to transform import declaration like `import { methods } from 'lib'`
- [x] support to transform import declaration like `import method, { method } from 'lib'`
