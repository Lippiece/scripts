//! ==UserScript==
//! @name        Opinionated hckrnews.com filter
//! @namespace   Violentmonkey Scripts
//! @match       https://hckrnews.com/*
//! @version     v1.9.3
//! @grant       GM_getValue
//! @top-level-await
//! ==/UserScript==

const userList = await GM_getValue<string[]>("userList", [])

const ignorelist = new Set([
  "AI",
  "Amazon",
  "Apple",
  "AWS",
  "Biden",
  "bill",
  "business",
  "CEO",
  "Claude",
  "Court",
  "died",
  "Elon",
  "Facebook",
  "FBI",
  "Google",
  "govern",
  "IBM",
  "Intel",
  "jail",
  "Kanye",
  "law",
  "Law",
  "LLM",
  "merica",
  "Meta",
  "Microsoft",
  "Musk",
  "nation",
  "Netflix",
  "Nvidia",
  "Oracle",
  "president",
  "Putin",
  "rrest",
  "shoot",
  "SpaceX",
  "Tesla",
  "Trump",
  "Twitter",
  "United States",
  "US",
  "Yahoo",
  "Zuckerberg",
  ...userList,
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
    ;(link.closest("li") ?? link).style.opacity = "0.3"
  }
}

// Ugly.
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (
        node instanceof HTMLElement &&
        node.matches(".link.story") &&
        node.closest("li")?.style.display !== "none"
      ) {
        const text = node.textContent

        if (text && Array.from(ignorelist).some(word => text.includes(word))) {
          ;(node.closest("li") ?? node).style.opacity = "0.3"
        }
      }
    }
  }
})

const entries = document.querySelector("#entries")

entries && observer.observe(entries, { childList: true, subtree: true })
