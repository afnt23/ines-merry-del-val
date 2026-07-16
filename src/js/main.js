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
    var prev = document.querySelector(".pager-prev");
    var next = document.querySelector(".pager-next");
    if (e.key === "ArrowLeft" && prev) window.location.href = prev.href;
    if (e.key === "ArrowRight" && next) window.location.href = next.href;
  });
})();
