# 更新するときの決まり

- README には、何ができるか・どう頼むか・どこに詳細があるかだけを書く。規則の中身はスキルの各ファイルへ書く
- 規則は「何をするか」と理由1文で書く。経緯や体験談は書かない
- 例は、リポジトリの見本（`examples/after`）と同じ架空の題材から取る
- 検査スクリプトに規則を足したら、`examples/after` で0件、`examples/before` で反応することを確かめる

リポジトリのルートで実行する。以下は PowerShell・コマンドプロンプト・POSIX シェルで共通。`after` は終了コード0、`before` は指摘が出て終了コード1になる。

```text
node tools/check-ui.mjs examples/after
node tools/check-ui.mjs examples/before
node --test tools/check-ui.test.mjs
```

- OS 固有のコマンドは、その OS 専用の手順に閉じ込め、共通の利用手順では必須にしない
- パスは Node.js の `node:path`、一時ディレクトリは `node:os` を使う。空白・日本語を含むパスと LF・CRLF で結果が変わらないことを確かめる
- GitHub Actions では Windows・macOS・Linux と Node.js 18・22・24 で回帰テストを実行する
