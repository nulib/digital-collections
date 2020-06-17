export function parseHash() {
  var params = {};
  var hash = window.location.hash.slice(1);
  console.log("parse hash was called");
  if (hash) {
    var parts = hash.split("&");

    parts.forEach(function(part) {
      var subparts = part.split("=");
      var key = subparts[0];
      var value = parseFloat(subparts[1]);

      if (!key || isNaN(value)) {
        console.error("Bad hash param", part);
      } else {
        params[key] = value;
      }
    });
  }
  return params;
}

// export function useParams(params) {
//   var zoom = self.viewport.getZoom();
//   var pan = self.viewport.getCenter();
//   if (params.zoom !== undefined && params.zoom !== zoom) {
//     self.viewport.zoomTo(params.zoom, null, true);
//   }
//   if (
//     params.x !== undefined &&
//     params.y !== undefined &&
//     (params.x !== pan.x || params.y !== pan.y)
//   ) {
//     self.viewport.panTo(new $.Point(params.x, params.y), true);
//   }
// }

export function updateUrl({ pan, tileSourceIndex, zoom }) {
  let currentLocation = window.location.pathname;
  console.log("updateUrl()");
  console.log("currentLocation", currentLocation);
  console.log("window.location", window.location);

  let currentUrlParams = new URLSearchParams(window.location.hash.slice(1));

  currentUrlParams.set("zoom", zoom);
  currentUrlParams.set("x", pan.x);
  currentUrlParams.set("y", pan.y);

  if (tileSourceIndex && tileSourceIndex > 0) {
    currentUrlParams.set("fileset", tileSourceIndex);
  }

  const url = window.location.pathname + "#" + currentUrlParams.toString();
  console.log(url);
  console.log(" ");
  window.history.replaceState({}, "", url);
}
