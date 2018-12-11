import * as globalVars from './global-vars';

function buildDisplayIIIFUrl(rootUrl, iiifRegion) {
  return rootUrl ? `${rootUrl}${iiifRegion}` : '';
}

/**
 * Put together all the data which carousels need to load and display proper data
 * @param  {array} manifests An array of 2.0 IIIF manifests
 * @return {array} An array of objects which contain data that will feed a carousel
 */
export function constructCarouselItems(manifests) {
  // Create helper object from each manifest listing out the (label, description, metadata, and imageUrl) from IIIF manifest
  const items = manifests.map(manifest => {
    const { label, description, metadata } = manifest;
    let obj = {
      label,
      description,
      metadata
    };
    const iiifRootUrl = getIIIFRootUrl(manifest);

    obj.id = manifest['@id'];
    obj.imageUrl = buildDisplayIIIFUrl(
      iiifRootUrl,
      globalVars.IIIF_SMALL_ITEM_REGION
    );
    return obj;
  });

  return items;
}

/**
 * Parse the root IIIF url from a manifest
 * @param  {Object} manifest IIIF manifest
 * @return {String} Root url string.  Or empty string if there was a parsing error pulling the root url from manifest.
 */
function getIIIFRootUrl(manifest) {
  let iiifRootUrl;

  try {
    iiifRootUrl =
      manifest.sequences[0].canvases[0].images[0].resource.service['@id'];
  } catch (err) {
    iiifRootUrl = '';
  }
  return iiifRootUrl;
}

/**
 * Fetch IIIF manifests for supplied manifest urls
 * @param  {Array} helperArray An array of objects which delivers an item's id and manifest url
 * @return {Array} An array of IIIF manifest objects
 */
async function getManifests(helperArray) {
  let promises = [];
  for (let item of helperArray) {
    promises.push(fetch(item.manifestUrl).then(response => response.json()));
  }
  const manifests = await Promise.all(promises)
    .then(response => response)
    .catch(error => console.log(error));

  return manifests;
}

export function getTileSources(manifest) {
  let tileSources = [];
  let canvases = manifest.sequences[0].canvases;

  if (!manifest.sequences || !canvases) {
    return tileSources;
  }

  tileSources = canvases.map(canvas => {
    if (canvas.images.length > 0 && canvas.images[0].resource) {
      return canvas.images[0].resource.service['@id'];
    }
  });

  return tileSources;
}
