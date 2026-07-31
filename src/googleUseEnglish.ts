//! ==UserScript==
//! @name        Forces Google sites to use English through search parameter
//! @namespace   Violentmonkey Scripts
//! @match       https://*.google.com/*
//! @version     v1.10.2
//! @grant       GM_getValue
//! @top-level-await
//! ==/UserScript==

const exceptions = await GM_getValue<string[]>("exceptions", [])

const url = new URL(location.href)

if (!exceptions.includes(url.hostname) && url.searchParams.get("hl") !== "en") {
  url.searchParams.set("hl", "en")
  location.replace(url.href)
}
