---
marp: true
paginate: true
---

<!-- _class: title -->

# podiumを使ってdocとreadmeを生成する

2023-08-26 @ゴリラ.vim #28

---

## あなたは誰

<div class="grid">
<div class="column">

![height:350](https://avatars.githubusercontent.com/u/44566328?v=4)

</div>
<div class="column2">

```
Name: Omochice
Twitter: @omochicemgr
GitHub: Omochice
Hobby: Vim Deno
```

```
$ vim-startuptime -vimpath ~/.local/nvim/bin/nvim
Extra options: []
Measured: 10 times

Total Average: 23.684300 msec
Total Max:     26.716000 msec
Total Min:     21.802000 msec
```

</div>
</div>

<!--
自己紹介

- GitHubやってる
- VimとDenoがすき
    - 後はformatterとかlinterとかCIとか
-->

---

## ヘルプ、引いていますか？

https://vim-jp.org/vimdoc-ja/helphelp.html

```vim
:help helphelp
```

<!--
- Vimでヘルプ引いてる？
- `:help`でドキュメントがみれる
- ヘルプが引けるととても便利
- ここだけでも覚えて帰ってほしい
-->

---

## プラグインのドキュメントは2箇所ありうる

- doc/foo.txt
    - Vim scriptで書かれているプラグインだとこっちが多い？
- README.md
    - 最近のLuaだとこっちが多い気がする

<!--
- helpでプラグインのドキュメントも引ける

- Vimでドキュメントと言ったとき、2種類あるよ

- doc/下にあるとvimでヘルプがみれて便利だけどgithubでプラグイン漁るときはREADMEに動画とかついてるとわかりやすい

- 2種類ドキュメントがある
-->

---

![READMEしかないプラグインのスクリーンショット](https://user-images.githubusercontent.com/44566328/263171885-405ee508-186f-48c6-af4f-dc947a8e0019.png)

<!--
- たまにどちらかしかないプラグインもある
-->

---

## Vimmer的には

- `doc/foo.txt`だと`:help foo.txt`で引けて便利
    - Vimでヘルプが見れる、すばらしい

- プラグインを作る側としては2箇所に同じドキュメントを書くのは面倒
    - README側を`see :h foo.txt more...`としておくのも1つの手ではあるが...

---

## 最近こんなものが出てきたよ


[tani/podium](https://github.com/tani/podium)

- Plain Old Document(POD)で書いた`.pod`ファイルを変換
    - HTML
    - Markdown
    - LaTeX
    - Vimdoc

<!--
- MarkdownとVimdocを生成する`podium`というのが最近できた
- perlのドキュメント形式のPODのファイルをhtmlとかに変換する
    - PODだけ書けばそれを変換してドキュメント2つが作れる
- Luaで書かれていて、依存がほぼない（luaのランタイムが必要）
- webapiでも用意されている
-->

---

### 例えば(pod => markdown)

<div class="grid">
<div class="column">

```pod
---
name: pod-sample
description: sample pod text
--

=pod

=head1 sample X<sample-index>

sample

=head2 Contents

    Hello gorilla vim!!

=over 0

=item * L<gooogle|https://google.com>

=back

=cut
```

</div>
<div class="column2" style="height: 100%;">

````markdown
# sample

sample

## Contents

```
    Hello gorilla vim!!
```

- [gooogle](https://google.com)
````

</div>
</div>

<!--
- 例えば、podからmarkdownへの変換はこんな感じ
-->

---

### 例えば(pod => vimdoc)

````vimdoc

*pod-sample.txt*                                              sample pod text
=============================================================================
sample ~
                                                               *sample-index*

sample

Contents~

>
    Hello gorilla vim!!
<

- gooogle |https://google.com|


vim:tw=78:ts=8:noet:ft=help:norl:
````

<!--
- 例えば、podからvimdocへの変換はこんな感じ
-->

---

### 個人的に気になったところ

- ハイライトつきコードブロックが出力できない

<div class="grid">
<div class="column">

````
```vim
:echo 42
```
````

</div>
<div class="column2" style="height: 100%;">

```vim
:echo 42
```

</div>
</div>

- ↑のmarkdownに相当するpodの構文がない

<div class="grid">
<div class="column">

```pod
=pod

    ここがコードブロックになる

=cut
```

</div>
<div class="column2" style="height: 100%;">

````
```
:echo 42
```
````

</div>
</div>



<!--
- markdownだとコードブロックにシンタックスハイライトをつける構文があるが、対応するpodの構文はないので出力したmarkdownのコードブロックにハイライトが付かない
- podだとインデントがコードブロックになるが、言語指定ができない
-->

---


### ラッパーを作った

[Omochice/podeno](https://github.com/Omochice/podeno)

- highlight.jsとshiki.jsのハイライト言語に対応

- 現状、pod => Markdownとpod => Vimdocに対応

<div class="grid">
<div class="column" style="height: 100%;">

```pod
begin vim

:echo 42

end vim
```

</div>
<div class="column2" style="height: 100%;">

````markdown
```vim
:echo 42
```
````

```
>
    :echo 42
<
```

</div>
</div>


<!--
- ハイライトをつけたかったのでラッパを書いた
- hilight.jsとshiki.jsで対応しているハイライト言語に対応している
- 私が使う前提で書いているのでpod => markdownとvimdocだけ対応している
-->

---

### 使い方

```console
$ deno install --allow-net --allow-read --allow-write \
    https://pax.deno.dev/Omochice/podeno/cli.ts

$ podeno markdown --in sample.pod
```

<!--
- Githubのreadmeからの引用
- Denoに依存している
    - luaのwasmランタイムを内部で呼んでいるのでユーザランドにluaは必要ない
-->

---

### CIでつかう

https://github.com/Omochice/tataku-processor-deepl/blob/main/.github/workflows/doc.yml


<!--
- vimプラグインに対して使う場合、CIで使うのが便利だと思っている
- README.podだけ書いておいてCIでMarkdownとVimdocを生成させている
-->

---


### 要改善点(知見求)


- インデックス: `X<foo>`とリンク: `L<foo>`の扱い
    - Vimdoc: 同一ファイルの`*foo*`へのリンク
        - `*foo*`(ヘルプタグ)と`|foo|`(ヘルプタグへのリンク)
        - [`:help help-writing`](https://vim-jp.org/vimdoc-ja/helphelp.html#help-writing)が詳しい
    - Markdown: カレントファイルから`foo`の位置にあるものへのリンク
        -  存在しない場所へのリンクになってしまう
        - 例: https://github.com/Omochice/tataku-processor-deepl#contents

<!--
- まだいまいち
- リンクの扱いがうまくいっていない
    - vimdocのドキュメント内リンクを書くとmarkdownで無効なリンクが生成されてしまう
-->

---

### まとめ

- **`:help`は便利**
- Vimプラグインのドキュメントはちゃんとやろうとすると2箇所に必要
- podiumを使うと`.pod`ファイル1つから2つのヘルプを生成できる
- podiumはコードハイライトできない
    - コードブロックにハイライトが付かないのが気になったのでラッパ(`podeno`)を書いた
    - podenoはまだ課題があるので詳しい人、教えてください :bow:

---

---

## 以下、補足資料

---

### 補足: Alternative

- [kdheepak/panvimdoc](https://github.com/kdheepak/panvimdoc)
    - pandocを使ってmd => vimdocに変換
- [FooSoft/md2vim](https://github.com/FooSoft/md2vim)
    - goで書かれたmd => vimdocの変換
    - archived
- [4513ECHO/vim-readme-viewer](https://github.com/4513ECHO/vim-readme-viewer)
    - readmeをvimで読めるようにするプラグイン

