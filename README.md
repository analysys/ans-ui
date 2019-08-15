# Ans UI

> A Vue-based UI component library for analysys

[Documentation](https://analysys.github.io/ans-ui_docs/#/)

## Installation

```sh
yarn add ans-ui
# or
npm i ans-ui
```

## Usage

Import all components

```javascript
import Vue from 'vue'
import AnsUI from 'ans-ui'
import 'ans-ui/lib/ans-ui.min.css'

Vue.use(AnsUI)
```

Or import specified component

```javascript
import Vue from 'vue'
import { xButton } from 'ans-ui'
import 'ans-ui/lib/ans-ui.min.css'

Vue.use(xButton)
```

## Development

Install parcel-bundler globally

```sh
yarn global add parcel-bundler
# or
npm i -g parcel-bundler
```

Then

```sh
yarn dev
# or
npm run dev
```

## License

MIT