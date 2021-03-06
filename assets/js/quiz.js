// 5. implementation completed.
//    made it in utilizing a newly introduced
//    window._g global object (Sep/19/2019)
//
// 4. functional test in.
//    unified hosting code (no public folder)
//    made it work without html modification, yet
//    browser error spit as below:
//    'Uncaught ReferenceError: module is not defined'
//    module.exports = loadQuiz: (Sep/17/2019)
//
// 3. ok to run and test (functional), yet
//    1. not compatible with IE, internet/samsung,
//    2. needs html modification...
//
// 2. rendering test in.
//    ok to run, and test (rendering) (Sep/15/2019)
//
// 1. features in.
//    ok to run, ng in test (Sep/13/2019)
//
function loadQuiz(window) {
  var d = window.document,
    ul = d.getElementsByClassName("SlidingPuzzle")[0],
    lia = Array.prototype.map.call(d.getElementsByClassName("Tile"), function(elm, i) {
      let l = elm.className.match(/Tile(\d)/)[1] - 1,
        cr = l2cr(l);
      elm.id = "cr" + cr.c + cr.r;
      elm.addEventListener("click", function(e) {
        clickTile(cr.c, cr.r, elm.id);
      });
      return elm;
    });
  tile9 = d.createElement("li");
  tile9.className = "Tile Tile9";
  tile9.id = "cr22";
  tile9.addEventListener("click", function(e) {
    clickTile(2, 2, tile9.id);
  });
  lia.push(
    d.getElementsByClassName("Tile8")[0].insertAdjacentElement('afterend', tile9)
  );
  shuffleTiles();
  // resetTiles();
  return {
    swapTiles: swapTiles,
    shuffleTiles: shuffleTiles,
    resetTiles:resetTiles,
    testHit: testHit,
    wow: wow,
    clickTile: clickTile,
  };

  function swapTiles(cr1, cr2, base, stop) {
    var el1 = {}, el2 = {};
    el1.e = d.getElementById(cr1);
    el1.innerHTML = el1.e.innerHTML;
    el1.className = el1.e.className;
    el2.e = d.getElementById(cr2);
    el2.innerHTML = el2.e.innerHTML;
    el2.className = el2.e.className;
    lia[base].innerHTML = el2.innerHTML;
    lia[base].className = el2.className;
    lia[stop].innerHTML = el1.innerHTML;
    lia[stop].className = el1.className;
    testHit(base);
    testHit(stop);
    wow();
  }

  function resetTiles() {
    lia.map((li, i) => {
      li.innerHTML = i < lia.length - 1 ? i + 1 : '';
      li.className = 'Tile Tile' + (i + 1);
    });
    wow();
  }

  function shuffleTiles() {
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) {
        var r1 = Math.floor(Math.random() * 3);
        var c1 = Math.floor(Math.random() * 3);
        swapTiles("cr" + c + r, "cr" + c1 + r1, cr2l(c, r), cr2l(c1, r1));
      }
    }
  }

  function testHit(l) {
    lia[l].classList.toggle("hit", lia[l].innerHTML - 1 === l);
  }

  function wow() {
    ul.classList.toggle("wow", lia.reduce(function(m, e) {
      return m && (e.classList.contains("hit") || e.classList.contains("Tile9"));
    }, true));
  }

  function cr2l(c, r) {
    return c + r * 3;
  }

  function l2cr(l) {
    return {c: l % 3, r: Math.floor(l / 3)};
  }

  function cr2Id(c, r) {
    return "cr" + c + r;
  }

  function clickTile(c, r, cr) {
    var cell = d.getElementById(cr);
    if (!cell.classList.contains("Tile9")) {
      if (c < 2) {
        if (d.getElementById("cr" + (c + 1) + r).classList.contains("Tile9")) {
          swapTiles(cr, cr2Id(c + 1, r), cr2l(c, r), cr2l(c + 1, r));
          return;
        }
      }
      if (0 < c) {
        if (d.getElementById("cr" + (c - 1) + r).classList.contains("Tile9")) {
          swapTiles(cr, cr2Id(c - 1, r), cr2l(c, r), cr2l(c - 1, r));
          return;
        }
      }
      if (r < 2) {
        if (d.getElementById("cr" + c + (r + 1)).classList.contains("Tile9")) {
          swapTiles(cr, cr2Id(c, r + 1), cr2l(c, r), cr2l(c, r + 1));
          return;
        }
      }
      if (0 < r) {
        if (d.getElementById("cr" + c + (r - 1)).classList.contains("Tile9")) {
          swapTiles(cr, cr2Id(c, r - 1), cr2l(c, r), cr2l(c, r - 1));
          return;
        }
      }
    }
  }
};
module.exports = loadQuiz;

