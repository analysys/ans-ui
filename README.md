# Ans UI

基于 Vue 开发的易观前端组件库，https://analysys.github.io/ans-ui_docs/#/

## 安装

```sh
# 使用 yarn 安装
yarn add ans-ui
# 或者使用 npm 安装
npm i ans-ui
```

## 使用

全部引入

```javascript
import Vue from 'vue'
import AnsUI from 'ans-ui'
import 'ans-ui/lib/ans-ui.min.css'

Vue.use(AnsUI)
```

按需引入

```javascript
import Vue from 'vue'
import { xButton } from 'ans-ui'
import 'ans-ui/lib/ans-ui.min.css'

Vue.use(xButton)
```

## 开发

先全局安装 parcel-bundler

```sh
# 使用 yarn 安装
yarn global add parcel-bundler
# 或者使用 npm 安装
npm i -g parcel-bundler
```

再启动命令

```sh
yarn dev
# or
npm run dev
```
