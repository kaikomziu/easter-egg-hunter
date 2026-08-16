/* ==========================================================================
   EGG HUNTER - コアロジック（進捗保存・実績パネル・トースト・共通トリガー）
   index.html / 404.html の両方から読み込まれる共通スクリプト。
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "eggHunterProgress_v1";
  var SETTINGS_KEY = "eggHunterSettings_v1";

  var state = loadProgress();
  var settings = loadSettings();

  function loadProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        parsed.found = parsed.found || {};
        parsed.playSeconds = parsed.playSeconds || 0;
        parsed.totalClicks = parsed.totalClicks || 0;
        parsed.hintUsed = !!parsed.hintUsed;
        parsed.firstVisitAt = parsed.firstVisitAt || new Date().toISOString();
        parsed.interacted = parsed.interacted || { dark: false, mute: false, sound: false };
        return parsed;
      }
    } catch (e) { /* ignore corrupt data */ }
    return {
      found: {}, playSeconds: 0, totalClicks: 0, hintUsed: false,
      firstVisitAt: new Date().toISOString(), interacted: { dark: false, mute: false, sound: false }
    };
  }

  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function loadSettings() {
    try {
      var raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { sound: true, onboarded: false };
  }

  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {}
  }

  function isFound(id) { return !!state.found[id]; }

  function foundCount(tier) {
    return window.EGG_DATA.filter(function (e) {
      return (!tier || e.tier === tier) && isFound(e.id);
    }).length;
  }

  function tierTotal(tier) {
    return window.EGG_DATA.filter(function (e) { return e.tier === tier; }).length;
  }

  function eggById(id) {
    for (var i = 0; i < window.EGG_DATA.length; i++) {
      if (window.EGG_DATA[i].id === id) return window.EGG_DATA[i];
    }
    return null;
  }

  function zukanTotal() { return window.EGG_DATA.filter(function (e) { return e.zukan; }).length; }
  function zukanFound() { return window.EGG_DATA.filter(function (e) { return e.zukan && isFound(e.id); }).length; }

  /* ---------------------- サウンド（外部ファイル不要） ---------------------- */
  var audioCtx = null;
  function playChime(fanfare) {
    if (!settings.sound) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      var notes = fanfare ? [523.25, 659.25, 783.99, 1046.5, 1318.5] : [880, 1174.66];
      var t0 = audioCtx.currentTime;
      notes.forEach(function (freq, i) {
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, t0 + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.15, t0 + i * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.09 + 0.3);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(t0 + i * 0.09);
        osc.stop(t0 + i * 0.09 + 0.32);
      });
    } catch (e) {}
  }

  /* ---------------------------- UI 構築 ---------------------------- */
  var root;
  function buildUI() {
    root = document.createElement("div");
    root.id = "egg-hunter-ui";
    root.innerHTML =
      '<button id="eh-fab" type="button" aria-label="コレクションを開く">' +
        '<span id="eh-fab-icon">🥚</span><span id="eh-fab-count">0/' + window.EGG_TOTAL + '</span>' +
      '</button>' +
      '<div id="eh-toast-wrap" aria-live="polite"></div>' +
      '<div id="eh-panel-overlay" class="eh-hidden">' +
        '<div id="eh-panel" role="dialog" aria-label="イースターエッグコレクション">' +
          '<div class="eh-panel-head">' +
            '<h2>🥚 エッグコレクション</h2>' +
            '<button id="eh-panel-close" type="button" aria-label="閉じる">✕</button>' +
          '</div>' +
          '<div class="eh-progress-row"><div class="eh-progress-bar"><div id="eh-progress-fill"></div></div><span id="eh-progress-text">0/0</span></div>' +
          '<div class="eh-tabs" id="eh-tabs"></div>' +
          '<div class="eh-list" id="eh-list"></div>' +
        '</div>' +
      '</div>' +
      '<div id="eh-konami-fab"><button id="eh-konami-toggle" type="button" aria-label="裏技パッド">🎮</button></div>' +
      '<div id="eh-konami-pad" class="eh-hidden">' +
        '<div class="eh-kpad-row"><span></span><button data-k="Up">↑</button><span></span></div>' +
        '<div class="eh-kpad-row"><button data-k="Left">←</button><button data-k="Down">↓</button><button data-k="Right">→</button></div>' +
        '<div class="eh-kpad-row"><button data-k="B" class="eh-kpad-ab">B</button><button data-k="A" class="eh-kpad-ab">A</button></div>' +
      '</div>' +
      '<div id="eh-console-overlay" class="eh-hidden">' +
        '<div id="eh-console">' +
          '<div class="eh-console-head">ミニコンソール <button id="eh-console-close" type="button">✕</button></div>' +
          '<div id="eh-console-log">help() で使い方を表示</div>' +
          '<input id="eh-console-input" type="text" autocomplete="off" autocapitalize="off" placeholder="ここにコマンドを入力…">' +
        '</div>' +
      '</div>';
    document.body.appendChild(root);

    document.getElementById("eh-fab").addEventListener("click", openPanel);
    document.getElementById("eh-panel-close").addEventListener("click", closePanel);
    document.getElementById("eh-panel-overlay").addEventListener("click", function (e) {
      if (e.target.id === "eh-panel-overlay") closePanel();
    });
    document.getElementById("eh-konami-toggle").addEventListener("click", function () {
      document.getElementById("eh-konami-pad").classList.toggle("eh-hidden");
    });
    root.querySelectorAll("#eh-konami-pad button[data-k]").forEach(function (btn) {
      btn.addEventListener("click", function () { feedKonami(btn.getAttribute("data-k")); });
    });
    document.getElementById("eh-console-close").addEventListener("click", closeConsole);
    document.getElementById("eh-console-input").addEventListener("keydown", function (e) {
      if (e.key === "Enter") runConsoleCommand(this.value);
    });

    renderTabs();
    updateFab();
  }

  var activeTier = "easy";
  function renderTabs() {
    var tabs = document.getElementById("eh-tabs");
    var tiers = ["easy", "medium", "hard", "secret"];
    tabs.innerHTML = tiers.map(function (t) {
      return '<button class="eh-tab' + (t === activeTier ? " eh-tab-active" : "") + '" data-tier="' + t + '">' +
        window.EGG_TIER_LABEL[t] + ' <small>' + foundCount(t) + '/' + tierTotal(t) + '</small></button>';
    }).join("");
    tabs.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { activeTier = b.getAttribute("data-tier"); renderTabs(); renderList(); });
    });
  }

  function renderList() {
    var list = document.getElementById("eh-list");
    var items = window.EGG_DATA.filter(function (e) { return e.tier === activeTier; });
    list.innerHTML = items.map(function (e) {
      var found = isFound(e.id);
      if (found) {
        var d = new Date(state.found[e.id]);
        return '<div class="eh-item eh-item-found">' +
          '<div class="eh-item-icon">🥚</div>' +
          '<div class="eh-item-body"><div class="eh-item-title">' + escapeHTML(e.title) + '</div>' +
          '<div class="eh-item-desc">' + escapeHTML(e.hint) + '</div>' +
          '<div class="eh-item-date">' + d.toLocaleString("ja-JP") + ' に発見</div></div></div>';
      }
      return '<div class="eh-item eh-item-locked" data-id="' + e.id + '">' +
        '<div class="eh-item-icon">❓</div>' +
        '<div class="eh-item-body"><div class="eh-item-title">？？？</div>' +
        '<button class="eh-hint-btn" type="button">ヒントを見る</button>' +
        '<div class="eh-item-hint eh-hidden">' + escapeHTML(e.hint) + '</div></div></div>';
    }).join("") || '<p class="eh-empty">このカテゴリのエッグはありません</p>';

    list.querySelectorAll(".eh-hint-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var hint = btn.nextElementSibling;
        hint.classList.toggle("eh-hidden");
        btn.textContent = hint.classList.contains("eh-hidden") ? "ヒントを見る" : "ヒントを隠す";
        if (!hint.classList.contains("eh-hidden") && !state.hintUsed) {
          state.hintUsed = true;
          saveProgress();
        }
      });
    });
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function updateFab() {
    var total = window.EGG_TOTAL;
    var got = foundCount();
    var countEl = document.getElementById("eh-fab-count");
    if (countEl) countEl.textContent = got + "/" + total;
    var fillEl = document.getElementById("eh-progress-fill");
    var textEl = document.getElementById("eh-progress-text");
    if (fillEl) fillEl.style.width = (total ? (got / total * 100) : 0) + "%";
    if (textEl) textEl.textContent = got + " / " + total + " 個 発見済み";
  }

  function openPanel() {
    document.getElementById("eh-panel-overlay").classList.remove("eh-hidden");
    renderTabs();
    renderList();
  }
  function closePanel() {
    document.getElementById("eh-panel-overlay").classList.add("eh-hidden");
  }

  /* ---------------------------- トースト ---------------------------- */
  function showToast(egg, legendary) {
    var wrap = document.getElementById("eh-toast-wrap");
    if (!wrap) return;
    var el = document.createElement("div");
    el.className = "eh-toast" + (legendary ? " eh-toast-legendary" : "");
    el.innerHTML = '<div class="eh-toast-icon">' + (legendary ? "🏆" : "🥚") + '</div>' +
      '<div><div class="eh-toast-title">新しいエッグを発見！</div>' +
      '<div class="eh-toast-name">' + escapeHTML(egg.title) + '</div></div>';
    wrap.appendChild(el);
    spawnConfetti();
    setTimeout(function () {
      el.classList.add("eh-toast-out");
      setTimeout(function () { el.remove(); }, 400);
    }, 3200);
  }

  function spawnConfetti() {
    var colors = ["#ffb703", "#fb8500", "#8ecae6", "#219ebc", "#ffafcc", "#a7c957"];
    for (var i = 0; i < 18; i++) {
      var p = document.createElement("div");
      p.className = "eh-confetti";
      p.style.left = (45 + Math.random() * 10) + "%";
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDelay = (Math.random() * 0.2) + "s";
      p.style.setProperty("--dx", (Math.random() * 200 - 100) + "px");
      document.body.appendChild(p);
      (function (el) { setTimeout(function () { el.remove(); }, 1600); })(p);
    }
  }

  /* ---------------------------- unlock 本体 ---------------------------- */
  var recentUnlocks = [];
  function unlock(id) {
    if (!id) return;
    if (isFound(id)) return;
    var egg = eggById(id);
    if (!egg) return;
    var now = Date.now();
    state.found[id] = new Date(now).toISOString();
    saveProgress();
    updateFab();
    if (!document.getElementById("eh-panel-overlay").classList.contains("eh-hidden")) {
      renderTabs(); renderList();
    }
    var isLegendary = id === "complete_all";
    playChime(isLegendary);
    showToast(egg, isLegendary);
    document.dispatchEvent(new CustomEvent("eh:unlock", { detail: { id: id } }));

    recentUnlocks.push(now);
    recentUnlocks = recentUnlocks.filter(function (t) { return now - t <= 60000; });
    if (recentUnlocks.length >= 5) unlock("combo_5in60s");

    if (now - new Date(state.firstVisitAt).getTime() >= 24 * 3600 * 1000) unlock("comeback_24h");

    checkMeta();
    if (isLegendary) setTimeout(showCompleteCelebration, 600);
  }
  window.unlockEgg = unlock; // 公開API（h06: console_command のヒント経路）

  function checkMeta() {
    if (!isFound("all_easy") && foundCount("easy") === tierTotal("easy")) unlock("all_easy");
    if (!isFound("all_medium") && foundCount("medium") === tierTotal("medium")) unlock("all_medium");
    if (!isFound("all_hard") && foundCount("hard") === tierTotal("hard")) unlock("all_hard");
    if (!isFound("meta_10eggs") && foundCount() >= 10) unlock("meta_10eggs");
    if (!isFound("all_zukan") && zukanFound() === zukanTotal()) unlock("all_zukan");
    if (!isFound("no_hint_20") && !state.hintUsed && foundCount() >= 20) unlock("no_hint_20");
    if (!isFound("total_click_500") && state.totalClicks >= 500) unlock("total_click_500");
    if (!isFound("konami_master") && isFound("konami_code") && isFound("shortcut_konami_reverse") && isFound("konami_on_404")) unlock("konami_master");
    if (!isFound("settings_explorer") && state.interacted.dark && state.interacted.mute && state.interacted.sound) unlock("settings_explorer");
    if (!isFound("night_visit_and_zukan") && isFound("night_visit") && isFound("all_zukan")) unlock("night_visit_and_zukan");
    if (!isFound("complete_all") && foundCount() === window.EGG_TOTAL - 1) unlock("complete_all");
  }

  function showCompleteCelebration() {
    var overlay = document.createElement("div");
    overlay.id = "eh-celebrate";
    overlay.innerHTML = '<div class="eh-celebrate-card">' +
      '<div class="eh-celebrate-emoji">🎉🥚🎉</div>' +
      '<h2>コンプリート！</h2>' +
      '<p>' + window.EGG_TOTAL + '個すべてのイースターエッグを見つけました。<br>あなたは正真正銘の「伝説のイースターエッグハンター」です。</p>' +
      '<button id="eh-celebrate-close" type="button">閉じる</button></div>';
    document.body.appendChild(overlay);
    document.getElementById("eh-celebrate-close").addEventListener("click", function () { overlay.remove(); });
  }

  /* ---------------------------- コナミコマンド ---------------------------- */
  var KONAMI_SEQ = ["Up", "Up", "Down", "Down", "Left", "Right", "Left", "Right", "B", "A"];
  var KONAMI_SEQ_REV = KONAMI_SEQ.slice().reverse();
  var konamiBuf = [];
  var KEY_MAP = { ArrowUp: "Up", ArrowDown: "Down", ArrowLeft: "Left", ArrowRight: "Right", a: "A", b: "B", A: "A", B: "B" };

  function feedKonami(token) {
    konamiBuf.push(token);
    if (konamiBuf.length > KONAMI_SEQ.length) konamiBuf.shift();
    if (konamiBuf.length === KONAMI_SEQ.length) {
      if (konamiBuf.every(function (v, i) { return v === KONAMI_SEQ[i]; })) {
        konamiBuf = [];
        if (document.body.getAttribute("data-page") === "404") unlock("konami_on_404");
        else unlock("konami_code");
      } else if (konamiBuf.every(function (v, i) { return v === KONAMI_SEQ_REV[i]; })) {
        konamiBuf = [];
        unlock("shortcut_konami_reverse");
      }
    }
  }

  /* ---------------------------- グローバルトリガー群 ---------------------------- */
  function initGlobalTriggers() {
    // コナミ（キーボード）
    document.addEventListener("keydown", function (e) {
      if (KEY_MAP[e.key]) feedKonami(KEY_MAP[e.key]);
      if (e.key === "`" || e.key === "~") { e.preventDefault(); openConsole(); }
    });

    // 隠しショートカット類
    var escStamps = [];
    var enterHoldTimer = null;
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "E" || e.key === "e")) {
        unlock("shortcut_ctrl_shift_e");
      }
      if (e.altKey && (e.key === "g" || e.key === "G")) {
        unlock("shortcut_alt_g");
      }
      if (e.key === "Escape") {
        var now = Date.now();
        escStamps.push(now);
        escStamps = escStamps.filter(function (t) { return now - t <= 3000; });
        if (escStamps.length >= 5) unlock("shortcut_escape_x5");
      }
      if (e.key === "Enter" && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") && !enterHoldTimer) {
        enterHoldTimer = setTimeout(function () { unlock("shortcut_enter_hold"); enterHoldTimer = null; }, 2000);
      }
    });
    document.addEventListener("keyup", function (e) {
      if (e.key === "Enter" && enterHoldTimer) { clearTimeout(enterHoldTimer); enterHoldTimer = null; }
    });

    // URLクエリパラメータ
    try {
      var qs = new URLSearchParams(location.search);
      if (qs.get("egg") === "open") unlock("query_param_egg");
    } catch (e) {}

    // 視差効果を減らす設定
    if (window.matchMedia) {
      var rmMQL = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (rmMQL.matches) unlock("reduced_motion_pref");
      addMQL(rmMQL, function (m) { if (m.matches) unlock("reduced_motion_pref"); });
    }

    // 早起き / 丑三つ時（アクセス時刻ベース）
    var accessHour = new Date().getHours();
    if (accessHour < 6) unlock("early_bird");
    if (accessHour === 2) unlock("night_owl_2to3");

    // コピー / ペースト
    document.addEventListener("copy", function () { unlock("copy_paragraph"); });
    document.addEventListener("paste", function () { unlock("paste_searchbox"); });

    // 印刷
    window.addEventListener("beforeprint", function () { unlock("print_page"); });

    // オンライン/オフライン
    window.addEventListener("offline", function () { unlock("go_offline"); });

    // タブ切り替え（visibilitychange）
    var hiddenCount = 0;
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") {
        hiddenCount++;
        if (hiddenCount >= 5) unlock("tab_switch_5");
      }
    });

    // OSダークモード
    if (window.matchMedia) {
      var dm = window.matchMedia("(prefers-color-scheme: dark)");
      if (dm.matches) unlock("os_darkmode");
      addMQL(dm, function (m) { if (m.matches) unlock("os_darkmode"); });

      // 画面の向き変化（回転寿司）→ PCはウィンドウのアスペクト比変更でもOK
      var landscapeMQL = window.matchMedia("(orientation: landscape)");
      var orientationSeen = landscapeMQL.matches;
      addMQL(landscapeMQL, function () { unlock("rotate_orientation"); });
    }

    // 深夜アクセス
    var hour = new Date().getHours();
    if (hour >= 0 && hour < 4) unlock("night_visit");

    // popstate（戻る/進む）
    var popCount = 0, popTimer = null;
    window.addEventListener("popstate", function () {
      popCount++;
      clearTimeout(popTimer);
      popTimer = setTimeout(function () { popCount = 0; }, 15000);
      if (popCount >= 2) unlock("back_forward_nav");
    });

    // アイドル30秒
    var idleTimer = null;
    function resetIdle() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(function () {
        if (document.visibilityState === "visible") unlock("idle_30s");
      }, 30000);
    }
    ["mousemove", "keydown", "touchstart", "scroll", "click"].forEach(function (ev) {
      document.addEventListener(ev, resetIdle, { passive: true });
    });
    resetIdle();

    // ズーム検出
    function checkZoom() {
      try {
        if (window.visualViewport && window.visualViewport.scale >= 2) { unlock("zoom_in_200"); return; }
        var ratio = Math.round((window.outerWidth / window.innerWidth) * 100);
        if (isFinite(ratio) && ratio >= 200 && ratio < 500) unlock("zoom_in_200");
      } catch (e) {}
    }
    window.addEventListener("resize", checkZoom);
    if (window.visualViewport) window.visualViewport.addEventListener("resize", checkZoom);

    // 314px 判定 + ウィンドウ幅表示更新
    function checkWidth314() {
      if (Math.abs(window.innerWidth - 314) <= 1) unlock("resize_pixel_314");
      var disp = document.getElementById("eh-width-display");
      if (disp) disp.textContent = window.innerWidth + "px";
    }
    window.addEventListener("resize", checkWidth314);
    checkWidth314();

    // 黄金比リサイズ
    function checkGoldenRatio() {
      if (window.innerHeight < 100) return;
      var ratio = window.innerWidth / window.innerHeight;
      if (ratio >= 1.55 && ratio <= 1.68 && window.innerWidth >= 400) unlock("golden_ratio_resize");
    }
    window.addEventListener("resize", checkGoldenRatio);
    checkGoldenRatio();

    // 高速連打（1秒間に10回）+ 合計クリック数
    var clickStamps = [];
    var totalClickSaveTimer = null;
    document.addEventListener("click", function () {
      var now = Date.now();
      clickStamps.push(now);
      clickStamps = clickStamps.filter(function (t) { return now - t <= 1000; });
      if (clickStamps.length >= 10) unlock("speed_click_10in1s");

      state.totalClicks++;
      clearTimeout(totalClickSaveTimer);
      totalClickSaveTimer = setTimeout(saveProgress, 400);
      if (state.totalClicks >= 500) unlock("total_click_500");
    });

    // 余白ダブルクリック
    document.addEventListener("dblclick", function (e) {
      var t = e.target;
      if (t === document.body || (t.classList && t.classList.contains("eh-empty-space"))) {
        unlock("empty_space_dblclick");
      }
    });

    // すべて選択
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "A")) {
        unlock("select_all_secret");
      }
    });
    document.addEventListener("selectionchange", function () {
      var sel = document.getSelection();
      if (sel && sel.toString().length > 400) unlock("select_all_secret");
    });

    // 右クリック / 長押しメニュー（フッター付近）
    document.addEventListener("contextmenu", function (e) {
      var footer = document.querySelector("footer");
      if (footer && footer.contains(e.target)) unlock("contextmenu_footer");
    });

    // typeでたまご入力（入力欄）+ 汎用ワード入力 + 回文チェック + スライダー厳密値
    document.addEventListener("input", function (e) {
      var t = e.target;
      if (!t || (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA") || t.id === "eh-console-input") return;
      var val = String(t.value);
      if (val.indexOf("たまご") !== -1) unlock("type_tamago");

      var wordEgg = t.getAttribute("data-word-egg");
      var word = t.getAttribute("data-word");
      if (wordEgg && word && val.indexOf(word) !== -1) unlock(wordEgg);

      var palEgg = t.getAttribute("data-palindrome-egg");
      if (palEgg) {
        var s = val.trim();
        var chars = Array.from(s);
        if (chars.length >= 3 && chars.join("") === chars.slice().reverse().join("")) unlock(palEgg);
      }

      var sliderEgg = t.getAttribute("data-slider-egg");
      var sliderVal = t.getAttribute("data-slider-value");
      if (sliderEgg && sliderVal && String(t.value) === sliderVal) unlock(sliderEgg);
    });

    // 汎用 data-vibrate-btn / data-share-btn / data-geo-btn
    document.addEventListener("click", function (e) {
      var vb = e.target.closest && e.target.closest("[data-vibrate-btn]");
      if (vb) {
        if (navigator.vibrate) { try { navigator.vibrate(200); } catch (er) {} }
        unlock("vibrate_button");
      }
      var sb = e.target.closest && e.target.closest("[data-share-btn]");
      if (sb) {
        var url = location.href.split("#")[0];
        if (navigator.share) {
          navigator.share({ title: document.title, url: url }).catch(function () {});
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(url).catch(function () {});
          flashMessage(sb, "リンクをコピーしました！");
        }
        unlock("share_button");
      }
      var gb = e.target.closest && e.target.closest("[data-geo-btn]");
      if (gb) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function () { flashMessage(gb, "位置情報を取得しました"); unlock("geolocation_ask"); },
            function () { flashMessage(gb, "拒否されました（それもOK）"); unlock("geolocation_ask"); },
            { timeout: 8000 }
          );
        } else {
          unlock("geolocation_ask");
        }
      }
      var nb = e.target.closest && e.target.closest("[data-notify-btn]");
      if (nb) {
        if (window.Notification && Notification.requestPermission) {
          Promise.resolve(Notification.requestPermission()).then(function (res) {
            flashMessage(nb, res === "granted" ? "許可されました" : "選択されました");
            unlock("notify_permission");
          }).catch(function () { unlock("notify_permission"); });
        } else {
          flashMessage(nb, "このブラウザは非対応ですが記録しました");
          unlock("notify_permission");
        }
      }
      var wb = e.target.closest && e.target.closest("[data-webgl-btn]");
      if (wb) {
        var supported = false;
        try {
          var c = document.createElement("canvas");
          supported = !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
        } catch (er) {}
        flashMessage(wb, supported ? "WebGL対応です🎨" : "WebGL非対応でした");
        unlock("webgl_check");
      }
      var jb = e.target.closest && e.target.closest("[data-justtime-btn]");
      if (jb) {
        var s = new Date().getSeconds();
        flashMessage(jb, "現在" + s + "秒");
        if (s === 0) unlock("just_time");
      }
    });

    // 汎用「正解入力フォーム」（data-answer-form="egg_id" data-answer="こたえ" [data-answer-msg-id]）
    document.addEventListener("submit", function (e) {
      var form = e.target.closest && e.target.closest("[data-answer-form]");
      if (!form) return;
      e.preventDefault();
      var eggId = form.getAttribute("data-answer-form");
      var answer = (form.getAttribute("data-answer") || "").trim();
      var input = form.querySelector("input, textarea");
      var val = input ? String(input.value).trim() : "";
      var msgEl = document.getElementById(form.getAttribute("data-answer-msg-id") || "");
      var correct = val !== "" && val.toUpperCase() === answer.toUpperCase();
      if (correct) {
        unlock(eggId);
        if (msgEl) msgEl.textContent = "正解！";
      } else if (msgEl) {
        msgEl.textContent = "うーん、違うみたい。";
      }
    });

    // 卵アイコン長押し → ミニコンソール（モバイル代替）
    document.addEventListener("DOMContentLoaded", bindLongPressConsole);
    bindLongPressConsole();

    // プレイ時間の積算
    setInterval(function () {
      if (document.visibilityState === "visible") {
        state.playSeconds += 5;
        saveProgress();
        if (state.playSeconds >= 1000) unlock("play_1000sec");
      }
    }, 5000);

    // デバイスモーション（シェイク） - スノードーム用。iOS は権限リクエストが必要。
    var lastShake = 0, shakeHits = 0;
    function onMotion(ev) {
      var a = ev.accelerationIncludingGravity || ev.acceleration;
      if (!a) return;
      var mag = Math.abs(a.x || 0) + Math.abs(a.y || 0) + Math.abs(a.z || 0);
      var now = Date.now();
      if (mag > 28 && now - lastShake > 300) {
        lastShake = now;
        shakeHits++;
        if (shakeHits >= 2) unlock("shake_snow_globe");
      }
    }
    window.__ehEnableMotion = function () {
      if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission().then(function (res) {
          if (res === "granted") window.addEventListener("devicemotion", onMotion);
        }).catch(function () {});
      } else if (typeof DeviceMotionEvent !== "undefined") {
        window.addEventListener("devicemotion", onMotion);
      }
    };
    window.__ehEnableMotion();
  }

  function addMQL(mql, handler) {
    if (mql.addEventListener) mql.addEventListener("change", handler);
    else if (mql.addListener) mql.addListener(handler); // Safari旧
  }

  function flashMessage(nearEl, text) {
    var msg = document.createElement("div");
    msg.className = "eh-flash-msg";
    msg.textContent = text;
    document.body.appendChild(msg);
    var r = nearEl.getBoundingClientRect();
    msg.style.left = Math.max(8, r.left) + "px";
    msg.style.top = Math.max(8, r.top - 36) + "px";
    setTimeout(function () { msg.remove(); }, 2200);
  }

  /* ---------------------------- ミニコンソール ---------------------------- */
  function bindLongPressConsole() {
    var targets = document.querySelectorAll("[data-console-trigger]");
    targets.forEach(function (el) {
      var timer = null;
      var start = function () { timer = setTimeout(openConsole, 1200); };
      var cancel = function () { clearTimeout(timer); };
      el.addEventListener("touchstart", start, { passive: true });
      el.addEventListener("touchend", cancel);
      el.addEventListener("touchmove", cancel);
      el.addEventListener("mousedown", start);
      el.addEventListener("mouseup", cancel);
      el.addEventListener("mouseleave", cancel);
    });
  }
  function openConsole() {
    document.getElementById("eh-console-overlay").classList.remove("eh-hidden");
    document.getElementById("eh-console-input").focus();
  }
  function closeConsole() {
    document.getElementById("eh-console-overlay").classList.add("eh-hidden");
  }
  function runConsoleCommand(raw) {
    var cmd = (raw || "").trim();
    var log = document.getElementById("eh-console-log");
    var input = document.getElementById("eh-console-input");
    var line = document.createElement("div");
    line.textContent = "> " + cmd;
    log.appendChild(line);
    var out = document.createElement("div");
    if (cmd === "tamago()") {
      unlock("console_command");
      out.textContent = "🥚 見つかった！コンソールコマンドのエッグをゲット。";
    } else if (cmd === "himitsu()") {
      unlock("console_himitsu");
      out.textContent = "🔓 もう一つのコマンドも見つかった。";
    } else if (cmd === "help()") {
      out.textContent = "使えるコマンド: tamago() / himitsu()";
    } else {
      out.textContent = "そのコマンドは存在しません。help() を試してみて。";
    }
    log.appendChild(out);
    log.scrollTop = log.scrollHeight;
    input.value = "";
  }

  /* ---------------------------- 長押し / 右クリック 汎用ユーティリティ ---------------------------- */
  window.ehBindLongPress = function (el, cb, ms) {
    var timer = null, fired = false;
    var start = function () { fired = false; timer = setTimeout(function () { fired = true; cb(); }, ms || 800); };
    var cancel = function () { clearTimeout(timer); };
    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchmove", cancel);
    el.addEventListener("mousedown", start);
    el.addEventListener("mouseup", cancel);
    el.addEventListener("mouseleave", cancel);
    el.addEventListener("contextmenu", function (e) { e.preventDefault(); if (!fired) cb(); });
  };

  window.ehBindClickCounter = function (el, times, cb) {
    var n = 0, lastT = 0;
    el.addEventListener("click", function () {
      var now = Date.now();
      if (now - lastT > 4000) n = 0;
      lastT = now;
      n++;
      if (n >= times) { n = 0; cb(); }
    });
  };

  window.ehBindHoverHold = function (el, ms, cb) {
    var timer = null;
    var start = function () { timer = setTimeout(cb, ms); };
    var cancel = function () { clearTimeout(timer); };
    el.addEventListener("mouseenter", start);
    el.addEventListener("mouseleave", cancel);
    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchend", cancel);
  };

  // 全ページ駆け足ツアー（60秒以内にVALID_ROUTES相当を全部訪問）
  var routeVisits = [];
  var TOUR_ROUTES = ["home", "about", "gallery", "blog", "contact", "settings", "zukan", "minigame"];
  function trackVisit(route) {
    var now = Date.now();
    routeVisits.push({ route: route, time: now });
    routeVisits = routeVisits.filter(function (v) { return now - v.time <= 60000; });
    var visited = {};
    routeVisits.forEach(function (v) { visited[v.route] = true; });
    if (TOUR_ROUTES.every(function (r) { return visited[r]; })) unlock("tour_all_pages");
  }

  window.EggHunter = {
    unlock: unlock,
    isFound: isFound,
    foundCount: foundCount,
    tierTotal: tierTotal,
    zukanTotal: zukanTotal,
    zukanFound: zukanFound,
    trackVisit: trackVisit,
    markInteracted: function (key) {
      if (state.interacted && !state.interacted[key]) {
        state.interacted[key] = true;
        saveProgress();
        checkMeta();
      }
    },
    getSettings: function () { return settings; },
    setSetting: function (k, v) { settings[k] = v; saveSettings(); },
    resetProgress: function () {
      state = {
        found: {}, playSeconds: 0, totalClicks: 0, hintUsed: false,
        firstVisitAt: new Date().toISOString(), interacted: { dark: false, mute: false, sound: false }
      };
      saveProgress();
      updateFab();
      renderTabs(); renderList();
    },
    openPanel: openPanel,
    init: function () {
      if (!document.getElementById("egg-hunter-ui")) buildUI();
      saveProgress(); // firstVisitAt を確実に永続化
      initGlobalTriggers();
      maybeShowOnboarding();
    }
  };

  function maybeShowOnboarding() {
    if (settings.onboarded) return;
    var overlay = document.createElement("div");
    overlay.id = "eh-onboard";
    overlay.innerHTML = '<div class="eh-onboard-card">' +
      '<div class="eh-onboard-emoji">🥚✨</div>' +
      '<h2>ようこそ、エッグハント へ</h2>' +
      '<p>このサイトのあちこちに、<strong>全' + window.EGG_TOTAL + '個</strong>のイースターエッグ（隠し要素）が隠れています。<br>' +
      'クリック・タップ・スクロール・待つ・組み合わせる…あらゆる方法で見つけ出そう。<br>' +
      '進捗は自動でこの端末に保存されます。右下の🥚ボタンからコレクションをいつでも確認できます。</p>' +
      '<button id="eh-onboard-start" type="button">はじめる</button></div>';
    document.body.appendChild(overlay);
    document.getElementById("eh-onboard-start").addEventListener("click", function () {
      settings.onboarded = true; saveSettings();
      overlay.remove();
    });
  }
})();
