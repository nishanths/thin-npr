// Rewrite thin.npr.org links in the footer of regular npr.org to point
// to the specific thin page instead of to the thin home page.

(function() {
  const nprStoryIdRx = /\/\d{4}\/\d{2}\/\d{2}\/(\d+)\//;

  // TODO: make this work on "/section/.+/blah"
	const pathMap = {
    // Main sections: News, Arts, Music.
    "/sections/news": ["/t.php", "tid=1001"],
    "/sections/arts": ["/t.php", "tid=1008"],
    "/music":         ["/t.php", "tid=1039"],
    // No support for Programs yet.
	};

	var isThinLink = (a) => {
    return a.href == "http://thin.npr.org/" || 
    	a.href == "https://thin.npr.org/" ||
    	a.href == "http://thin.npr.org" ||
    	a.href == "https://thin.npr.org";
	};

	var rewrite = (a) => {
    var p = window.location.pathname;
    // Remove trailing slash if any.
    if (p[p.length-1] === '/') {
      p = p.substring(0, p.length-1);
    }

    var thin = pathMap[p];
    if (thin) {
      // On a main section page.
      a.pathname = thin[0];
      a.search = thin[1];
      return;
    }

    var matches = p.match(nprStoryIdRx);
    if (matches && matches.length > 1) {
      // On a story page.
      var id = matches[1];
      a.pathname = "/s.php";
      var params = new URLSearchParams();
      params.set("sId", id);
      params.set("x", 1);
      a.search = params.toString();
    }
	};

	var run = () => {
    var footer = document.querySelector("#nprfooter");
    if (!footer) {
      console.warn("'#nprfooter' not found: npr.org page structure may have changed.")
      return;
    }
    var anchors = footer.querySelectorAll("a");
    for (var i = 0; i < anchors.length; i++) {
      if (isThinLink(anchors[i])) {
        rewrite(anchors[i]);
      }
    }
	};

	run();
})();
