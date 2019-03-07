import { GOOGLE_TAG_MANAGER_ID } from '../services/global-vars';

const dataLayer = window.dataLayer;

/**
 * This function is called between route changes, so the DataLayer always contains
 * accurate data.
 * @param {obj} values New, incoming DataLayer values
 */
export function loadDataLayer(values) {
  const instance = window.google_tag_manager[GOOGLE_TAG_MANAGER_ID].dataLayer;

  // Reset dataLayer values
  instance.reset();

  // Add new values
  dataLayer.push(values);
}

/**
 * Helpers
 *
 * Quick way to access a key value in DataLayer
 * > window.google_tag_manager['GTM-XXXXX'].dataLayer.get('keyNameHere')
 */
