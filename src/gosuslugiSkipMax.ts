//! ==UserScript==
//! @name        Skip Max messenger link on gosuslugi.ru login
//! @namespace   Violentmonkey Scripts
//! @match       https://esia.gosuslugi.ru/login/*
//! @grant       none
//! @version     v1.8.1
//! @author      -
//! @description 11/10/2025, 12:14:08
//! ==/UserScript==

const root = document.querySelector("esia-root")

// Ugly.
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (
        node instanceof HTMLElement &&
        node.matches("div.mt-40:has([href='https://download.max.ru/'])")
      ) {
        const skipButton = node.querySelector("button")

        skipButton instanceof HTMLButtonElement && skipButton.click()
      }
    }
  }
})

root && observer.observe(root, { childList: true, subtree: true })
