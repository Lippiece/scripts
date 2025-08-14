//! ==UserScript==
//! @name        Opinionated hckrnews.com filter
//! @namespace   Violentmonkey Scripts
//! @match       https://hckrnews.com/*
//! @grant       none
//! ==/UserScript==

const ignorelist = new Set([
  "AI",
  "Amazon",
  "Apple",
  "Biden",
  "Elon",
  "Facebook",
  "Google",
  "IBM",
  "Intel",
  "Kanye",
  "Meta",
  "Microsoft",
  "Musk",
  "Netflix",
  "Nvidia",
  "Oracle",
  "Putin",
  "SpaceX",
  "Tesla",
  "Trump",
  "Twitter",
  "Yahoo",
  "Zuckerberg",
])
const stories    = document.querySelectorAll(".link.story")

for (const link of Array.from(stories)) {
  if (
    link.closest("li")?.style.display === "none" ||
    !(link instanceof HTMLElement)
  ) {
    continue
  }

  const text = link.textContent

  if (text && Array.from(ignorelist).some(word => text.includes(word))) {
    ;(link.closest("li") || link).style.opacity = "0.3"
  }
}
