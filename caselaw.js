(function () {
  var listEl = document.getElementById('caselaw-list');
  var searchEl = document.getElementById('caselaw-search');
  var countEl = document.getElementById('caselaw-count');
  if (!listEl || typeof ECHR_CASES === 'undefined') return;

  var IMPORTANCE_LABEL = { key: 'Key Case', high: 'High', reported: 'Reported', committee: 'Committee' };

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function rowHtml(c) {
    var url = c.i ? 'https://hudoc.echr.coe.int/eng?i=' + encodeURIComponent(c.i) : 'https://hudoc.echr.coe.int/';
    var badges = (c.arts || []).map(function (a) {
      var cls = a.v ? 'art-badge art-violation' : 'art-badge art-no-violation';
      return '<span class="' + cls + '">Art. ' + escapeHtml(a.a) + '</span>';
    }).join('');
    var impLabel = IMPORTANCE_LABEL[c.imp] || 'Reported';
    return (
      '<a class="case-row" href="' + url + '" target="_blank" rel="noopener noreferrer" ' +
      'data-search="' + escapeHtml((c.t + ' ' + c.n + ' ' + (c.arts || []).map(function (a) { return 'article ' + a.a; }).join(' ')).toLowerCase()) + '">' +
        '<span class="case-row-main">' +
          '<span class="case-badge imp-' + c.imp + '">' + impLabel + '</span>' +
          '<span class="case-title">' + escapeHtml(c.t) + '</span>' +
          '<span class="case-appno">App. no. ' + escapeHtml(c.n) + '</span>' +
        '</span>' +
        '<span class="case-row-meta">' +
          '<span class="case-articles">' + badges + '</span>' +
          '<span class="case-date">' + escapeHtml(c.d) + '</span>' +
        '</span>' +
      '</a>'
    );
  }

  listEl.innerHTML = ECHR_CASES.map(rowHtml).join('');
  var rows = Array.prototype.slice.call(listEl.querySelectorAll('.case-row'));

  function updateCount(shown) {
    if (countEl) countEl.textContent = shown + ' of ' + ECHR_CASES.length + ' judgments';
  }
  updateCount(rows.length);

  if (searchEl) {
    searchEl.addEventListener('input', function () {
      var q = searchEl.value.trim().toLowerCase();
      var shown = 0;
      rows.forEach(function (row) {
        var match = !q || row.getAttribute('data-search').indexOf(q) !== -1;
        row.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      updateCount(shown);
    });
  }
})();
