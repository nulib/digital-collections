import store from '../store';

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
  pageTitle = undefined,
  rightsStatement = undefined,
  subjects = undefined,
  visibility = undefined
}) {
  const values = {
    adminset,
    collections,
    creatorsContributors,
    event: 'react-route-change',
    isLoggedIn: !!store.getState().auth.token,
    pageTitle,
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
