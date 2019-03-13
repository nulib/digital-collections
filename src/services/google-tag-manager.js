const dataLayer = window.dataLayer;

/**
 * This function is called between route changes, so the DataLayer always contains
 * accurate data. We provide default values of 'undefined' as a way of flushing
 * stale entries when changing routes.  Only 'isLoggedIn' is sent for all pages.
 * The remaining DataLayer properties are only sent from the Item Details Page.
 */
export function loadDataLayer({
  adminset = undefined,
  collections = undefined,
  creatorsContributors = undefined,
  isLoggedIn = undefined,
  rightsStatement = undefined,
  subjects = undefined,
  visibility = undefined
}) {
  const values = {
    adminset,
    collections,
    creatorsContributors,
    event: 'react-route-change',
    isLoggedIn,
    rightsStatement,
    subjects,
    visibility
  };

  // Add new values
  dataLayer.push(values);
}

/**
 * Helpers
 *
 * Quick way to access a key value in DataLayer
 * > window.google_tag_manager['GTM-XXXXX'].dataLayer.get('keyNameHere')
 */

/**
 * Helper function to prepare multi values we need to parse in Google Tag Manager / UA
 * @param {Array} arr Values to convert to a piped string
 * @returns {String}
 */
export function createPipedString(arr) {
  if (arr.length === 0) {
    return '';
  }

  const trimmedArray = arr.map(value => value.trim());

  return trimmedArray.join('|');
}
