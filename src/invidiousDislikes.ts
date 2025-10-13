//! ==UserScript==
//! @name         Return YouTube Dislike for Invidious
//! @version     v1.4.1
//! @description  Show dislikes for a video on invidious instances (NOT nadeko.net)
//! @author       dieser-niko
//! @match        https://*/watch?*v=*
//! @connect      returnyoutubedislikeapi.com
//! @icon         https://invidious.io/favicon-32x32.png
//! @top-level-await
//! ==/UserScript==

const apiUrl          = "https://returnyoutubedislikeapi.com/votes?videoId="
const { videoId }     = JSON.parse(
  document.querySelector("#video_data")?.innerHTML || "{}",
)
const { dislikes }    = await fetch(apiUrl + videoId).then(({ json }) => json())
const likesElement    = document.querySelector("#likes")
const dislikesElement = document.createElement("p")
const dislikeIcon     = document.createElement("i")

dislikesElement.textContent = dislikes
dislikeIcon.classList.add("icon", "ion-ios-thumbs-down")
dislikesElement.append(dislikeIcon)
likesElement?.after(dislikesElement)
