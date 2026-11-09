# 更新するときの決まり

- README には、何ができるか・どう頼むか・どこに詳細があるかだけを書く。規則の中身はスキルの各ファイルへ書く
- 規則は「何をするか」と理由1文で書く。経緯や体験談は書かない
- 例は、リポジトリの見本（`examples/after`）と同じ架空の題材から取る
- 検査スクリプトに規則を足したら、`examples/after` で0件、`examples/before` で反応することを確かめる

```bash
node tools/check-ui.mjs examples/after   # 0件
node tools/check-ui.mjs examples/before  # 反応する
```
