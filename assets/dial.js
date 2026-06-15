/* ============================================================
 * Snap Korean — CAMERA DIAL
 * 회전식 촬영 모드 다이얼. 가운데 셔터, 림(rim)을 드래그하거나
 * 모드를 탭하면 선택 모드가 상단 포인터로 스냅된다. (촬영 화면 전용)
 * 마크업: [data-camera] > [data-mode-label] + .dial[data-dial] > .dial__opt + .shutter
 * ============================================================ */
(function () {
  var RADIUS = 92; // 옵션이 놓이는 반지름(px)

  function norm(deg) {
    deg %= 360;
    if (deg > 180) deg -= 360;
    if (deg < -180) deg += 360;
    return deg;
  }

  function initDial(dial) {
    var opts = Array.prototype.slice.call(dial.querySelectorAll(".dial__opt"));
    if (!opts.length) return;
    var camera = dial.closest("[data-camera]") || document;
    var label = camera.querySelector("[data-mode-label]");
    var N = opts.length;
    var STEP = 360 / N;
    var rotation = 0;
    var dragging = false, moved = false, startAngle = 0, startRotation = 0;

    function centerOf() {
      var r = dial.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    function pointerAngle(e) {
      var c = centerOf();
      return (Math.atan2(e.clientY - c.y, e.clientX - c.x) * 180) / Math.PI;
    }

    function layout() {
      var active = 0, best = Infinity;
      opts.forEach(function (o, i) {
        var ang = rotation + i * STEP;            // 0deg = 상단 포인터
        var rad = ((ang - 90) * Math.PI) / 180;   // -90: 0deg를 위쪽으로
        var x = Math.cos(rad) * RADIUS;
        var y = Math.sin(rad) * RADIUS;
        o.style.transform =
          "translate(-50%, -50%) translate(" + x.toFixed(2) + "px," + y.toFixed(2) + "px)";
        var d = Math.abs(norm(ang));
        if (d < best) { best = d; active = i; }
      });
      opts.forEach(function (o, i) {
        var on = i === active;
        o.classList.toggle("is-active", on);
        o.setAttribute("aria-checked", on ? "true" : "false");
        o.tabIndex = on ? 0 : -1;
      });
      if (label) label.textContent = opts[active].dataset.mode || opts[active].textContent;
    }

    function snap() {
      rotation = Math.round(rotation / STEP) * STEP; // 옵션을 상단으로 정렬
      dial.classList.remove("is-dragging");
      layout();
    }

    // 모드 탭 → 해당 모드를 상단으로
    opts.forEach(function (o, i) {
      o.addEventListener("click", function () {
        if (moved) { moved = false; return; }
        // 현재 회전과 가까운 등가 각도로 이동(짧은 경로)
        rotation = rotation - norm(rotation + i * STEP);
        layout();
      });
      o.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); step(1); }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); step(-1); }
      });
    });

    function step(dir) {
      rotation -= dir * STEP;
      snap();
      var a = dial.querySelector(".dial__opt.is-active");
      if (a) a.focus();
    }

    // 림 드래그로 회전
    dial.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".shutter")) return;
      dragging = true; moved = false;
      dial.classList.add("is-dragging");
      startAngle = pointerAngle(e);
      startRotation = rotation;
      if (dial.setPointerCapture) try { dial.setPointerCapture(e.pointerId); } catch (x) {}
    });
    dial.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var delta = pointerAngle(e) - startAngle;
      if (Math.abs(delta) > 4) moved = true;
      rotation = startRotation + delta;
      layout();
    });
    function end() { if (!dragging) return; dragging = false; snap(); }
    dial.addEventListener("pointerup", end);
    dial.addEventListener("pointercancel", end);

    layout();
  }

  function initShutter(shutter) {
    shutter.addEventListener("click", function () {
      var camera = shutter.closest("[data-camera]") || document;
      var flash = camera.querySelector("[data-flash]");
      if (flash) {
        flash.classList.remove("is-flashing");
        // reflow로 애니메이션 재시작
        void flash.offsetWidth;
        flash.classList.add("is-flashing");
      }
    });
  }

  function run() {
    document.querySelectorAll("[data-dial]").forEach(initDial);
    document.querySelectorAll("[data-shutter]").forEach(initShutter);
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", run);
  else run();
})();
