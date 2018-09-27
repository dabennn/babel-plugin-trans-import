# babel-plugin-trans-import
a babel plugin that can transform library import from import declaration to default import declaration

### Installation

```bash
npm i babel-plugin-trans-import -D
```

### Usage

```json
plugins: [
  ["trans-import", { "lib": "lib name", "dir": "directory name" }]
]
```

### Paramters

**lib** `<string>`
default: 'zcos'

**dir** `<string>`
default: 'lib'

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
