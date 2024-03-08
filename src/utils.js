function getImageUrl({ image, type, variant }){
  if (!image) { return }
  const variantKey = getImageVariantKey({ type, variant })
  return image['base_url'] + image[variantKey];
}

function getImageVariantKey({ type, variant }){
  switch(type){
    case 'cover':
    case 'banner':
    case 'avatar':
      return `${type}_${variant}`;
    case 'story':
    case 'thumbnail':
      return type;
    default:
      throw new Error('getImageVariantKey - type is invalid');
  }
}

function parseDate({ date }) {
  const newDate = new Date(date);
  const month = newDate.toLocaleString('default', { month: 'long' });
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  return `${month} ${day}, ${year}`;
};

const allSocialMediaLinkTypes = [
  "INSTAGRAM",
  "YOUTUBE",
  "TIKTOK",
  "PATREON",
  "KO_FI",
  "EMAIL",
  "TWITTER",
  "MASTODON",
  "FACEBOOK",
  "WEBSITE",
  "MERCH_STORE",
  "LINKTREE",
  "TWITCH",
  "SNAPCHAT",
  "REDDIT",
  "DISCORD",
  "TELEGRAM",
  "ETSY",
  "PINTEREST",
  "TUMBLR",
  "SPOTIFY",
  "SOUNDCLOUD",
  "BANDCAMP",
  "VIMEO",
  "WECHAT",
  "WHATSAPP"
]

const allSocialMediaLinkTypesSet = new Set(allSocialMediaLinkTypes)

const HTTPS = "https://";

function getSafeBaseUrl(linkType){
  if (!linkType) return HTTPS

  switch(linkType){
    case "INSTAGRAM":
      return "instagram.com/"
    case "YOUTUBE":
      return "youtube.com/"
    case "TIKTOK":
      return "tiktok.com/@"
    case "PATREON":
      return "patreon.com/"
    case "KO_FI":
      return "ko-fi.com/"
    case "TWITTER":
      return "twitter.com/"
    case "FACEBOOK":
      return "facebook.com/"
    case "TWITCH":
      return "twitch.tv/"
    case "SNAPCHAT":
      return "snapchat.com/add/"
    case "REDDIT":
      return "reddit.com/r/"
    case "DISCORD":
      return "discord.gg/"
    case "TELEGRAM":
      return "t.me/"
    case "PINTEREST":
      return "pinterest.com/"
    case "TUMBLR":
      return "tumblr.com/"
    case "SPOTIFY":
      return "open.spotify.com/"
    case "SOUNDCLOUD":
      return "soundcloud.com/"
    case "BANDCAMP":
      return "bandcamp.com/"
    case "VIMEO":
      return "vimeo.com/"
    case "WECHAT":
      return "wechat.com/"
    case "WHATSAPP":
      return "chat.whatsapp.com/"
    case "LINKTREE":
      return "linktr.ee/"
    case "ETSY":
      return "etsy.com/shop/"
    case "WEBSITE":
    case "MERCH_STORE":
      return HTTPS
    case "MASTODON":
      return "@"
    case "EMAIL":
    default:
      return
  }
}

function getSafeFullLink(linkType, linkValue){
  const linkbase = getSafeBaseUrl(linkType)
  if (linkType === "EMAIL") return `mailto:${linkValue}`
  else if (linkType === "MASTODON") {
    const mastodonSplitValues = linkValue.split("@")
    if (mastodonSplitValues.length !== 2) { return }
    return `${HTTPS}${mastodonSplitValues[0]}/@${mastodonSplitValues[1]}`
  }else if (linkbase === HTTPS) return `${linkbase}${linkValue}`
  else return `${HTTPS}${linkbase}${linkValue}`
}

function getSocialMediaLinkImageUrl(type) {
  switch (type) {
    case "INSTAGRAM":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/instagram.svg?v=1709828978081"
    case "YOUTUBE":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/youtube.svg?v=1709828977717"
    case "TIKTOK":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/tiktok.svg?v=1709828977394"
    case "PATREON":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/patreon.svg?v=1709828978416"
    case "KO_FI":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/ko-fi.svg?v=1709830618062"
    case "TWITTER":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/x-twitter.svg?v=1709828976682"
    case "FACEBOOK":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/facebook.svg?v=1709828975920"
    case "TWITCH":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/twitch.svg?v=1709828975294"
    case "SNAPCHAT":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/snapchat.svg?v=1709828975020"
    case "REDDIT":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/reddit-alien.svg?v=1709828974720"
    case "DISCORD":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/discord.svg?v=1709828974415"
    case "TELEGRAM":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/telegram.svg?v=1709828974047"
    case "PINTEREST":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/pinterest.svg?v=1709828973392"
    case "TUMBLR":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/tumblr.svg?v=1709828972985"
    case "SPOTIFY":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/spotify.svg?v=1709828972684"
    case "SOUNDCLOUD":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/soundcloud.svg?v=1709828972322"
    case "BANDCAMP":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/bandcamp.svg?v=1709828972011"
    case "VIMEO":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/vimeo-v.svg?v=1709828971641"
    case "WECHAT":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/weixin.svg?v=1709828971272"
    case "WHATSAPP":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/whatsapp.svg?v=1709828970842"
    case "LINKTREE":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/linktree.svg?v=1709830618395"
    case "ETSY":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/etsy.svg?v=1709828973719"
    case "WEBSITE":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/chrome.svg?v=1709830380754"
    case "MERCH_STORE":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/shirt-solid.svg?v=1709828975598"
    case "MASTODON":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/mastodon.svg?v=1709828976293"
    case "EMAIL":
      return "https://cdn.glitch.global/3d48cd4c-11ef-4263-8b17-e27a943987f0/envelope-solid.svg?v=1709828977032"
    default:
      return null
  }
}

export {
  getImageUrl,
  parseDate,
  getSafeFullLink,
  allSocialMediaLinkTypesSet,
  getSocialMediaLinkImageUrl,
}

