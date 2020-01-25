"use strict";

var jsdom = require('jsdom'),
  {JSDOM} = jsdom,
  loadQuiz = require('../../quiz'),
  window, document, puzzle, _loadQuiz,
  chai = require('chai'),
  expect = require('chai').expect,
  rendered = require('../../lib/rendered');

describe("rendered", function() {
  beforeEach(function() {
    return JSDOM.fromFile('./index.html')
      .then((dom) => {
        window = dom.window;
        document = window.document;
        _loadQuiz = loadQuiz(window);
        puzzle = document.querySelector('.SlidingPuzzle');
      });
  });

  it("all components are properly rendered", function() {
    _loadQuiz.resetTiles();
    expect(puzzle.childNodes[1 + 0].textContent.trim()).to.equal(rendered['cr1'].t);
    expect(puzzle.childNodes[1 + 0].className).to.equal(rendered['cr1'].c);

    expect(puzzle.childNodes[1 + 12].textContent.trim()).to.equal(rendered['cr7'].t);
    expect(puzzle.childNodes[1 + 12].className).to.equal(rendered['cr7'].c);

    expect(puzzle.childNodes[1 + 14].textContent.trim()).to.equal(rendered['cr8'].t);
    expect(puzzle.childNodes[1 + 14].className).to.equal(rendered['cr8'].c);
  });
});
