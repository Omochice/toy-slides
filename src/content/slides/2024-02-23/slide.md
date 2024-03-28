---
marp: true
paginate: true
---

<!-- _class: title -->

# Renovateで依存関係の更新をする

---

## Renovate

[Mend Renovate Automated Dependency Updates | Mend.io](https://www.mend.io/renovate/)

(当たり前ですが)*放っておくと依存関係は古くなる*

---

### Renovate

- プロジェクトの依存関係を追跡、アップデートする
    - `package.json`
    - `Genfile`
    - `go.mod`
    - etc

---

### 実際の挙動

- https://github.com/Omochice/dotfiles/pulls?q=is%3Apr+is%3Aclosed

---

### Dependabot

[Keep all your packages up to date with Dependabot - The GitHub Blog](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/)

[Working with Dependabot - GitHub Docs](https://docs.github.com/en/code-security/dependabot/working-with-dependabot)

- Githubに買収された方
- security checkはRenovateだとできなそうなのでべんりそう
- RenovateのRegex Managerみたいなカスタマイズはできなそう?
    - 教えて詳しい人

---

### Appendix

- auto-mergeの設定をすれば自動で依存をアップデートできる
    1. RenovateがPRを作る
        - Renovate自身がauto-mergeを有効化する
    1. PRにhookしてテストが走る
    1. (テストがall-greenなら)マージされる
- マージ後、自動でリリースできるとべんりそう
    - [googleapis/release-please](https://github.com/googleapis/release-please)だとpatchレベルのリリースは自動でできなそう
        - Auto-Releaser 自作の気運


Ref: [GitHub Actions による Renovate の安全自動マージ](https://zenn.dev/shunsuke_suzuki/articles/renovate-auto-merge-github-actions)


