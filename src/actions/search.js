import * as actionTypes from "./types";

export function searchValueChange(value) {
  return {
    type: actionTypes.SEARCH_VALUE_CHANGE,
    value
  };
}
