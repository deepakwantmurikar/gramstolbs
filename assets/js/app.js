/* Converter UI for the homepage.
   All arithmetic lives in convert.js, which loads first. This file only reads
   input, formats output and moves pixels. No conversion constant appears here. */

(function () {
  'use strict';

  /* This script is loaded on every page for a consistent bundle, but only the
     tool pages carry a converter. Bail out quietly everywhere else. */
  if (!document.getElementById('value-input')) return;

  var input = document.getElementById('value-input');
  var inputLabel = document.getElementById('input-label');
  var unitSuffix = document.getElementById('unit-suffix');
  var swapBtn = document.getElementById('swap-btn');
  var chipRow = document.getElementById('chip-row');
  var arm = document.getElementById('beam-arm');
  var weight = document.getElementById('beam-weight');

  function rowRefs(suffix) {
    var value = document.getElementById('value-' + suffix);
    return {
      label: document.getElementById('label-' + suffix),
      value: value,
      row: value.closest('.result-row')
    };
  }

  var rows = { a: rowRefs('a'), b: rowRefs('b'), c: rowRefs('c') };

  /* Each mode describes its own labels, chips and beam range so render()
     stays free of branching about units. */
  var MODES = {
    'g-to-lb': {
      inputLabel: 'Grams',
      suffix: 'g',
      swapText: 'Swap to lbs → grams',
      chips: [100, 250, 500, 1000, 2000],
      chipUnit: 'g',
      beamMax: 2000,
      /* "lbs" and "pounds" deliberately mixed: both phrasings are searched,
         and Google reads them as the same unit either way. */
      labels: ['Decimal lbs', 'Pounds and ounces', 'Total ounces']
    },
    'lb-to-g': {
      inputLabel: 'Pounds (lbs)',
      suffix: 'lb',
      swapText: 'Swap to grams → lbs',
      chips: [0.5, 1, 2, 5, 10],
      chipUnit: 'lb',
      beamMax: 10,
      labels: ['Grams', 'Kilograms', 'Total ounces']
    }
  };

  var mode = 'g-to-lb';

  function precision() {
    var checked = document.querySelector('input[name="precision"]:checked');
    return checked ? parseInt(checked.value, 10) : 4;
  }

  /* Display gets thousands separators and a fixed number of decimals so the
     readout columns line up. The clipboard gets the plain number, because a
     value pasted into a spreadsheet should not carry commas. */
  function display(value, decimals) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function plain(value, decimals) {
    return value.toFixed(decimals);
  }

  /* Restart a CSS animation on an element that may still be mid-animation.
     Removing the class alone is not enough — the browser coalesces the
     remove/add into one frame, so a forced reflow between them is required. */
  function replay(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  function setRow(row, shown, copyText) {
    var changed = row.value.textContent !== shown;
    row.value.textContent = shown;
    row.value.dataset.copy = copyText;
    row.value.dataset.empty = 'false';

    /* Only animate a genuine change. Replaying on every keystroke that
       produces the same digits would read as flicker, not feedback. */
    if (changed) {
      replay(row.value, 'is-fresh');
      replay(row.row, 'is-fresh');
    }
  }

  function clearRow(row) {
    row.value.textContent = '—';
    row.value.dataset.copy = '';
    row.value.dataset.empty = 'true';
  }

  function moveBeam(value, max) {
    var ratio = value === null ? 0 : Math.min(value / max, 1);
    arm.style.transform = 'rotate(' + (ratio * 4).toFixed(2) + 'deg)';
    weight.style.left = (ratio * 100).toFixed(2) + '%';
  }

  function buildChips(cfg) {
    chipRow.innerHTML = '';
    cfg.chips.forEach(function (v) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip';
      btn.dataset.value = v;
      btn.setAttribute('aria-pressed', 'false');
      btn.textContent = v + ' ' + cfg.chipUnit;
      btn.addEventListener('click', function () {
        input.value = v;
        render();
        input.focus();
      });
      chipRow.appendChild(btn);
    });
  }

  /* Mark whichever quick-pick matches what is currently typed */
  function syncChips() {
    var current = parseValidNumber(input.value);
    Array.prototype.forEach.call(chipRow.children, function (btn) {
      var match = current !== null && Number(btn.dataset.value) === current;
      btn.setAttribute('aria-pressed', match ? 'true' : 'false');
    });
  }

  function render() {
    var cfg = MODES[mode];
    var d = precision();
    var n = parseValidNumber(input.value);

    syncChips();

    if (n === null) {
      clearRow(rows.a);
      clearRow(rows.b);
      clearRow(rows.c);
      moveBeam(null, cfg.beamMax);
      return;
    }

    if (mode === 'g-to-lb') {
      var lb = gramsToPounds(n);
      var split = gramsToPoundsOunces(n);
      var oz = gramsToOunces(n);

      /* Rounding the ounces can push them to a full 16, which would read as
         "2 lb 16.00 oz". Carry it into the pounds instead. */
      var pounds = split.pounds;
      var ounces = roundTo(split.ounces, d);
      if (ounces >= 16) {
        pounds += 1;
        ounces = 0;
      }

      setRow(rows.a, display(roundTo(lb, d), d) + ' lb', plain(lb, d));
      setRow(
        rows.b,
        pounds.toLocaleString('en-US') + ' lb ' + display(ounces, d) + ' oz',
        pounds + ' lb ' + plain(ounces, d) + ' oz'
      );
      setRow(rows.c, display(roundTo(oz, d), d) + ' oz', plain(oz, d));
    } else {
      var grams = poundsToGrams(n);
      var kg = grams / 1000;
      var totalOz = gramsToOunces(grams);

      setRow(rows.a, display(roundTo(grams, d), d) + ' g', plain(grams, d));
      setRow(rows.b, display(roundTo(kg, d), d) + ' kg', plain(kg, d));
      setRow(rows.c, display(roundTo(totalOz, d), d) + ' oz', plain(totalOz, d));
    }

    moveBeam(n, cfg.beamMax);
  }

  function applyMode(next) {
    mode = next;
    var cfg = MODES[mode];

    inputLabel.textContent = cfg.inputLabel;
    unitSuffix.textContent = cfg.suffix;
    swapBtn.querySelector('.swap-text').textContent = cfg.swapText;
    rows.a.label.textContent = cfg.labels[0];
    rows.b.label.textContent = cfg.labels[1];
    rows.c.label.textContent = cfg.labels[2];

    buildChips(cfg);
    render();
  }

  /* Opened straight from disk, file:// pages do not always get the async
     clipboard API. Fall back to the old execCommand path so copy still works. */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy') ? resolve() : reject();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(ta);
      }
    });
  }

  /* ---- wiring ---- */

  input.addEventListener('input', render);

  Array.prototype.forEach.call(
    document.querySelectorAll('input[name="precision"]'),
    function (el) { el.addEventListener('change', render); }
  );

  swapBtn.addEventListener('click', function () {
    input.value = '';
    applyMode(mode === 'g-to-lb' ? 'lb-to-g' : 'g-to-lb');
    input.focus();
  });

  Array.prototype.forEach.call(
    document.querySelectorAll('.copy-btn'),
    function (btn) {
      btn.addEventListener('click', function () {
        var target = document.getElementById(btn.dataset.target);
        if (!target || !target.dataset.copy) return;

        copyText(target.dataset.copy).then(function () {
          btn.dataset.copied = 'true';
          btn.textContent = 'Copied';
          setTimeout(function () {
            btn.textContent = 'Copy';
            btn.dataset.copied = 'false';
          }, 1400);
        }).catch(function () { /* clipboard unavailable; leave the button as is */ });
      });
    }
  );

  /* Progressive enhancement: the popular-conversion cards are plain readable
     markup for crawlers and no-JS visitors. Here they become real controls
     that load their value into the converter. */
  (function enhancePopularCards() {
    var grid = document.getElementById('popular-grid');
    if (!grid) return;

    Array.prototype.forEach.call(grid.querySelectorAll('[data-grams]'), function (card) {
      var grams = card.dataset.grams;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', 'Convert ' + grams + ' grams to pounds');

      function activate() {
        if (mode !== 'g-to-lb') applyMode('g-to-lb');
        input.value = grams;
        render();
        document.getElementById('value-input').scrollIntoView({
          behavior: 'smooth', block: 'center'
        });
        input.focus();
      }

      card.addEventListener('click', activate);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  })();

  /* The reverse tool page carries data-mode="lb-to-g" on its card so the same
     component starts in the other direction. Defaults to grams to pounds. */
  var card = document.querySelector('.converter-card');
  var startMode = card && MODES[card.dataset.mode] ? card.dataset.mode : 'g-to-lb';
  applyMode(startMode);

  /* The field ships with a sample value so the results are populated on arrival.
     Selecting it means the first keystroke replaces it rather than appending. */
  input.focus();
  input.select();
})();
