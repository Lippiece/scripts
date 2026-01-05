//! ==UserScript==
//! @name         Libreddit score filter
//! @version     v1.6.1
//! @author       lippiece
//! @match        https://redlib.*.*/r/*
//! @top-level-await
//! ==/UserScript==

const scoreElements = document.body.querySelectorAll(".posts .post_score")

for (const element of scoreElements) {
  if (element instanceof HTMLElement) {
    const score         = Number(element.title)
    const isHiddenScore = element.title === "Hidden"

    if (score < 1000 || isHiddenScore) {
      const postElement = element.closest(".post")

      postElement?.remove()
    }
  }
}
