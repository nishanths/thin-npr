/* Rewrite story links so that they open the expanded version
   (as if Read more... link is already clicked) */

const storyRx = /^\/s\.php/;

var anchors = document.querySelectorAll("a");
anchors.forEach(elem => {
    if (elem.pathname.search(storyRx) === -1) {
        return;
    }
    // Assumes that links already have query components.
    elem.search += "&x=1"; // Expands articles.
});
