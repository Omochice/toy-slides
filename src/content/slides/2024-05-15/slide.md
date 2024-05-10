---
marp: true
paginate: true
---

<!-- _class: title -->

# RenovateでDenoの依存ライブラリをアップデートしてみた

2024-05-15 toranoana.deno #16

---

## あなたは誰

<div class="flex items-center">
<div class="flex-1">

![height:350](https://avatars.githubusercontent.com/u/44566328?v=4)

</div>
<div class="flex-auto">

```yml
Name: Omochice
Twitter: @omochicemgr
GitHub: Omochice
Hobby: Vim
```

</div>
</div>

---

## Denoの依存を追いかけるの辛くないですか？

---

### deno.land/stdの更新頻度

<div class="flex items-center">
<div class="flex-1">

1, 2週間に1回程度リリースされている

</div>
<div class="flex-1 grid place-content-center">

|Version|Date      |
|-------|----------|
|0.224.0|2024-04-25|
|0.223.0|2024-04-15|
|0.222.1|2024-04-11|
|0.222.0|2024-04-11|
|0.221.0|2024-03-27|
|0.220.1|2024-03-15|
|0.220.0|2024-03-14|

</div>
</div>

---

手で依存を更新するのは大変なので自動化したい

---

## 自動で依存をアップデートするツール

- [hayd/deno-udd](https://github.com/hayd/deno-udd)
- [boywithkeyboard/updater](https://github.com/boywithkeyboard/updater)
- [drashland/dmm](https://github.com/drashland/dmm)
- [hasundue/molt](https://github.com/hasundue/molt)
- [Dependabot](https://github.com/dependabot)
- [renovatebot/renovate](https://github.com/renovatebot/renovate)
- ...

---

数が多いので端折ります

---

### udd, updater, dmm

- 正規表現ベースや文字列一致で依存を探す
  - 本来反応して欲しくない部分（コメントアウト等）にも反応してしまう

```ts
import { join } from "jsr:@std/path@0.224.0/join";

// https://deno.land/std@0.224.0/path/join.ts // ここにもマッチしてしまう
```

---

### molt

- [deno_graph](https://jsr.io/@deno/graph)で依存グラフを作ってからアップデート確認をする
  - コメントアウトされている部分や文字列に反応しない

---

### Dependabot

- GitHubの機能として提供されている
  - リポジトリの設定をGUIでやれば動く
- Rubyで書かれている（はず）
- 他のツールのアップデートもできる
- 最近コア部分がOSSになった
  - [dependabot-core is now open source with an MIT license - The GitHub Blog](https://github.blog/changelog/2024-05-13-dependabot-core-is-now-open-source-with-an-mit-license/)

denoに対応させられるかは不明

---

### Renovate

- GitHubのApplicationとして提供されている
- 正規表現ベース
- 他のツールのアップデートもできる

---

#### 作ったやつ

<div class="flex items-center">
<div class="flex-1">

[renovate-config](https://github.com/Omochice/renovate-config)

[RenovateでDenoの依存関係をアップデートする](https://zenn.dev/omochice/articles/387a44fc0f5885)

- `https://deno.land/`
- `npm:`, `jsr:`
- `deno.jsonc`のimport map
- `deno.lock`はアップデートできない

</div>
<div class="flex-1 ">

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "github>Omochice/renovate-config:deno"
  ]
}
```

</div>
</div>

---

#### 実際に動いているところ

[chore(deps): update dependency https://deno.land/std to v0.223.0 by renovate[bot] · Pull Request #63 · Omochice/deno-redmine](https://github.com/Omochice/deno-redmine/pull/63)

---

#### 半年ほど使ってみての所感

- 自動で更新がされるので都度手であげて動作を確認しなくてよくなった
  - `deno check`が通るMinorとかPatchは自動で更新している
    - denoが型チェッカー内蔵なのがありがたい
- checkが落ちてても軽微なバグなら直しにいける
  - [fix(deno): fix missing extensions by Omochice · Pull Request #387 · fabian-hiller/valibot](https://github.com/fabian-hiller/valibot/pull/387)

---

#### 困っていること(1/2)

- Renovateでの `deno.land/std/` から `jsr:@std/`への置き換え
  - パッケージが`std`から`std/foo`になる
    - `std@x.y.z/assert`が`std/assert@x.y.z`になってしまう
    - `std@x.y.z/assert/assert.ts`を`std/assert@x.y.z/assert`にしないといけない
      - jsonで表現しないといけない

---

#### 困っていること(2/3)

- `deno.lock`の更新
  - renovateでlockfileを更新するAPIはあるがself-hostedなrenoveteじゃないと動かなそう
    - [Configuration Options - Renovate Docs](https://docs.renovatebot.com/configuration-options/#postupgradetasks)

---

#### 困っていること(3/3)

- jsrのnpm互換のAPIの情報が足りない
  - [npm compatibility registry API](https://jsr.io/docs/api#npm-compatibility-registry-api)
  - 公開されてからの時間とかリリースノートとかの情報が入っていない
    - [chore(deps): update dependency @std/path to v0.224.0 by renovate[bot] · Pull Request #94 · Omochice/tataku.vim](https://github.com/Omochice/tataku.vim/pull/94)

---

## サマリ

- HEADを追いかけるのは大変
- アップデートは自動でやりたいね
- Renovateで更新させてみたら便利だった
  - いくつか不満点もある
