//! ==UserScript==
//! @name        Set Wikipedia skin to `vector-2022`
//! @match       https://*.wikipedia.org/wiki/*
//! @icon        https://wikipedia.org/static/favicon/wikipedia.ico
//! @grant       none
//! @version     v1.10.3
//! @author      lippiece
//! ==/UserScript==

const url       = new URL(location.href)
const skin      = "vector-2022"
const hasVector = url.searchParams.get("useskin") === skin

if (!hasVector) {
  url.searchParams.set("useskin", skin)
  location.href = url.toString()
}
