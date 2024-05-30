---
marp: true
paginate: true
---

<!-- _class: title -->


# aquaはいいぞ

---

## aqua

[aquaproj/aqua](https://github.com/aquaproj/aqua)

> Declarative CLI Version manager written in Go. Support Lazy Install, Registry, and continuous update with Renovate. CLI version is switched seamlessly

---

## case

```console
$ sed -i "s/foo/bar/g" path/to/file
```

=> bsd系の`sed`だと動かない

---

## case2

```console
CI$ some-tool --version
1.x.y
```

```console
local$ some-tool --version
2.x.y
```

環境ごとに入っているツールのバージョンが違う

ex: https://github.com/chmln/sd?tab=readme-ov-file#installation

---

複数環境で使うツール, バージョンを揃えたい

---

## aquaはいいぞ


- linux/mac/winで動く
- goのsingle binaryなのでインストールが楽
  - PATHにポン置きでも動く
- バージョン値がファイルに書き出されるのでgitで管理できる
- Renovateでアップデートできる

---

### なぜ aqua を使うのか

- ツールのバージョンをチーム及び CI で揃えるため
- プロジェクトに必要なツール及びバージョンをコードで宣言的に管理し、統一的な install 方法 (`aqua i`) を提供するため
- CI でツールをインストールするシェルスクリプトや GitHub Actions を書きたくないため
- Renovate で簡単に update するため
- update するためのコードを極力書きたくないし、漏れなく update したい
- private repository のツールを簡単にインストールするため

ref: https://zenn.dev/shunsuke_suzuki/articles/why-should-you-use-aqua#%E3%81%AA%E3%81%9C-aqua-%E3%82%92%E4%BD%BF%E3%81%86%E3%81%AE%E3%81%8B

---

他人と使うツールのバージョンを揃えられる

=>

自分と使うツールのバージョンを揃えられる

---

### demo

---

## Appendix

https://zenn.dev/shunsuke_suzuki/books/aqua-handbook
