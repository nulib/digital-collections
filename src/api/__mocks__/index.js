export function getManifest(url) {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      resolve({
        sequences: [
          {
            canvases: [
              {
                label: "Label Number 1",
                images: [
                  {
                    resource: {
                      "@type": "dctypes:Image",
                      "@id":
                        "https://iiif.stack.rdc.library.northwestern.edu/1",
                      height: 480,
                      width: 640,
                      format: null
                    }
                  }
                ]
              },
              {
                label: "Label Number 2",
                images: [
                  {
                    resource: {
                      "@type": "dctypes:Image",
                      "@id":
                        "https://iiif.stack.rdc.library.northwestern.edu/2",
                      height: 480,
                      width: 640,
                      format: null
                    }
                  }
                ]
              },
              {
                label: "Label Number 3",
                images: [
                  {
                    resource: {
                      "@type": "dctypes:Image",
                      "@id":
                        "https://iiif.stack.rdc.library.northwestern.edu/3",
                      height: 480,
                      width: 640,
                      format: null
                    }
                  }
                ]
              }
            ]
          }
        ]
      })
    );
  });
}
