//! ==UserScript==
//! @name         Libreddit score filter
//! @version     v1.9.1
//! @author       lippiece
//! @match        https://redlib.*.*/r/*
//! @grant GM_getValue
//! @top-level-await
//! ==/UserScript==

const minimumScore = await GM_getValue<number>("minimumScore", 300)

const scoreElements = [
  ...document.body.querySelectorAll(".posts .post_score"),
  ...document.body.querySelectorAll("#posts .post_score"),
]

for (const element of scoreElements) {
  if (element instanceof HTMLElement) {
    const score         = Number(element.title)
    const isHiddenScore = element.title === "Hidden"

    if (score < minimumScore || isHiddenScore) {
      const postElement = element.closest(".post")

      postElement?.remove()
    }
  }
}
