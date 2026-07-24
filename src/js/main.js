(function () {
  var gridView = document.getElementById("grid-view");
  var listView = document.getElementById("list-view");
  var btnGrid = document.getElementById("toggle-grid");
  var btnList = document.getElementById("toggle-list");

  if (gridView && listView && btnGrid && btnList) {
    var setView = function (view) {
      var isList = view === "list";
      gridView.hidden = isList;
      listView.hidden = !isList;
      btnGrid.setAttribute("aria-pressed", String(!isList));
      btnList.setAttribute("aria-pressed", String(isList));
      try {
        localStorage.setItem("imdv-view", view);
      } catch (e) {}
    };

    btnGrid.addEventListener("click", function () {
      setView("grid");
    });
    btnList.addEventListener("click", function () {
      setView("list");
    });

    var saved;
    try {
      saved = localStorage.getItem("imdv-view");
    } catch (e) {}
    if (saved === "list") setView("list");
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (document.getElementById("lightbox") && !document.getElementById("lightbox").hidden) return;
    var prev = document.querySelector(".pager-prev");
    var next = document.querySelector(".pager-next");
    if (e.key === "ArrowLeft" && prev) window.location.href = prev.href;
    if (e.key === "ArrowRight" && next) window.location.href = next.href;
  });

  // ── image fade-in on load ──────────────────────────────
  var fadeImages = document.querySelectorAll(".gallery-image, .grid-image");
  fadeImages.forEach(function (img) {
    if (img.complete) {
      img.classList.add("is-loaded");
    } else {
      img.addEventListener("load", function () {
        img.classList.add("is-loaded");
      });
    }
  });

  // ── masonry scroll reveal ──────────────────────────────
  var masonryItems = document.querySelectorAll(".masonry-item");
  if (masonryItems.length && "IntersectionObserver" in window) {
    var n = 0;
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          el.style.transitionDelay = (n % 6) * 65 + "ms";
          n++;
          el.classList.add("is-visible");
          revealObserver.unobserve(el);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -24px 0px" }
    );
    masonryItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    masonryItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // ── lightbox ────────────────────────────────────────────
  var masonry = document.querySelector(".work-masonry");
  var lightbox = document.getElementById("lightbox");
  if (masonry && lightbox) {
    var tiles = Array.prototype.slice.call(masonry.querySelectorAll(".image-tile"));
    var sources = tiles.map(function (tile) {
      return { src: tile.querySelector("img").src };
    });
    var total = sources.length;
    var activeIndex = null;
    var lightboxImage = document.getElementById("lightbox-image");
    var lightboxCounter = document.getElementById("lightbox-counter");
    var closeBtn = document.getElementById("lightbox-close");
    var prevBtn = document.getElementById("lightbox-prev");
    var nextBtn = document.getElementById("lightbox-next");
    var scrollY = 0;

    var pad = function (n) {
      return String(n).padStart(2, "0");
    };

    var render = function () {
      var item = sources[activeIndex];
      lightboxImage.src = item.src;
      lightboxCounter.textContent = pad(activeIndex + 1) + " / " + pad(total);
    };

    var open = function (index) {
      activeIndex = index;
      render();
      lightbox.hidden = false;
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = "-" + scrollY + "px";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    };

    var close = function () {
      lightbox.hidden = true;
      activeIndex = null;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };

    var showNext = function () {
      if (activeIndex === null) return;
      activeIndex = (activeIndex + 1) % total;
      render();
    };

    var showPrev = function () {
      if (activeIndex === null) return;
      activeIndex = (activeIndex - 1 + total) % total;
      render();
    };

    tiles.forEach(function (tile, i) {
      tile.addEventListener("click", function () {
        open(i);
      });
    });

    closeBtn.addEventListener("click", close);
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    });

    var touchStart = null;
    lightbox.addEventListener("touchstart", function (e) {
      touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });
    lightbox.addEventListener("touchend", function (e) {
      if (!touchStart) return;
      var dx = e.changedTouches[0].clientX - touchStart.x;
      var dy = e.changedTouches[0].clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) showNext();
      else showPrev();
    });
  }
})();
