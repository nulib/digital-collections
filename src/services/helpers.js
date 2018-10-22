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

// TODO: might be able to delete this
export function getLinkPath(item) {
  const linkPath =
    item._source.model.name === 'Collection' ? 'collections' : 'items';
  return `/${linkPath}/${item._id}`;
}

/**
 * Shuffle an array
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param {Array} array
 * @return {Array}
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }

  return array;
}
