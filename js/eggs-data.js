/* ==========================================================================
   EGG HUNTER - イースターエッグ定義データ
   全150個。tier: easy / medium / hard / secret
   id は unlock() のキーとして使う。絶対に重複させない。
   ========================================================================== */
(function () {
  "use strict";

  // ------------------------- ORIGINAL 50 -------------------------
  var CORE = [
    // ---- EASY (20) ----
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

    // ---- MEDIUM (15) ----
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

    // ---- HARD (10) ----
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

    // ---- SECRET (5) ----
    { id: "all_easy",   tier: "secret", title: "見習い卵ハンター",       hint: "かんたんな卵を全部集めると見つかる" },
    { id: "all_medium", tier: "secret", title: "熟練卵ハンター",         hint: "ふつうの卵を全部集めると見つかる" },
    { id: "all_hard",   tier: "secret", title: "達人卵ハンター",         hint: "むずかしい卵を全部集めると見つかる" },
    { id: "play_1000sec", tier: "secret", title: "長居のお客様",         hint: "このサイトを開いたまま合計1000秒（約17分）過ごすと見つかる" },
    { id: "complete_all", tier: "secret", title: "伝説のイースターエッグハンター", hint: "残り全部の卵を集めると見つかる" }
  ];

  // ------------------------- ADDITIONAL 100 -------------------------

  // ---- 手作りエッグ (39) ----
  var HANDCRAFTED = [
    // easy (5)
    { id: "gallery_longpress2",   tier: "easy", title: "もう一枚",       hint: "ギャラリーの写真をどれか1つ、1秒以上長押ししてみよう" },
    { id: "home_icon_click5_v2",  tier: "easy", title: "双子アイコン",   hint: "ホームに増えた新しいアイコンを5回クリック／タップしてみよう" },
    { id: "footer_credit_click5", tier: "easy", title: "クレジット魔人", hint: "フッターの「Made for...」の文を5回クリックしてみよう" },
    { id: "settings_label_click5",tier: "easy", title: "設定の常連",     hint: "設定ページのどれかの見出しを5回クリックしてみよう" },
    { id: "contact_message_word", tier: "easy", title: "心の声",         hint: "お問い合わせのメッセージ欄に「ひみつ」と入力してみよう" },

    // medium (15)
    { id: "shortcut_ctrl_shift_e", tier: "medium", title: "隠しショートカット", hint: "キーボードで Ctrl(⌘)+Shift+E を押してみよう" },
    { id: "shortcut_alt_g",        tier: "medium", title: "もうひとつの鍵",    hint: "キーボードで Alt+G を押してみよう" },
    { id: "shortcut_escape_x5",    tier: "medium", title: "逃げ足",           hint: "Escapeキーを3秒以内に5回連続で押してみよう" },
    { id: "shortcut_enter_hold",   tier: "medium", title: "根気強く",         hint: "どこかの入力欄でEnterキーを2秒以上押しっぱなしにしてみよう" },
    { id: "shortcut_konami_reverse", tier: "medium", title: "逆コナミ",       hint: "🎮パッドで通常のコナミコマンドを逆順（A→B→→←→←↓↓↑↑）に入力してみよう" },
    { id: "quiz_total_eggs",       tier: "medium", title: "数える人",         hint: "設定ページのクイズ「全部で卵は何個？」に正しい数字で答えてみよう" },
    { id: "tour_all_pages",        tier: "medium", title: "駆け足ツアー",     hint: "60秒以内に、ホーム・About・ギャラリー・ブログ・お問い合わせ・設定・図鑑・ミニゲームをすべて訪れてみよう" },
    { id: "minigame_clear",        tier: "medium", title: "反射神経",         hint: "ミニゲームページの反射神経ゲームを1回クリアしてみよう" },
    { id: "slider_volume_7",       tier: "medium", title: "ラッキーセブン",   hint: "設定の音量スライダーをちょうど7にしてみよう" },
    { id: "slider_width_250",      tier: "medium", title: "IMAXシアター",     hint: "画面幅シミュレーターをちょうど250にしてみよう" },
    { id: "console_himitsu",       tier: "medium", title: "もう一つのコマンド", hint: "ミニコンソール（またはブラウザコンソール）で himitsu() と実行してみよう" },
    { id: "notify_permission",     tier: "medium", title: "お知らせ許可",     hint: "設定ページの通知ボタンを押して、許可・拒否どちらかを選んでみよう" },
    { id: "webgl_check",           tier: "medium", title: "グラフィック診断", hint: "設定ページの「グラフィック診断」ボタンを押してみよう" },
    { id: "blog_acrostic2",        tier: "medium", title: "もうひとつの頭文字", hint: "追加されたブログ記事2つの頭文字をつなげて、ブログページの合言葉欄（2つ目）に入力してみよう" },
    { id: "reduced_motion_pref",   tier: "medium", title: "やさしい設定",     hint: "端末の「視差効果を減らす」設定をONにしてこのサイトを開いてみよう" },

    // hard (9)
    { id: "distributed_code",   tier: "hard", title: "分散コード",   hint: "About・ギャラリー・ブログ・お問い合わせの各ページのソースに1桁ずつ隠された数字を集め、設定ページの「分散コード」欄に4桁で入力してみよう" },
    { id: "query_param_egg",    tier: "hard", title: "URLの魔法",   hint: "URLの末尾に ?egg=open を付けてアクセスしてみよう" },
    { id: "stillness_challenge",tier: "hard", title: "石になる",     hint: "ミニゲームページの静止チャレンジの的の上で、15秒間まったく動かさずにカーソル／指を置き続けてみよう" },
    { id: "click_100_times",    tier: "hard", title: "百打の境地",   hint: "ミニゲームページの小さな的を合計100回クリック／タップしてみよう" },
    { id: "minigame_perfect",   tier: "hard", title: "完全勝利",     hint: "ミニゲームの反射神経ゲームでノーミス（5/5）クリアしてみよう" },
    { id: "golden_ratio_resize",tier: "hard", title: "黄金比",       hint: "ウィンドウの縦横比をちょうど黄金比（約1.618:1）に近づけてみよう" },
    { id: "palindrome_input",   tier: "hard", title: "回文の心得",   hint: "設定ページの回文チェック欄に、前から読んでも後ろから読んでも同じ言葉を入力してみよう" },
    { id: "just_time",          tier: "hard", title: "ジャストタイム", hint: "設定ページの「今の時間を見る」ボタンを、秒がちょうど00の瞬間に押してみよう" },
    { id: "hash_zukan_ura",     tier: "hard", title: "図鑑の裏側",   hint: "図鑑ページの説明文をよく読んで、その「裏側」を訪ねてみよう" },

    // secret (10)
    { id: "all_zukan",           tier: "secret", title: "図鑑コンプリート", hint: "図鑑のアイテムを全部集めると見つかる" },
    { id: "combo_5in60s",        tier: "secret", title: "連続発見",         hint: "60秒以内に5個のエッグを見つけると見つかる" },
    { id: "no_hint_20",          tier: "secret", title: "直感の勝利",       hint: "ヒントを一度も見ずに20個のエッグを見つけると見つかる" },
    { id: "early_bird",          tier: "secret", title: "早起き",           hint: "朝6時より前にこのサイトを開くと見つかる" },
    { id: "comeback_24h",        tier: "secret", title: "また来たね",       hint: "初回訪問から24時間以上経ってから、もう一度エッグを見つけると見つかる" },
    { id: "night_owl_2to3",      tier: "secret", title: "丑三つ時",         hint: "深夜2時〜3時の間にこのサイトを開くと見つかる" },
    { id: "konami_master",       tier: "secret", title: "コナミの達人",     hint: "通常のコナミコマンド・逆コナミ・404でのコナミコマンド、全部見つけると見つかる" },
    { id: "total_click_500",     tier: "secret", title: "クリック生活",     hint: "サイト内で合計500回クリック／タップすると見つかる" },
    { id: "settings_explorer",   tier: "secret", title: "設定マニア",       hint: "設定ページのスイッチ（ダークモード・ミュート・効果音）を全部一度は操作すると見つかる" },
    { id: "night_visit_and_zukan", tier: "secret", title: "深夜の図鑑",     hint: "深夜アクセスと図鑑コンプリートの両方を達成すると見つかる" }
  ];

  // ---- 図鑑（ZUKAN）自動生成エッグ (61) ----
  // [idサフィックス, アイコン, タイトル, need]
  var ZUKAN_EASY = [
    ["e01","🍄","きのこの影"], ["e02","🐌","かたつむりの跡"], ["e03","🦋","蝶の羽ばたき"],
    ["e04","🐞","てんとう虫"], ["e05","🕸️","蜘蛛の巣"], ["e06","🌰","どんぐり"],
    ["e07","🍯","はちみつの壺"], ["e08","🪺","巣の中"], ["e09","🐚","貝殻"],
    ["e10","🌾","稲穂"], ["e11","🍁","紅葉"], ["e12","❄️","初雪"],
    ["e13","🌙","三日月"], ["e14","⭐","流れ星"], ["e15","🪐","遠い星"],
    ["e16","🔮","水晶玉"], ["e17","🕯️","ろうそくの灯"], ["e18","📜","古い巻物"],
    ["e19","🗝️","小さな鍵"], ["e20","🧭","方位磁針"], ["e21","⚗️","錬金の瓶"],
    ["e22","🧵","糸巻き"], ["e23","🪞","割れた鏡"], ["e24","🎐","風鈴の音"],
    ["e25","🪁","凧"], ["e26","🎏","こいのぼり"], ["e27","🍀","四つ葉"],
    ["e28","🌈","虹のかけら"], ["e29","🫧","しゃぼん玉"], ["e30","🥄","銀のスプーン"]
  ];
  var ZUKAN_MEDIUM = [
    ["m01","🦉","ふくろうの瞳", { type: "click", count: 5 }],
    ["m02","🦔","はりねずみ", { type: "dblclick" }],
    ["m03","🐿️","どんぐり集め", { type: "longpress", ms: 1000 }],
    ["m04","🦢","白鳥の湖", { type: "hover", ms: 2000 }],
    ["m05","🐢","のろまな旅人", { type: "click", count: 5 }],
    ["m06","🦎","とかげの尻尾", { type: "dblclick" }],
    ["m07","🐝","働き蜂", { type: "longpress", ms: 1000 }],
    ["m08","🦇","夜の使者", { type: "hover", ms: 2000 }],
    ["m09","🐙","深海のたこ", { type: "click", count: 5 }],
    ["m10","🦑","いかの墨", { type: "dblclick" }],
    ["m11","🐡","ふくらむ魚", { type: "longpress", ms: 1000 }],
    ["m12","🦀","横歩きの達人", { type: "hover", ms: 2000 }],
    ["m13","🐧","南極の紳士", { type: "click", count: 5 }],
    ["m14","🦥","のんびり屋", { type: "dblclick" }],
    ["m15","🦦","かわうそ", { type: "longpress", ms: 1000 }],
    ["m16","🦨","とりあつかい注意", { type: "hover", ms: 2000 }],
    ["m17","🐫","砂漠の旅", { type: "click", count: 5 }],
    ["m18","🦒","高いところ", { type: "dblclick" }],
    ["m19","🐘","大きな記憶", { type: "longpress", ms: 1000 }],
    ["m20","🦁","森の王様", { type: "hover", ms: 2000 }]
  ];
  var ZUKAN_HARD = [
    ["h01","🐉","伝説の竜", { type: "click", count: 20 }],
    ["h02","🦄","幻の一角獣", { type: "longpress", ms: 3000 }],
    ["h03","🧜","人魚の歌", { type: "click", count: 30 }],
    ["h04","🧞","願いの精", { type: "click", count: 20 }],
    ["h05","🦅","空の覇者", { type: "longpress", ms: 3000 }],
    ["h06","🐺","月夜の遠吠え", { type: "click", count: 30 }],
    ["h07","🦂","砂漠の毒針", { type: "click", count: 20 }],
    ["h08","🕷️","大きな蜘蛛", { type: "longpress", ms: 3000 }],
    ["h09","🐍","静かな脱皮", { type: "click", count: 30 }],
    ["h10","🦖","太古の記憶", { type: "click", count: 20 }],
    ["h11","🌋","眠れる火山", { type: "longpress", ms: 3000 }]
  ];

  function needHint(need) {
    if (need.type === "click" && need.count === 1) return "図鑑のこのアイテムをクリック／タップしてみよう";
    if (need.type === "click") return "図鑑のこのアイテムを" + need.count + "回クリック／タップしてみよう";
    if (need.type === "dblclick") return "図鑑のこのアイテムをダブルクリック／ダブルタップしてみよう";
    if (need.type === "longpress") return "図鑑のこのアイテムを" + (need.ms / 1000) + "秒以上長押ししてみよう";
    if (need.type === "hover") return "図鑑のこのアイテムにカーソルを" + (need.ms / 1000) + "秒以上置く（スマホは長押し）してみよう";
    return "図鑑のこのアイテムを試してみよう";
  }

  function buildZukan(list, tier, defaultNeed) {
    return list.map(function (row) {
      var need = row[3] || defaultNeed;
      return {
        id: "zukan_" + tier + "_" + row[0],
        tier: tier,
        title: row[2],
        icon: row[1],
        zukan: true,
        need: need,
        hint: needHint(need)
      };
    });
  }

  var ZUKAN = []
    .concat(buildZukan(ZUKAN_EASY, "easy", { type: "click", count: 1 }))
    .concat(buildZukan(ZUKAN_MEDIUM, "medium", { type: "click", count: 5 }))
    .concat(buildZukan(ZUKAN_HARD, "hard", { type: "click", count: 20 }));

  window.EGG_DATA = CORE.concat(HANDCRAFTED, ZUKAN);
  window.EGG_TIER_LABEL = { easy: "かんたん", medium: "ふつう", hard: "むずかしい", secret: "シークレット" };
  window.EGG_TOTAL = window.EGG_DATA.length; // 150
})();
