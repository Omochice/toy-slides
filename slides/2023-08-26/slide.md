---
marp: true
paginate: true
---

<!-- _class: title -->

# Podiumを使ってDoc/READMEを生成する

2023-08-26 @ゴリラVim #28

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

---


## プラグインのドキュメント

- doc/foo.txt
    - Vim scriptで書かれているプラグインだとこっちが多い？
- README.md
    - 最近のLuaだとこっちが多い気がする

---

![こういうプラグイン、あるよね](https://user-images.githubusercontent.com/44566328/262411193-300584ed-e69d-4052-a99d-08f4ef4e80d4.png)

---

## Vimmer的には

- `doc/foo.txt`だと`:help foo.txt`で引けて便利
    - Vimでヘルプが見れる、すばらしい

- プラグインを作る側としては2箇所に同じドキュメントを書くのは面倒
    - README側を`see :h foo.txt more...`としておくのも1つの手ではあるが...

---

## 最近こんなものが出てきたよ


[tani/podium](https://github.com/tani/podium)

---

### べんり

- Plain Old Document(POD)で書いた`.pod`ファイルを変換
    - HTML
    - Markdown
    - LaTeX
    - Vimdoc

---

### 例えば

left right

---

### Alternative

- [kdheepak/panvimdoc](https://github.com/kdheepak/panvimdoc)
    - pandocを使ってmd => vimdocに変換
- [FooSoft/md2vim](https://github.com/FooSoft/md2vim)
    - goで書かれたmd => vimdocの変換
    - archived
- [4513ECHO/vim-readme-viewer](https://github.com/4513ECHO/vim-readme-viewer)
    - readmeをvimで読めるようにするプラグイン

---

### もう少し...

- ハイライトつきコードブロックが出力できない

````
```vim
:help help
```
````

---


### ラッパーを作った

[Omochice/podeno](https://github.com/Omochice/podeno)

- highlight.jsとshiki.jsのハイライト言語に対応

```pod
begin vim

:help help

end
```

---


### CIでこう使ってるよ

https://github.com/Omochice/tataku-processor-deepl/blob/main/.github/workflows/doc.yml

---


### いまいちなところ


- インデックス: `X<foo>`とリンク`L<foo>`の扱い
    - Vimdoc: 同一ファイルの`foo`へのリンク
        - `|foo|`と`*foo*`
    - Markdown: カレントファイルから`foo`の位置にあるものへのリンクになってしまう
        - https://github.com/Omochice/tataku-processor-deepl#contents のリンクが不正になる
