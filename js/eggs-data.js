/* ==========================================================================
   EGG HUNTER - イースターエッグ定義データ
   全50個。tier: easy(20) / medium(15) / hard(10) / secret(5)
   id は unlock() のキーとして使う。絶対に重複させない。
   ========================================================================== */
window.EGG_DATA = [
  // ------------------------- EASY (20) -------------------------
  { id: "logo_click5",        tier: "easy", title: "連打ハンター",       hint: "ロゴを5回続けてクリック／タップしてみよう" },
  { id: "hero_longpress",     tier: "easy", title: "じっくり派",         hint: "トップのメイン画像を1秒以上長押しし続けてみよう" },
  { id: "select_all_secret",  tier: "easy", title: "透明人間発見",       hint: "ページ内で「すべて選択」（Ctrl+A／長押しで範囲選択）してみよう" },
  { id: "scroll_bottom_over", tier: "easy", title: "どこまでも",         hint: "ホームの一番下までスクロールして、さらに下へスクロールし続けてみよう" },
  { id: "icon_click10",       tier: "easy", title: "アイコン愛好家",     hint: "クルクル変わるアイコンを10回クリックしてみよう" },
  { id: "footer_year_click7", tier: "easy", title: "時の番人",           hint: "フッターの年号を7回クリックしてみよう" },
  { id: "nav_hover_hold",     tier: "easy", title: "石像",               hint: "ナビの「About」の上に3秒間カーソル／指を置いたままにしてみよう" },
  { id: "type_tamago",        tier: "easy", title: "言霊",               hint: "サイト内のどこかの入力欄に「たまご」と入力してみよう" },
  { id: "broken_img_click",   tier: "easy", title: "故障探検隊",         hint: "ギャラリーの壊れた画像を見つけてクリックしてみよう" },
  { id: "gallery_dblclick",   tier: "easy", title: "二度見",             hint: "ギャラリーの写真をダブルクリック／ダブルタップしてみよう" },
  { id: "drag_egg_basket",    tier: "easy", title: "収穫祭",             hint: "ギャラリーのウサギのアイコンをカゴにドラッグ＆ドロップしてみよう" },
  { id: "like_button_20",     tier: "easy", title: "いいね魔人",         hint: "「いいね」ボタンを20回押してみよう" },
  { id: "hidden_link_about",  tier: "easy", title: "文中の道",           hint: "Aboutページの文章の中に隠れたリンクを探してクリックしてみよう" },
  { id: "narrow_window",      tier: "easy", title: "細道",               hint: "ウィンドウの横幅をとても狭くしてみよう（スマホは画面を回転してみよう）" },
  { id: "darkmode_toggle3",   tier: "easy", title: "点滅生活",           hint: "設定のダークモード切替を3回すばやくカチカチしてみよう" },
  { id: "mute_maxvolume",     tier: "easy", title: "サイレント全開",     hint: "設定でミュートと音量最大を同時にしてみよう" },
  { id: "header_icon_click7", tier: "easy", title: "隠れ扉",             hint: "ヘッダーの小さいベルのアイコンを7回クリックしてみよう" },
  { id: "idle_30s",           tier: "easy", title: "居眠り",             hint: "30秒間なにも操作せず、じっと待ってみよう" },
  { id: "back_forward_nav",   tier: "easy", title: "タイムトラベラー",   hint: "ページ移動した後、ブラウザの「戻る」→「進む」を使ってみよう" },
  { id: "cookie_banner_close3", tier: "easy", title: "しつこい同意",     hint: "下に出てくるCookieバナーの✕を3回押してみよう" },

  // ------------------------- MEDIUM (15) -------------------------
  { id: "konami_code",   tier: "medium", title: "コナミ魂",         hint: "画面右下の🎮パッド（またはPCならキーボード）で ↑↑↓↓←→←→BA を入力してみよう" },
  { id: "shake_snow_globe", tier: "medium", title: "雪と卵",        hint: "ホームのスノードームを実機なら実際に振る、PCなら「振る」ボタンを連打してみよう" },
  { id: "rotate_orientation", tier: "medium", title: "回転寿司",    hint: "画面の向きを変えてみよう（スマホ回転／PCはウィンドウを縦長⇔横長にリサイズ）" },
  { id: "secret_code_input", tier: "medium", title: "暗号解読者",   hint: "ページのソースの中に隠されたコードを見つけて、設定ページの入力欄に入れてみよう" },
  { id: "copy_paragraph", tier: "medium", title: "コピペ職人",      hint: "本文の一部をコピー（選択してCtrl+C／長押しコピー）してみよう" },
  { id: "contextmenu_footer", tier: "medium", title: "右クリック探偵", hint: "フッター付近で右クリック（スマホは長押し）してメニューを開いてみよう" },
  { id: "zoom_in_200",   tier: "medium", title: "拡大鏡",           hint: "ブラウザの表示を200%以上に拡大（ピンチズームでもOK）してみよう" },
  { id: "print_page",    tier: "medium", title: "印刷所",           hint: "このページを印刷しようとしてみよう（Ctrl+P／共有メニューの印刷）" },
  { id: "go_offline",    tier: "medium", title: "圏外冒険家",       hint: "ネット接続を切ってみよう（機内モードやWi-Fiオフ）" },
  { id: "tab_switch_5",  tier: "medium", title: "浮気者",           hint: "他のタブ／アプリに切り替えてまた戻る、を5回繰り返してみよう" },
  { id: "os_darkmode",   tier: "medium", title: "夜型OS",           hint: "端末そのものの設定をダークモードにしてこのサイトを開いてみよう" },
  { id: "night_visit",   tier: "medium", title: "夜更かし",         hint: "深夜0時〜4時にこのサイトへアクセスしてみよう" },
  { id: "contact_form_egg", tier: "medium", title: "お便り",        hint: "お問い合わせフォームの名前欄に「たまご」と入力して送信してみよう" },
  { id: "paste_searchbox", tier: "medium", title: "貼り付け名人",   hint: "どこかの入力欄に何かをペースト（貼り付け）してみよう" },
  { id: "share_button",  tier: "medium", title: "言いふらし屋",     hint: "「シェアする」ボタンを押してみよう" },

  // ------------------------- HARD (10) -------------------------
  { id: "konami_on_404",   tier: "hard", title: "迷子の裏技",     hint: "存在しないページ（404）を開いて、そこでコナミコマンドを入力してみよう" },
  { id: "hash_himitsu",    tier: "hard", title: "呼び名",         hint: "Aboutページの物語をよく読んで、その「続き」を訪ねてみよう" },
  { id: "blog_acrostic",   tier: "hard", title: "頭文字の魔法",   hint: "ブログ記事のタイトルを3つとも読んで、頭文字をつなげた言葉をブログページの合言葉欄に入力してみよう" },
  { id: "meta_10eggs",     tier: "hard", title: "十個目の奇跡",   hint: "他のイースターエッグを10個見つけると、自然と見つかる" },
  { id: "geolocation_ask", tier: "hard", title: "ここはどこ",     hint: "「現在地を教えて」ボタンを押して、位置情報の許可・拒否どちらかを選んでみよう" },
  { id: "console_command", tier: "hard", title: "開発者気分",     hint: "PCならブラウザのコンソールで tamago() を実行、スマホなら卵アイコンを長押ししてミニコンソールを開き tamago() と入力してみよう" },
  { id: "resize_pixel_314", tier: "hard", title: "円周率マニア",  hint: "ウィンドウの横幅をちょうど314pxにしてみよう（設定ページの目安バーが便利）" },
  { id: "vibrate_button",  tier: "hard", title: "振動ボタン",     hint: "ページのどこかに隠れた小さな振動ボタンを見つけて押してみよう" },
  { id: "speed_click_10in1s", tier: "hard", title: "高速連打",    hint: "1秒間に10回、どこかをクリック／タップしてみよう" },
  { id: "empty_space_dblclick", tier: "hard", title: "余白の美学", hint: "ページの何もない余白をすばやく2回クリック／タップしてみよう" },

  // ------------------------- SECRET (5) -------------------------
  { id: "all_easy",   tier: "secret", title: "見習い卵ハンター",       hint: "かんたんな卵を全部集めると見つかる" },
  { id: "all_medium", tier: "secret", title: "熟練卵ハンター",         hint: "ふつうの卵を全部集めると見つかる" },
  { id: "all_hard",   tier: "secret", title: "達人卵ハンター",         hint: "むずかしい卵を全部集めると見つかる" },
  { id: "play_1000sec", tier: "secret", title: "長居のお客様",         hint: "このサイトを開いたまま合計1000秒（約17分）過ごすと見つかる" },
  { id: "complete_all", tier: "secret", title: "伝説のイースターエッグハンター", hint: "残り全部の卵を集めると見つかる" },
];

window.EGG_TIER_LABEL = { easy: "かんたん", medium: "ふつう", hard: "むずかしい", secret: "シークレット" };
window.EGG_TOTAL = window.EGG_DATA.length; // 50
