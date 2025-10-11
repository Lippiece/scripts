//! ==UserScript==
//! @name        Opinionated hckrnews.com filter
//! @namespace   Violentmonkey Scripts
//! @match       https://hckrnews.com/*
//! @grant       none
//! @version     v1.3.2
//! ==/UserScript==

const ignorelist = new Set([
  "AI",
  "Amazon",
  "america",
  "America",
  "Apple",
  "Biden",
  "business",
  "Court",
  "Elon",
  "Facebook",
  "FBI",
  "Google",
  "IBM",
  "Intel",
  "Kanye",
  "LLM",
  "Meta",
  "Microsoft",
  "Musk",
  "nation",
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

for (const link of stories) {
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

// Ugly.
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const node of Array.from(mutation.addedNodes)) {
      if (
        node instanceof HTMLElement &&
        node.matches(".link.story") &&
        node.closest("li")?.style.display !== "none"
      ) {
        const text = node.textContent

        if (text && Array.from(ignorelist).some(word => text.includes(word))) {
          ;(node.closest("li") || node).style.opacity = "0.3"
        }
      }
    }
  }
})

const entries = document.querySelector("#entries")

entries && observer.observe(entries, { childList: true, subtree: true })
