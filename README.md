# unslop-ai-app

**AI臭くないAIエージェントアプリを作るスキル**

Webアプリの画面を「AIが作った感じ」にしないための規則と検査スクリプトです。AIエージェント（Claude Code など）に読ませるスキルの形にしてあり、人が読んでもそのまま使えます。

AIに画面を作らせると、頼んでいない部品が増え、片側だけ色の付いたカードや絵文字のアイコンが並び、見出しが宣伝文になりがちです。作者（[@minorun365](https://x.com/minorun365)）がエージェントのアプリやデモアプリを作るなかで、AIへ繰り返し伝えてきた直し方を、日本語の画面向けにまとめました。

AIエージェントのチャット画面に固有の作法（考え中・ツール実行中の表示、ログイン画面、人前で操作する画面）を中心にしていますが、`app-ui-design`、`mobile-web-check`、検査スクリプトは、エージェント以外のWebアプリにもそのまま使えます。日本語の組版と画面の文言、iPhone での確かめ方まで含めているのが特徴です。

<picture>
  <source media="(max-width: 767px)" srcset="examples/preview-mobile.png">
  <img src="examples/preview.png" alt="AIに任せたままの画面と、このスキルを読ませた画面の比較">
</picture>

## 主な機能

| 場所 | 内容 |
|---|---|
| `skills/app-ui-design` | 情報の引き算、AIらしく見える定番の型と直し方、画面の文言、色とコントラスト、日本語の組版、余白、動き、出す前の確認 |
| `skills/agent-app-ui` | エージェントとチャットの画面。応答のMarkdown表示、考え中・ツール実行中の状態表示、ログイン画面、人前で操作する画面、作業の横で動く補助ツール |
| `skills/mobile-web-check` | スマホでも使う画面を iOS Simulator で確かめる手順と、iOS Safari・ホーム画面Webアプリ・アプリ内ブラウザの罠 |
| `tools/check-ui.mjs` | 画面のソースから、AIらしく見える書き方を拾う検査スクリプト（依存なし） |
| `examples/` | `after` が見本の画面、`before` は検査が反応することを確かめるための、わざと崩した画面 |

## 頼み方の例

- 「このダッシュボード、なんかAIっぽいので直して」
- 「社内の問い合わせに答えるチャットアプリを作って」
- 「スマホで開くと崩れてる気がする。見てみて」
- 「人に見せる前に、この画面をひと通りチェックして」

スキルの名前や検査スクリプトの使い方を覚える必要はありません。画面を作る・直す・見てほしい、と普段の言葉で頼めば、考え中の表示、検査スクリプト、iPhone での表示確認まで Claude が自分で済ませます。

## セットアップ

Claude デスクトップアプリの「Code」タブ（または Claude Code）で、このURLを渡して頼むだけです。

> https://github.com/minorun365/unslop-ai-app のスキルを入れて

入れ終わったら新しいセッションを始めると使われます。新しい版が出たときは「unslop-ai-app を最新にして」で更新できます。

### インストールを頼まれた Claude へ

この節は Claude が読むための手順です。自分で入れる人も、この順に進めれば入れられます。

1. リポジトリを `~/.claude/skill-repos/unslop-ai-app` へ置く。無ければ `git clone`、あれば `git pull`
2. `skills/` の3つ（`app-ui-design` `agent-app-ui` `mobile-web-check`）を `~/.claude/skills/` へコピーする。同じ名前があれば上書きする
3. Node.js 18 以上があるかを確かめる。検査スクリプトはこれだけで動く。iOS の確認には Xcode（iOS Simulator）が要る
4. 結果は、何が使えるようになったかと頼み方の例を、コマンドを見せずに平易な言葉で伝える

画面を検査するときは、次のように打つ。指摘が0件なら終了コード0で終わる。意図して残す行には `check-ui-ignore` と書くと対象から外れる。

```bash
node ~/.claude/skill-repos/unslop-ai-app/tools/check-ui.mjs src/
```

## 参考にしたもの

`app-ui-design` の「AIらしく見える定番の型」と検品の項目の一部は、Damir Sokolovsky さんの [unslop](https://github.com/heydamir/unslop)（CC BY 4.0）を参考に、日本語の画面向けに書き直しました。リポジトリ名は unslop にちなんでいますが、unslop の作者とは別の作者によるスキル集です。

## License

Apache License 2.0. Copyright 2026 Minoru Onda
