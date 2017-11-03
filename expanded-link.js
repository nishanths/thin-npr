// Rewrite thin.npr.org story links so that they open the expanded version
// as if 'Read more...' is already clicked)

(function() {
  const storyRx = /^\/s\.php/;
  var anchors = document.querySelectorAll("a");
  for (let elem of anchors) {
    if (elem.pathname.search(storyRx) == -1) {
      continue;
    }
    if (elem.search) {
      elem.search += "&x=1"; // x=1 expands articles.
    } else {
      elem.search = "x=1";
    }
  }
})();

