---
marp: true
paginate: true
---

<!-- _class: title -->

# Conventional Commitsで<br>machine readableなコミットを書く

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@latest/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
<style>
  .mermaid {
    display: grid;
    place-items: center;
  }
</style>

---

## TL;DR:

- Conventional Commitsでコミットを書くとパースしやすい
  - https://www.conventionalcommits.org/ja/v1.0.0/
- ちゃんと書けばversioningも自動でできるよ

---

## TOC

- [Conventional Commitsとは](#conventional-commits%E3%81%A8%E3%81%AF)
- [具体的にどんな構文で書けばいいの?](#%E5%85%B7%E4%BD%93%E7%9A%84%E3%81%AB%E3%81%A9%E3%82%93%E3%81%AA%E6%A7%8B%E6%96%87%E3%81%A7%E6%9B%B8%E3%81%91%E3%81%B0%E3%81%84%E3%81%84%E3%81%AE)
- [実際にパースしてみる](#%E5%AE%9F%E9%9A%9B%E3%81%AB%E3%83%91%E3%83%BC%E3%82%B9%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B)
- [Versioning](#versioning)
- [自動でリリースノートを作成させる(appendix)](#%E8%87%AA%E5%8B%95%E3%81%A7%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E3%83%8E%E3%83%BC%E3%83%88%E3%82%92%E4%BD%9C%E6%88%90%E3%81%95%E3%81%9B%E3%82%8Bappendix)

---

## Conventional Commitsとは

> 人間と機械が読みやすく、意味のあるコミットメッセージにするための仕様

> Conventional Commits の仕様はコミットメッセージのための軽量の規約です。
> 明示的なコミット履歴を作成するための簡単なルールを提供します。
> この規則に従うことで自動化ツールの導入を簡単にします。
> コミットメッセージで機能追加・修正・破壊的変更などを説明することで、この規約は [SemVer](https://semver.org/lang/ja/) と協調動作します。

---

### 具体的にどんな構文で書けばいいの?

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

(例): `fix: 関数Aのバグを修正  #111`

---

#### Type

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- [Angularの規約](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)が元になっている
- typeに含まれうる文字種はいろいろある
  - 一番有名なのは[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum)
- 破壊的変更が入る場合は`fix!`など`!`が付属する: [例](https://www.conventionalcommits.org/ja/v1.0.0/#%E4%BE%8B)

---

#### Scope

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- モノレポなどだと`fix(parse):`みたいなコミットになることがある: [例(angular/angular)](https://github.com/angular/angular/commit/7981aad30e0e3767e857839af768b1df8db4c9df)
  - プロジェクトの規約とかで拡張可能
- *optional*なので無くてもよい

---

#### Description

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- コミット本文
  - **コミットのprefixと`: `で区切られていないといけない**
- 末尾にissue番号(`#111`など)を含むとgithubなどで追跡しやすい

---

#### Footer

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- コミットのフッタ
  - [`Co-authored-by`](https://docs.github.com/ja/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors)などはここにくる
    - **フッタのトークンは空白の代わりに`-`を使わなければならない**
    - [git interpret trailers](https://git-scm.com/docs/git-interpret-trailers)に準拠

---

## 実際にパースしてみる

https://gist.github.com/Omochice/e04b153d12a16bfe07d1af1dffa6ffd4

----

### パースした結果

```json
input: "feat(sample)!: send an email to the customer when a product is shipped  #1000"
{
  type: "feat",
  scope: "sample",
  subject: "send an email to the customer when a product is shipped  #1000",
  merge: null,
  header: "feat(sample)!: send an email to the customer when a product is shipped  #1000",
  body: null,
  footer: null,
  notes: [
    {
      title: "BREAKING CHANGE",
      text: "send an email to the customer when a product is shipped  #1000"
    }
  ],
  references: [
    {
      action: null,
      owner: null,
      repository: null,
      issue: "1000",
      raw: "feat(sample)!: send an email to the customer when a product is shipped  #1000",
      prefix: "#"
    }
  ],
  mentions: [],
  revert: null
}
```

---

## Versioning

> 1. APIの変更に互換性のない場合はメジャーバージョンを、
> 1. 後方互換性があり機能性を追加した場合はマイナーバージョンを、
> 1. 後方互換性を伴うバグ修正をした場合はパッチバージョンを上げます。

[セマンティック バージョニング 2.0.0 | Semantic Versioning](https://semver.org/lang/ja/)

それぞれconventional commitsのtypeだと以下が対応する

> 1. `!`
> 1. `feat`
> 1. `fix`

---

### リリースするバージョンの特定

<div class="mermaid">
gitGraph
  commit id: "test: add some test" tag: "v1.0.0"
  commit id: "feat: Add some feature"
  commit id: "refactor: Refactor some function"
  commit id: "test: Add test for some function"
  commit id: "fix: fix some problem"
  commit id: "feat: Add some feature2"
  commit id: "chore: update dependencies"
  commit id: "build: update build step"
  commit id: "perf: fix performance"
  commit id: "fix: fix some buf"
  commit id: "test: Add some test case" tag: "v1.1.0"
</div>

- 前回リリース(図だと`v1.0.0`)からどんな種類のコミットが積まれているかを調べる
  - `"!"`を含むコミットが積まれていればメジャーバージョンを上げる
  - `"feat"`を含むコミットが積まれていればマイナーバージョンを上げる
  - `"fix"`を含むコミットが積まれていればパッチバージョンを上げる

---

## 自動でリリースノートを作成させる(appendix)

<div class="mermaid">
gitGraph
  commit id: "feat: add featA"
  commit id: "refactor: some refactor"
  commit id: "test: add some test" tag: "v1.0.0"
  branch tickets/1234
  checkout tickets/1234
  commit id: "fix: fix bug for featA  #1234"
  commit id: "test: add test  #1234"
  commit id: "refactor: some refactor  #1234"
  checkout main
  merge tickets/1234 tag: "v1.0.1"
</div>

- [googleapis/release-please](https://github.com/googleapis/release-please)や[release-it/release-it](https://github.com/release-it/release-it)などを使うとconventional commitsから次のリリースバージョンを特定、自動でリリースできる
    - https://github.com/folke/noice.nvim/releases/tag/v1.16.0 みたいなことができる

---

## 参考文献

- [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)
- [commit typeは誰に向けたものなのか - HRBrain Blog](https://times.hrbrain.co.jp/entry/how-to-write-commit-message-type)
- [コミットメッセージ規約 「Conventional Commits」を導入してみよう！ / Let's use Conventional Commits - Speaker Deck](https://speakerdeck.com/cocoeyes02/lets-use-conventional-commits) 
