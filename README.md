# 🥚 EGG HUNT

サイト内のあらゆる場所に隠された **全50個のイースターエッグ** を見つけ出すブラウザゲーム。
PC・スマホどちらでも全ての要素を発見できるように、各仕掛けはクリック/タップ・右クリック/長押しなど両対応のトリガーで実装されています。

**公開URL:** https://kaikomziu.github.io/easter-egg-hunter/

## 構成

- `index.html` — メインのSPA（ホーム/About/ギャラリー/ブログ/お問い合わせ/設定）
- `404.html` — GitHub Pages用のカスタム404ページ（ここでしか発見できないエッグあり）
- `css/style.css` — 全スタイル（ライト/ダーク対応、レスポンシブ）
- `js/eggs-data.js` — 50個のエッグ定義（id・難易度・ヒント）
- `js/eggs-core.js` — 進捗保存（localStorage）、実績パネル、トースト通知、コナミコマンド、グローバルトリガー群
- `js/app.js` — index.html 専用のルーティング＆ページ固有の仕掛け
- `js/version.js` — 更新履歴

## 難易度

| 難易度 | 個数 |
|---|---|
| かんたん | 20 |
| ふつう | 15 |
| むずかしい | 10 |
| シークレット | 5 |

## 開発メモ

- ビルド不要の素のHTML/CSS/JS。GitHub Pagesにそのまま置くだけで動作します。
- 進捗はブラウザの `localStorage` に保存されるため、端末・ブラウザが変わるとリセットされます。
- 変更のたびに [CHANGELOG](js/version.js) を更新し、GitHubへpushしてください。
