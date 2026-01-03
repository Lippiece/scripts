//! ==UserScript==
//! @name         Libreddit score filter
//! @version      v1.4.2
//! @author       lippiece
//! @match        https://*/watch?*v=*
//! @match        https://redlib.*.com/r/*
//! @top-level-await
//! ==/UserScript==

const scoreElements = document.body.querySelectorAll(".post_score")

for (const element of scoreElements) {
  if (element instanceof HTMLElement) {
    const score = Number(element.title)

    if (score < 1000) {
      const postElement = element.closest(".post")

      postElement?.remove()
    }
  }
}
