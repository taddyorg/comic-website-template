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

export {
  getImageUrl,
  parseDate,
}