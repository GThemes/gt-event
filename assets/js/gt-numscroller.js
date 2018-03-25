// GainTime - gt-numScroller v0.0.1
var el = document.scrollingElement || document.documentElement;
var foco = document.getElementById("numScroller");
var numbers = [].slice.call(document.querySelectorAll(".numscroller"));

callIt();

function callIt() {
  numbers.forEach(function(x) {
    var min = parseInt(x.dataset.min);
    var max = parseInt(x.dataset.max);
    var increment = parseInt(x.dataset.increment);
    var delay = parseInt(x.dataset.delay);
    var timeout = (delay * 1000) / (max - min);

    startScrolling(x, min, max, increment, timeout);
  })
}

function startScrolling(el, min, max, increment, timeout) {
  if (min <= max) {
    el.innerHTML = min;
    min = parseInt(min) + parseInt(increment);
    setTimeout(function() {
      startScrolling(eval(el), eval(min), eval(max), eval(increment), eval(timeout))
    }, timeout);
  } else {
    el.innerHTML = max;
  }
}




document.addEventListener("scroll", function(e) {
  if (checkvisible(foco)) {
    callIt();
  }
});

function posY(elm) {
    var test = elm, top = 0;

    while(!!test && test.tagName.toLowerCase() !== "body") {
        top += test.offsetTop;
        test = test.offsetParent;
    }

    return top;
}

function viewPortHeight() {
    var de = document.documentElement;

    if(!!window.innerWidth)
    { return window.innerHeight; }
    else if( de && !isNaN(de.clientHeight) )
    { return de.clientHeight; }

    return 0;
}

function scrollY() {
    if( window.pageYOffset ) { return window.pageYOffset; }
    return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
}

function checkvisible( elm ) {
    var vpH = viewPortHeight(), // Viewport Height
        st = scrollY(), // Scroll Top
        y = posY(elm);

    return (y > (vpH + st));
}
