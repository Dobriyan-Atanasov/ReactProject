export function getImageUrl(imageUrl) {
  if (imageUrl?.startsWith('/images/')) {
    return `${import.meta.env.BASE_URL}${imageUrl.slice(1)}`
  }

  return imageUrl
}
