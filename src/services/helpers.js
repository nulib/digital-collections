import placeholderImage from '../images/book_placeholder.jpg';

export function getImagePath(item) {
  const imgUrl =
    item._source.model.name === 'Collection'
      ? item._source.thumbnail_iiif_url
      : item._source.representative_file_url;

  const returnUrl =
    imgUrl === '' ? placeholderImage : `${imgUrl}/full/250,/0/default.jpg`;

  return returnUrl;
}

export function getLinkPath(item) {
  const linkPath =
    item._source.model.name === 'Collection' ? 'collections' : 'items';
  return `/${linkPath}/${item._id}`;
}

/**
 * Helper function to chop a string into a limited word count, from the start of the text
 * @param {String} str - The string to chop
 * @param {Number} chopLength How many words to restrict the sentence to
 */
export function chopString(str, chopLength) {
  const extraText = str.split(' ').length > chopLength ? '...' : '';
  let chopped = str
    .split(' ')
    .splice(0, chopLength)
    .join(' ');
  return `${chopped}${extraText}`;
}
