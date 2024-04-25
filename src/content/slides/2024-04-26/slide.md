---
marp: true
paginate: true
---

<!-- _class: title -->

# `npm install`と`npm ci`の違い

---

## 確認バージョン

`npm 10.5.2`

バージョンによっては挙動が違うので注意が必要

---

## `npm install`

[npm-install | npm Docs](https://docs.npmjs.com/cli/v10/commands/npm-install)


- パッケージのインストールをする
- lockfileがある場合はそれを優先して使用する
  - `npm-shrinkwrap.json`
  - `package-lock.json`
  - `yarn.lock`
- `-g | --global`でglobalのstoreにインストールする
  - デフォルトは`package.json`があるディレクトリに`node_modules`を作る

---

## `npm ci`

[npm-ci | npm Docs](https://docs.npmjs.com/cli/v10/commands/npm-ci)

**`clean install`の略**

- `package-lock.json`がないと失敗する
- `package.json`と内容に不整合があるとエラーになる
- 特定のパッケージの追加はできない
- 実行タイミングで`node_modules`を消す
- `package.json`や`package-lock.json`への書き込みはしない

=> CIでの実行ではこちらを使うのが推奨される

---

## `npm update`

- 引数で指定したパッケージを`package.json`の記載の範囲でアップデートする
  - lockファイルも更新される
  - 例: `"some": ^1.0.0`で指定していて`"some": 1.2.0`が存在する
    - `1.2.0`は`^1.0.0`を満たすので更新
    - `0.x.x`は挙動が違うので要注意
      - https://docs.npmjs.com/cli/v10/commands/npm-update#caret-dependencies-below-100
