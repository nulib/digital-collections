export async function getManifest(url) {
  try {
    let response = await fetch(url);
    let manifest = await response.json();

    return manifest;
  } catch (err) {
    console.log('Error fetching manifest:', err);
    return Promise.resolve({ error: err });
  }
}
