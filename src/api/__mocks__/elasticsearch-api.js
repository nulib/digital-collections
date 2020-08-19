export function getAdminSetItems(id) {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      resolve([
        {
          _id: "92df48a4-344a-456b-b860-2b189c45a940",
          _source: {
            model: {
              application: "Nextgen",
              name: "Image"
            },
            id: "92df48a4-344a-456b-b860-2b189c45a940",
            admin_set: {
              id: "c162a37d-00d1-4510-a8bf-06778e43a567",
              title: ["Test Admin Set"]
            },
            collection: [
              {
                id: "834c836f-acbb-4d5d-b493-fbf09cd7f73a",
                title: ["Test Collection"]
              }
            ],
            contributor: [
              {
                role: "author",
                uri: "http://vocab.getty.edu/ulan/500268810",
                label: "Bauwerkstadt (Author)"
              },
              {
                role: "contributor",
                uri: "http://vocab.getty.edu/ulan/500036005",
                label: "Cortés Bau, José (Contributor)"
              }
            ],
            creator: [
              {
                role: "creator",
                uri: "http://vocab.getty.edu/ulan/500449195",
                label: "Amsterdam, Jack"
              }
            ],
            date: ["2018"],
            expanded_date: ["2018-01-01"],
            year: [2018],
            permalink: "ark:/99999/fk4bk2m44h",
            subject: [],
            title: {
              primary: ["Baez"],
              alternate: []
            },
            thumbnail_url:
              "http://localhost:8183/iiif/2/14%2Fe4%2F36%2F99%2F-a%2F7c%2Fa-%2F42%2Fba%2F-a%2Fd6%2Fe-%2F16%2F63%2F25%2F96%2F22%2F14/square/300,/0/default.jpg",
            iiif_manifest:
              "http://localhost:8183/iiif/2/14%2Fe4%2F36%2F99%2F-a%2F7c%2Fa-%2F42%2Fba%2F-a%2Fd6%2Fe-%2F16%2F63%2F25%2F96%2F22%2F14/manifest.json",
            representativeFileSet: {
              file_set_id: "filesetid1",
              url:
                "http://localhost:8183/iiif/2/14%2Fe4%2F36%2F99%2F-a%2F7c%2Fa-%2F42%2Fba%2F-a%2Fd6%2Fe-%2F16%2F63%2F25%2F96%2F22%2F14"
            },
            resource_type: [],
            related_url: [],
            rights_statement: {
              uri: "http://rightsstatements.org/vocab/InC/1.0/",
              label: "In Copyright"
            },
            identifier: [],
            legacy_identifier: [],
            license: [],
            nul_use_statement: [],
            accession_number: "asdfasdf4444",
            call_number: null,
            full_text: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              "Baez",
              "Random House Publishing"
            ],
            description: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            ],
            keyword: ["Baez"],
            publisher: ["Random House Publishing"],
            visibility: "open"
          }
        },
        {
          _id: "3b3b23e4-5212-4739-99c7-5b5da2db618f",
          _source: {
            model: {
              application: "Nextgen",
              name: "Image"
            },
            id: "3b3b23e4-5212-4739-99c7-5b5da2db618f",
            admin_set: {
              id: "c162a37d-00d1-4510-a8bf-06778e43a567",
              title: ["Test Admin Set"]
            },
            collection: [],
            contributor: [],
            creator: [
              {
                role: "creator",
                uri: "http://vocab.getty.edu/ulan/500263794",
                label: "Allies, Bob"
              }
            ],
            date: ["1967"],
            expanded_date: ["1967-01-01"],
            year: [1967],
            permalink: "ark:/99999/fk46t1wb3b",
            subject: [],
            title: {
              primary: ["Wild West"],
              alternate: []
            },
            thumbnail_url:
              "http://localhost:8183/iiif/2/b6%2F29%2F1a%2Ffb%2F-f%2F10%2Fc-%2F4e%2Fce%2F-8%2Fca%2F7-%2F3b%2Ff4%2Ff4%2Fef%2Ffa%2F47/square/300,/0/default.jpg",
            iiif_manifest:
              "http://localhost:8183/iiif/2/b6%2F29%2F1a%2Ffb%2F-f%2F10%2Fc-%2F4e%2Fce%2F-8%2Fca%2F7-%2F3b%2Ff4%2Ff4%2Fef%2Ffa%2F47/manifest.json",
            representative_file_url:
              "http://localhost:8183/iiif/2/b6%2F29%2F1a%2Ffb%2F-f%2F10%2Fc-%2F4e%2Fce%2F-8%2Fca%2F7-%2F3b%2Ff4%2Ff4%2Fef%2Ffa%2F47",
            resource_type: [],
            related_url: [],
            rights_statement: {
              uri: "http://rightsstatements.org/vocab/InC/1.0/",
              label: "In Copyright"
            },
            identifier: [],
            license: [],
            nul_use_statement: [],
            accession_number: "34564hhhhh",
            call_number: null,
            catalog_key: [],
            bibliographic_citation: [],
            box: {
              name: [],
              number: []
            },
            folder: {
              name: [],
              number: []
            },
            physical_description: {
              material: [],
              size: []
            },
            full_text: ["asdf asdf"],
            description: ["asdf asdf"],
            visibility: "open"
          }
        }
      ])
    );
  });
}

export function getCollectionItems(id) {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      resolve([
        {
          _id: "92df48a4-344a-456b-b860-2b189c45a940",
          _source: {
            model: {
              application: "Nextgen",
              name: "Image"
            },
            id: "92df48a4-344a-456b-b860-2b189c45a940",
            admin_set: {
              id: "c162a37d-00d1-4510-a8bf-06778e43a567",
              title: ["Test Admin Set"]
            },
            collection: [
              {
                id: "834c836f-acbb-4d5d-b493-fbf09cd7f73a",
                title: ["Test Collection"]
              }
            ],
            contributor: [
              {
                role: "author",
                uri: "http://vocab.getty.edu/ulan/500268810",
                label: "Bauwerkstadt (Author)"
              },
              {
                role: "contributor",
                uri: "http://vocab.getty.edu/ulan/500036005",
                label: "Cortés Bau, José (Contributor)"
              }
            ],
            creator: [
              {
                role: "creator",
                uri: "http://vocab.getty.edu/ulan/500449195",
                label: "Amsterdam, Jack"
              }
            ],
            date: ["2018"],
            expanded_date: ["2018-01-01"],
            year: [2018],
            permalink: "ark:/99999/fk4bk2m44h",
            subject: [],
            title: {
              primary: ["Baez"],
              alternate: []
            },
            thumbnail_url:
              "http://localhost:8183/iiif/2/14%2Fe4%2F36%2F99%2F-a%2F7c%2Fa-%2F42%2Fba%2F-a%2Fd6%2Fe-%2F16%2F63%2F25%2F96%2F22%2F14/square/300,/0/default.jpg",
            iiif_manifest:
              "http://localhost:8183/iiif/2/14%2Fe4%2F36%2F99%2F-a%2F7c%2Fa-%2F42%2Fba%2F-a%2Fd6%2Fe-%2F16%2F63%2F25%2F96%2F22%2F14/manifest.json",
            representative_file_url:
              "http://localhost:8183/iiif/2/14%2Fe4%2F36%2F99%2F-a%2F7c%2Fa-%2F42%2Fba%2F-a%2Fd6%2Fe-%2F16%2F63%2F25%2F96%2F22%2F14",
            resource_type: [],
            related_url: [],
            rights_statement: {
              uri: "http://rightsstatements.org/vocab/InC/1.0/",
              label: "In Copyright"
            },
            identifier: [],
            legacy_identifier: [],
            license: [],
            nul_use_statement: [],
            accession_number: "asdfasdf4444",
            call_number: null,
            catalog_key: [],
            bibliographic_citation: [],
            box: {
              name: [],
              number: []
            },
            folder: {
              name: [],
              number: []
            },
            physical_description: {
              material: [],
              size: []
            },
            full_text: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              "Baez",
              "Random House Publishing"
            ],
            description: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            ],
            keyword: ["Baez"],
            publisher: ["Random House Publishing"],
            visibility: "open"
          }
        }
      ])
    );
  });
}

export function getItem(id) {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      id
        ? resolve({
            _id: "5cd66892-6e63-4476-bd3e-f295355d0302",
            found: true,
            _source: {
              admin_set: {
                id: "c162a37d-00d1-4510-a8bf-06778e43a567",
                title: ["Test Admin Set"]
              },
              collection: [
                {
                  id: "834c836f-acbb-4d5d-b493-fbf09cd7f73a",
                  title: ["Test Collection"]
                }
              ],
              title: {
                primary: ["This is the title"]
              }
            }
          })
        : reject({
            found: false
          })
    );
  });
}
