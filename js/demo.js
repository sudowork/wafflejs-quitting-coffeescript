/* global Reveal, onLoad */

(function initDemo() {
  'use strict';

  function initBulkDecaffeinateDemoWhenReady() {
    let alreadyLoaded = false;
    if (isDemoSlideInVicinity(Reveal.getState().indexh)) {
      alreadyLoaded = true;
      initBulkDecaffeinateDemo();
      return;
    }
    Reveal.addEventListener('slidechanged', ({ indexh: currentSlideIndex }) => {
      if (alreadyLoaded) return;
      if (isDemoSlideInVicinity(currentSlideIndex)) {
        alreadyLoaded = true;
        initBulkDecaffeinateDemo();
      }
    });
  }

  function isDemoSlideInVicinity(currentSlideIndex) {
    const isDemo = slide => !!slide.querySelector('#bulk-decaffeinate-demo');
    const currentSlide = Reveal.getSlide(currentSlideIndex);
    const previousSlide = Reveal.getSlide(currentSlideIndex - 1);
    const nextSlide = Reveal.getSlide(currentSlideIndex + 1);
    return (
      (isDemo(currentSlide)) ||
      (previousSlide && isDemo(previousSlide)) ||
      (nextSlide && isDemo(nextSlide))
    );
  }

  function initBulkDecaffeinateDemo() {
    const script = document.createElement('script');
    script.src = 'https://asciinema.org/a/NJRer9YOAOiuKZPZG6TY2uuS3.js';
    script.setAttribute('data-theme', 'solarized-light');
    script.setAttribute('data-speed', '2.5');
    script.setAttribute('data-cols', '125');
    script.setAttribute('data-rows', '35');
    script.id = 'asciicast-NJRer9YOAOiuKZPZG6TY2uuS3';
    script.async = true;
    document.getElementById('bulk-decaffeinate-demo').appendChild(script);
  }

  onLoad(initBulkDecaffeinateDemoWhenReady);
}());
