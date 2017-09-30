// Modified from markdown.js from Hakim to handle external html files
(function loadHtmlSlides() {
  'use strict';

  function querySlidingHtml() {
    const sections = document.querySelectorAll('[data-html]');
    const numSections = sections.length;

    for (let j = 0; j < numSections; j++) {
      const section = sections[j];

      if (section.getAttribute('data-html').length) {
        const xhr = new XMLHttpRequest();
        const url = section.getAttribute('data-html');
        const cb = () => {
          if (xhr.readyState === 4) {
            if (
              (xhr.status >= 200 && xhr.status < 300) ||
              // file protocol yields status code 0 (useful for local debug, mobile apps etc.)
              xhr.status === 0
            ) {
              section.innerHTML = xhr.responseText;
            } else {
              section.outerHTML = `<section data-state="alert">ERROR: The attempt to fetch ${url} failed with the HTTP status ${xhr.status}. Check your browser's JavaScript console for more details.</p></section>`;
            }
          }
        };

        xhr.onreadystatechange = cb;

        xhr.open('GET', url, false);
        try {
          xhr.send();
        } catch (e) {
          // eslint-disable-next-line no-alert
          alert(`Failed to get file${url}.${e}`);
        }
      }
    }
  }

  querySlidingHtml();
}());
