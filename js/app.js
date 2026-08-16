/* ==========================================================================
   EGG HUNTER - app.js（index.html 専用：ルーティング & ページ固有のトリガー）
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    window.EggHunter.init();
    initRouter();
    initHomeEggs();
    initGalleryEggs();
    initBlogEggs();
    initContactEggs();
    initSettingsEggs();
    initFooterHeaderEggs();
    initCookieBanner();
    initZukanEggs();
    initMiniGame();
  });

  /* ---------------------------- ルーティング ---------------------------- */
  var VALID_ROUTES = ["home", "about", "gallery", "blog", "contact", "settings", "himitsu", "zukan", "zukan-ura", "minigame"];
  function initRouter() {
    window.addEventListener("hashchange", render);
    render();

    document.getElementById("nav-toggle").addEventListener("click", function () {
      document.getElementById("site-nav").classList.toggle("mobile-open");
    });
    document.querySelectorAll("nav.site-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.getElementById("site-nav").classList.remove("mobile-open");
      });
    });

    function render() {
      var route = (location.hash || "#home").replace("#", "");
      if (VALID_ROUTES.indexOf(route) === -1) route = "home";
      document.querySelectorAll(".page-section").forEach(function (s) {
        s.classList.toggle("active", s.getAttribute("data-route") === route);
      });
      document.querySelectorAll("nav.site-nav a").forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("data-route") === route);
      });
      window.scrollTo({ top: 0 });
      if (route === "himitsu") window.EggHunter.unlock("hash_himitsu");
      if (route === "zukan-ura") window.EggHunter.unlock("hash_zukan_ura");
      window.EggHunter.trackVisit(route);
    }
  }

  /* ---------------------------- ホーム ---------------------------- */
  function initHomeEggs() {
    var logo = document.getElementById("site-logo");
    window.ehBindClickCounter(logo, 5, function () { window.EggHunter.unlock("logo_click5"); });

    var hero = document.getElementById("hero-img");
    window.ehBindLongPress(hero, function () { window.EggHunter.unlock("hero_longpress"); }, 1000);

    var icons = ["🌱", "🌿", "🌷", "🌻", "🍀", "🌼", "🌾", "🥚"];
    var iconEl = document.getElementById("icon-cycler");
    var iconClicks = 0;
    iconEl.addEventListener("click", function () {
      iconClicks++;
      iconEl.textContent = icons[iconClicks % icons.length];
      if (iconClicks >= 10) window.EggHunter.unlock("icon_click10");
    });

    var icon2 = document.getElementById("icon-cycler2");
    if (icon2) window.ehBindClickCounter(icon2, 5, function () { window.EggHunter.unlock("home_icon_click5_v2"); });

    var likeBtn = document.getElementById("like-btn");
    var likeCountEl = document.getElementById("like-count");
    var likeCount = 0;
    likeBtn.addEventListener("click", function () {
      likeCount++;
      likeCountEl.textContent = likeCount;
      likeBtn.classList.add("liked");
      if (likeCount >= 20) window.EggHunter.unlock("like_button_20");
    });

    var shakeBtn = document.getElementById("shake-btn");
    var globe = document.getElementById("snow-globe");
    var shakeClicks = [];
    shakeBtn.addEventListener("click", function () {
      globe.classList.remove("shaking");
      void globe.offsetWidth;
      globe.classList.add("shaking");
      var now = Date.now();
      shakeClicks.push(now);
      shakeClicks = shakeClicks.filter(function (t) { return now - t <= 2000; });
      if (shakeClicks.length >= 5) window.EggHunter.unlock("shake_snow_globe");
    });

    // 一番下までスクロール＋さらにスクロール（overscroll的トリガー）
    var overTriggered = false;
    window.addEventListener("scroll", function () {
      if (overTriggered) return;
      var doc = document.documentElement;
      var atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
      if (atBottom) {
        overTriggered = true;
        window.EggHunter.unlock("scroll_bottom_over");
      }
    }, { passive: true });
  }

  /* ---------------------------- About ナビhover ---------------------------- */
  function initFooterHeaderEggs() {
    var aboutLink = document.querySelector('nav.site-nav a[data-route="about"]');
    if (aboutLink) window.ehBindHoverHold(aboutLink, 3000, function () { window.EggHunter.unlock("nav_hover_hold"); });

    var bell = document.getElementById("header-bell");
    window.ehBindClickCounter(bell, 7, function () { window.EggHunter.unlock("header_icon_click7"); });

    var yearEl = document.getElementById("footer-year");
    yearEl.textContent = new Date().getFullYear();
    window.ehBindClickCounter(yearEl, 7, function () { window.EggHunter.unlock("footer_year_click7"); });

    var creditEl = document.getElementById("footer-credit");
    if (creditEl) window.ehBindClickCounter(creditEl, 5, function () { window.EggHunter.unlock("footer_credit_click5"); });

    var hiddenLink = document.getElementById("about-hidden-link");
    if (hiddenLink) {
      hiddenLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.EggHunter.unlock("hidden_link_about");
      });
    }
  }

  /* ---------------------------- ギャラリー ---------------------------- */
  function initGalleryEggs() {
    var broken = document.getElementById("broken-img");
    if (broken) broken.addEventListener("click", function () { window.EggHunter.unlock("broken_img_click"); });

    document.querySelectorAll(".gallery-item[data-dbl]").forEach(function (el) {
      el.addEventListener("dblclick", function () { window.EggHunter.unlock("gallery_dblclick"); });
    });

    var longpressItem = document.getElementById("gallery-item-longpress");
    if (longpressItem) window.ehBindLongPress(longpressItem, function () { window.EggHunter.unlock("gallery_longpress2"); }, 1000);

    var rabbit = document.getElementById("dnd-rabbit");
    var basket = document.getElementById("dnd-basket");
    if (!rabbit || !basket) return;

    // デスクトップ: ネイティブ Drag&Drop
    rabbit.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", "rabbit");
    });
    basket.addEventListener("dragover", function (e) { e.preventDefault(); basket.classList.add("drag-over"); });
    basket.addEventListener("dragleave", function () { basket.classList.remove("drag-over"); });
    basket.addEventListener("drop", function (e) {
      e.preventDefault();
      basket.classList.remove("drag-over");
      window.EggHunter.unlock("drag_egg_basket");
    });

    // モバイル: タッチドラッグ
    var dragging = false, offsetX = 0, offsetY = 0, originalPos = null;
    rabbit.addEventListener("touchstart", function (e) {
      dragging = true;
      var t = e.touches[0];
      var r = rabbit.getBoundingClientRect();
      offsetX = t.clientX - r.left; offsetY = t.clientY - r.top;
      originalPos = { position: rabbit.style.position, left: rabbit.style.left, top: rabbit.style.top, zIndex: rabbit.style.zIndex };
    }, { passive: true });
    rabbit.addEventListener("touchmove", function (e) {
      if (!dragging) return;
      var t = e.touches[0];
      rabbit.style.position = "fixed";
      rabbit.style.zIndex = "999";
      rabbit.style.left = (t.clientX - offsetX) + "px";
      rabbit.style.top = (t.clientY - offsetY) + "px";
      var br = basket.getBoundingClientRect();
      var over = t.clientX >= br.left && t.clientX <= br.right && t.clientY >= br.top && t.clientY <= br.bottom;
      basket.classList.toggle("drag-over", over);
    }, { passive: true });
    rabbit.addEventListener("touchend", function (e) {
      if (!dragging) return;
      dragging = false;
      basket.classList.remove("drag-over");
      var t = e.changedTouches[0];
      var br = basket.getBoundingClientRect();
      var over = t.clientX >= br.left && t.clientX <= br.right && t.clientY >= br.top && t.clientY <= br.bottom;
      rabbit.style.position = originalPos.position;
      rabbit.style.left = originalPos.left;
      rabbit.style.top = originalPos.top;
      rabbit.style.zIndex = originalPos.zIndex;
      if (over) window.EggHunter.unlock("drag_egg_basket");
    });
  }

  /* ---------------------------- ブログ ---------------------------- */
  function initBlogEggs() {
    var form = document.getElementById("blog-password-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = document.getElementById("blog-password-input").value.trim();
      var msg = document.getElementById("blog-password-msg");
      if (val === "うさぎ") {
        window.EggHunter.unlock("blog_acrostic");
        msg.textContent = "正解！合言葉は「うさぎ」でした。";
      } else {
        msg.textContent = "うーん、違うみたい。記事タイトルの頭文字をよく見て。";
      }
    });
  }

  /* ---------------------------- お問い合わせ ---------------------------- */
  function initContactEggs() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("contact-name").value.trim();
      var msg = document.getElementById("contact-msg");
      msg.textContent = "送信しました（ふりです）。ありがとうございました！";
      if (name === "たまご") window.EggHunter.unlock("contact_form_egg");
    });
  }

  /* ---------------------------- 設定 ---------------------------- */
  function initSettingsEggs() {
    var settingsTitle = document.getElementById("settings-title");
    if (settingsTitle) window.ehBindClickCounter(settingsTitle, 5, function () { window.EggHunter.unlock("settings_label_click5"); });

    var quizForm = document.getElementById("quiz-total-form");
    if (quizForm) quizForm.setAttribute("data-answer", String(window.EGG_TOTAL));

    var darkToggle = document.getElementById("darkmode-toggle");
    var savedTheme = localStorage.getItem("eggHunterTheme");
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      darkToggle.checked = true;
    }
    var toggleStamps = [];
    darkToggle.addEventListener("change", function () {
      var dark = darkToggle.checked;
      document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
      localStorage.setItem("eggHunterTheme", dark ? "dark" : "light");
      window.EggHunter.markInteracted("dark");
      var now = Date.now();
      toggleStamps.push(now);
      toggleStamps = toggleStamps.filter(function (t) { return now - t <= 3000; });
      if (toggleStamps.length >= 3) window.EggHunter.unlock("darkmode_toggle3");
    });

    var muteToggle = document.getElementById("mute-toggle");
    var volumeSlider = document.getElementById("volume-slider");
    function checkMuteVolume() {
      if (muteToggle.checked && Number(volumeSlider.value) === 100) {
        window.EggHunter.unlock("mute_maxvolume");
      }
    }
    muteToggle.addEventListener("change", function () { window.EggHunter.markInteracted("mute"); checkMuteVolume(); });
    volumeSlider.addEventListener("input", checkMuteVolume);

    var soundToggle = document.getElementById("sound-toggle");
    soundToggle.checked = window.EggHunter.getSettings().sound !== false;
    soundToggle.addEventListener("change", function () {
      window.EggHunter.setSetting("sound", soundToggle.checked);
      window.EggHunter.markInteracted("sound");
    });

    var codeForm = document.getElementById("secret-code-form");
    codeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = document.getElementById("secret-code-input").value.trim().toUpperCase();
      var msg = document.getElementById("secret-code-msg");
      if (val === "SU-42") {
        window.EggHunter.unlock("secret_code_input");
        msg.textContent = "正解！コードが一致しました。";
      } else {
        msg.textContent = "コードが違うようです。ページのソースを確認してみて。";
      }
    });

    var widthSlider = document.getElementById("width-sim-slider");
    widthSlider.addEventListener("input", function () {
      if (Number(widthSlider.value) === 314) window.EggHunter.unlock("resize_pixel_314");
    });

    document.getElementById("reset-progress-btn").addEventListener("click", function () {
      if (confirm("見つけたエッグの記録をすべて消去します。よろしいですか？")) {
        window.EggHunter.resetProgress();
      }
    });
  }

  /* ---------------------------- Cookieバナー ---------------------------- */
  function initCookieBanner() {
    if (localStorage.getItem("eggHunterCookieDismissed")) return;
    var banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.innerHTML = '<p>🍪 このサイトはCookieのようなものを使っている……かもしれません。</p>' +
      '<button id="cookie-accept" type="button">同意する</button>' +
      '<button id="cookie-close" type="button" aria-label="閉じる">✕</button>';
    document.body.appendChild(banner);
    var closeCount = 0;
    document.getElementById("cookie-accept").addEventListener("click", dismiss);
    document.getElementById("cookie-close").addEventListener("click", function () {
      closeCount++;
      if (closeCount >= 3) {
        window.EggHunter.unlock("cookie_banner_close3");
        dismiss();
      } else {
        banner.style.transform = "translateX(8px)";
        setTimeout(function () { banner.style.transform = ""; }, 150);
      }
    });
    function dismiss() {
      localStorage.setItem("eggHunterCookieDismissed", "1");
      banner.remove();
    }
  }

  /* ---------------------------- 図鑑 ---------------------------- */
  function initZukanEggs() {
    var groups = { easy: document.getElementById("zukan-easy"), medium: document.getElementById("zukan-medium"), hard: document.getElementById("zukan-hard") };
    if (!groups.easy) return;
    var items = window.EGG_DATA.filter(function (e) { return e.zukan; });

    items.forEach(function (egg) {
      var target = groups[egg.tier];
      if (!target) return;
      var tile = document.createElement("button");
      tile.type = "button";
      tile.className = "zukan-tile" + (window.EggHunter.isFound(egg.id) ? " collected" : "");
      tile.setAttribute("data-id", egg.id);
      tile.innerHTML = '<span>' + egg.icon + '</span><span class="zukan-tile-title">' +
        (window.EggHunter.isFound(egg.id) ? egg.title : "？？？") + '</span>';
      target.appendChild(tile);

      var need = egg.need || { type: "click", count: 1 };
      var cb = function () { window.EggHunter.unlock(egg.id); };
      if (need.type === "click") {
        window.ehBindClickCounter(tile, need.count || 1, cb);
      } else if (need.type === "dblclick") {
        tile.addEventListener("dblclick", cb);
      } else if (need.type === "longpress") {
        window.ehBindLongPress(tile, cb, need.ms || 1000);
      } else if (need.type === "hover") {
        window.ehBindHoverHold(tile, need.ms || 2000, cb);
      }
    });

    document.addEventListener("eh:unlock", function (e) {
      var tile = document.querySelector('.zukan-tile[data-id="' + e.detail.id + '"]');
      if (tile) {
        tile.classList.add("collected");
        var egg = items.find(function (x) { return x.id === e.detail.id; });
        if (egg) tile.querySelector(".zukan-tile-title").textContent = egg.title;
      }
    });
  }

  /* ---------------------------- ミニゲーム ---------------------------- */
  function initMiniGame() {
    // 反射神経ゲーム
    var startBtn = document.getElementById("reaction-start");
    var arena = document.getElementById("reaction-arena");
    var target = document.getElementById("reaction-target");
    var status = document.getElementById("reaction-status");
    if (startBtn && arena && target) {
      startBtn.addEventListener("click", function () {
        startBtn.disabled = true;
        var round = 0, hits = 0, roundTimer = null, hideTimer = null;
        status.textContent = "ラウンド開始…";
        nextRound();

        function nextRound() {
          round++;
          if (round > 5) {
            finish();
            return;
          }
          status.textContent = "ラウンド " + round + " / 5";
          var delay = 500 + Math.random() * 1500;
          roundTimer = setTimeout(showTarget, delay);
        }
        function showTarget() {
          var w = arena.clientWidth - 60, h = arena.clientHeight - 60;
          target.style.left = Math.max(0, Math.random() * w) + "px";
          target.style.top = Math.max(0, Math.random() * h) + "px";
          target.classList.remove("eh-hidden");
          var clicked = false;
          var onHit = function () {
            if (clicked) return;
            clicked = true;
            hits++;
            clearTimeout(hideTimer);
            target.classList.add("eh-hidden");
            target.removeEventListener("click", onHit);
            nextRound();
          };
          target.addEventListener("click", onHit);
          hideTimer = setTimeout(function () {
            if (clicked) return;
            target.classList.add("eh-hidden");
            target.removeEventListener("click", onHit);
            nextRound();
          }, 1200);
        }
        function finish() {
          startBtn.disabled = false;
          status.textContent = hits + " / 5 ヒット！";
          if (hits >= 1) window.EggHunter.unlock("minigame_clear");
          if (hits === 5) window.EggHunter.unlock("minigame_perfect");
        }
      });
    }

    // 百打の的
    var click100 = document.getElementById("click100-target");
    var click100Count = document.getElementById("click100-count");
    if (click100 && click100Count) {
      var n = Number(localStorage.getItem("eggHunterClick100") || "0");
      click100Count.textContent = n;
      click100.addEventListener("click", function () {
        n++;
        click100Count.textContent = n;
        localStorage.setItem("eggHunterClick100", String(n));
        if (n >= 100) window.EggHunter.unlock("click_100_times");
      });
    }

    // 静止チャレンジ
    var stillTarget = document.getElementById("stillness-target");
    var stillStatus = document.getElementById("stillness-status");
    if (stillTarget) {
      var stillTimer = null, startPos = null;
      var THRESHOLD = 8, DURATION = 15000;

      function stillStart(x, y) {
        startPos = { x: x, y: y };
        stillStatus.textContent = "0 / 15 秒";
        var startedAt = Date.now();
        clearInterval(stillTimer);
        stillTimer = setInterval(function () {
          var elapsed = Date.now() - startedAt;
          stillStatus.textContent = Math.min(15, Math.floor(elapsed / 1000)) + " / 15 秒";
          if (elapsed >= DURATION) {
            clearInterval(stillTimer);
            window.EggHunter.unlock("stillness_challenge");
            stillStatus.textContent = "クリア！🎉";
          }
        }, 200);
      }
      function stillCheck(x, y) {
        if (!startPos) return;
        var dx = x - startPos.x, dy = y - startPos.y;
        if (Math.sqrt(dx * dx + dy * dy) > THRESHOLD) {
          clearInterval(stillTimer);
          startPos = null;
          stillStatus.textContent = "動いてしまった…もう一度";
        }
      }
      function stillEnd() {
        clearInterval(stillTimer);
        startPos = null;
      }

      stillTarget.addEventListener("mouseenter", function (e) { stillStart(e.clientX, e.clientY); });
      stillTarget.addEventListener("mousemove", function (e) { stillCheck(e.clientX, e.clientY); });
      stillTarget.addEventListener("mouseleave", stillEnd);
      stillTarget.addEventListener("touchstart", function (e) {
        var t = e.touches[0]; stillStart(t.clientX, t.clientY);
      }, { passive: true });
      stillTarget.addEventListener("touchmove", function (e) {
        var t = e.touches[0]; stillCheck(t.clientX, t.clientY);
      }, { passive: true });
      stillTarget.addEventListener("touchend", stillEnd);
    }
  }
})();
