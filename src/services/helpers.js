import { titleTagEnd } from "./global-vars";
import { getESTitle } from "./elasticsearch-parser";

/**
 * Helper function to chop a string into a limited word count, from the start of the text
 * @param {String} str - The string to chop
 * @param {Number} chopLength How many words to restrict the sentence to
 */
export function chopString(str, chopLength) {
  if (!str) {
    return "";
  }
  const extraText = str.split(" ").length > chopLength ? "..." : "";
  let chopped = str
    .split(" ")
    .splice(0, chopLength)
    .join(" ");
  return `${chopped}${extraText}`;
}

// TODO: might be able to delete this
export function getLinkPath(item) {
  const linkPath =
    item._source.model.name === "Collection" ? "collections" : "items";
  return `/${linkPath}/${item._id}`;
}

/**
 * Get a random integer between `min` and `max`.
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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

/**
 * Construct the html page <title> string
 * @param {string} title
 * @returns {string}
 */
export function generateTitleTag(title) {
  return title ? `${title} - ${titleTagEnd}` : titleTagEnd;
}

/**
 * Return the link to primo search results
 * @param {string} catalogKey
 * @returns {string}
 */
export function getPrimoLink(catalogKey) {
  return `https://search.library.northwestern.edu/primo-explore/search?field=any&query=any,contains,${catalogKey}&query=&institution=01NWU&vid=NULVNEW&search_scope=NWU`;
}

/**
 * Escape double quotes (which may interfere with Search queries)
 * @param {string} str
 * @returns {string}
 */
export function escapeDoubleQuotes(str) {
  return str.replace(/["]+/g, '%5C"');
}

/**
 * Build an array of submenu items for main navigation dropdown nav
 * @param {Array} items - array of ElasticSearch items
 * @returns {Array}
 */
export function buildSubmenu(items = []) {
  const subMenuItems = items.map(item => {
    return {
      id: item._id,
      url: `/collections/${item._id}`,
      label: getESTitle(item._source)
    };
  });

  return subMenuItems;
}

export function prepGlobalSearchInput(searchValue) {
  return {
    pathname: `/search`,
    search: `?q="${escapeDoubleQuotes(searchValue)
      .split(" ")
      .join("+")}"`
  };
}
