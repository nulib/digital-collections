export async function getAdminSetItems(id) {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      resolve([
        {
          _id: "92df48a4-344a-456b-b860-2b189c45a940",
          _source: {
            model: {
              application: "Nextgen",
              name: "Image",
            },
            id: "92df48a4-344a-456b-b860-2b189c45a940",
            admin_set: {
              id: "c162a37d-00d1-4510-a8bf-06778e43a567",
              title: ["Test Admin Set"],
            },
            collection: [
              {
                id: "834c836f-acbb-4d5d-b493-fbf09cd7f73a",
                title: ["Test Collection"],
              },
            ],
            contributor: [
              {
                role: "author",
                uri: "http://vocab.getty.edu/ulan/500268810",
                label: "Bauwerkstadt (Author)",
              },
              {
                role: "contributor",
                uri: "http://vocab.getty.edu/ulan/500036005",
                label: "Cortés Bau, José (Contributor)",
              },
            ],
            creator: [
              {
                role: "creator",
                uri: "http://vocab.getty.edu/ulan/500449195",
                label: "Amsterdam, Jack",
              },
            ],
            date: ["2018"],
            expanded_date: ["2018-01-01"],
            year: [2018],
            permalink: "ark:/99999/fk4bk2m44h",
            subject: [],
            title: {
              primary: ["Baez"],
              alternate: [],
            },
            thumbnail_url:
              "http://localhost:8183/iiif/2/14%2Fe4%2F36%2F99%2F-a%2F7c%2Fa-%2F42%2Fba%2F-a%2Fd6%2Fe-%2F16%2F63%2F25%2F96%2F22%2F14/square/300,/0/default.jpg",
            iiifManifest:
              "http://localhost:8183/iiif/2/14%2Fe4%2F36%2F99%2F-a%2F7c%2Fa-%2F42%2Fba%2F-a%2Fd6%2Fe-%2F16%2F63%2F25%2F96%2F22%2F14/manifest.json",
            representativeFileSet: {
              file_set_id: "filesetid1",
              url: "http://localhost:8183/iiif/2/14%2Fe4%2F36%2F99%2F-a%2F7c%2Fa-%2F42%2Fba%2F-a%2Fd6%2Fe-%2F16%2F63%2F25%2F96%2F22%2F14",
            },
            resource_type: [],
            related_url: [],
            rights_statement: {
              uri: "http://rightsstatements.org/vocab/InC/1.0/",
              label: "In Copyright",
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
              "Random House Publishing",
            ],
            description: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            ],
            keyword: ["Baez"],
            publisher: ["Random House Publishing"],
            visibility: "open",
          },
        },
        {
          _id: "3b3b23e4-5212-4739-99c7-5b5da2db618f",
          _source: {
            model: {
              application: "Nextgen",
              name: "Image",
            },
            id: "3b3b23e4-5212-4739-99c7-5b5da2db618f",
            admin_set: {
              id: "c162a37d-00d1-4510-a8bf-06778e43a567",
              title: ["Test Admin Set"],
            },
            collection: [],
            contributor: [],
            creator: [
              {
                role: "creator",
                uri: "http://vocab.getty.edu/ulan/500263794",
                label: "Allies, Bob",
              },
            ],
            date: ["1967"],
            expanded_date: ["1967-01-01"],
            year: [1967],
            permalink: "ark:/99999/fk46t1wb3b",
            subject: [],
            title: {
              primary: ["Wild West"],
              alternate: [],
            },
            thumbnail_url:
              "http://localhost:8183/iiif/2/b6%2F29%2F1a%2Ffb%2F-f%2F10%2Fc-%2F4e%2Fce%2F-8%2Fca%2F7-%2F3b%2Ff4%2Ff4%2Fef%2Ffa%2F47/square/300,/0/default.jpg",
            iiifManifest:
              "http://localhost:8183/iiif/2/b6%2F29%2F1a%2Ffb%2F-f%2F10%2Fc-%2F4e%2Fce%2F-8%2Fca%2F7-%2F3b%2Ff4%2Ff4%2Fef%2Ffa%2F47/manifest.json",
            representative_file_url:
              "http://localhost:8183/iiif/2/b6%2F29%2F1a%2Ffb%2F-f%2F10%2Fc-%2F4e%2Fce%2F-8%2Fca%2F7-%2F3b%2Ff4%2Ff4%2Fef%2Ffa%2F47",
            resource_type: [],
            related_url: [],
            rights_statement: {
              uri: "http://rightsstatements.org/vocab/InC/1.0/",
              label: "In Copyright",
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
              number: [],
            },
            folder: {
              name: [],
              number: [],
            },
            physical_description: {
              material: [],
              size: [],
            },
            full_text: ["asdf asdf"],
            description: ["asdf asdf"],
            visibility: "open",
          },
        },
      ])
    );
  });
}

export async function getCollectionItems(id) {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      resolve([
        {
          _id: "92df48a4-344a-456b-b860-2b189c45a940",
          _source: {
            model: {
              application: "Nextgen",
              name: "Image",
            },
            id: "92df48a4-344a-456b-b860-2b189c45a940",
            admin_set: {
              id: "c162a37d-00d1-4510-a8bf-06778e43a567",
              title: ["Test Admin Set"],
            },
            collection: [
              {
                id: "834c836f-acbb-4d5d-b493-fbf09cd7f73a",
                title: ["Test Collection"],
              },
            ],
            contributor: [
              {
                role: "author",
                uri: "http://vocab.getty.edu/ulan/500268810",
                label: "Bauwerkstadt (Author)",
              },
              {
                role: "contributor",
                uri: "http://vocab.getty.edu/ulan/500036005",
                label: "Cortés Bau, José (Contributor)",
              },
            ],
            creator: [
              {
                role: "creator",
                uri: "http://vocab.getty.edu/ulan/500449195",
                label: "Amsterdam, Jack",
              },
            ],
            date: ["2018"],
            expanded_date: ["2018-01-01"],
            year: [2018],
            permalink: "ark:/99999/fk4bk2m44h",
            subject: [],
            title: {
              primary: ["Baez"],
              alternate: [],
            },
            thumbnail_url:
              "http://localhost:8183/iiif/2/14%2Fe4%2F36%2F99%2F-a%2F7c%2Fa-%2F42%2Fba%2F-a%2Fd6%2Fe-%2F16%2F63%2F25%2F96%2F22%2F14/square/300,/0/default.jpg",
            iiifManifest:
              "http://localhost:8183/iiif/2/14%2Fe4%2F36%2F99%2F-a%2F7c%2Fa-%2F42%2Fba%2F-a%2Fd6%2Fe-%2F16%2F63%2F25%2F96%2F22%2F14/manifest.json",
            representative_file_url:
              "http://localhost:8183/iiif/2/14%2Fe4%2F36%2F99%2F-a%2F7c%2Fa-%2F42%2Fba%2F-a%2Fd6%2Fe-%2F16%2F63%2F25%2F96%2F22%2F14",
            resource_type: [],
            related_url: [],
            rights_statement: {
              uri: "http://rightsstatements.org/vocab/InC/1.0/",
              label: "In Copyright",
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
              number: [],
            },
            folder: {
              name: [],
              number: [],
            },
            physical_description: {
              material: [],
              size: [],
            },
            full_text: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              "Baez",
              "Random House Publishing",
            ],
            description: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            ],
            keyword: ["Baez"],
            publisher: ["Random House Publishing"],
            visibility: "open",
          },
        },
      ])
    );
  });
}

export async function getItem(id) {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      id
        ? resolve({
            _id: "5cd66892-6e63-4476-bd3e-f295355d0302",
            found: true,
            _source: {
              admin_set: {
                id: "c162a37d-00d1-4510-a8bf-06778e43a567",
                title: ["Test Admin Set"],
              },
              collection: [
                {
                  id: "834c836f-acbb-4d5d-b493-fbf09cd7f73a",
                  title: ["Test Collection"],
                },
              ],
              title: {
                primary: ["This is the title"],
              },
            },
          })
        : reject({
            found: false,
          })
    );
  });
}

export async function getLibraryUnitItems() {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      resolve([
        {
          accessionNumber: "BFMF_B12_F15_003_008n_am",
          administrativeMetadata: {
            libraryUnit: {
              id: "SPECIAL_COLLECTIONS",
              label: "Charles Deering McCormick Library of Special Collections",
              scheme: "library_unit",
            },
            preservationLevel: {
              id: "1",
              label: "Level 1",
              scheme: "preservation_level",
            },
            projectCycle: "2018",
            projectDesc: [
              "NEH grant project to digitize Berkeley Folk Festival Collection",
            ],
            projectManager: ["Nicole Finzer"],
            projectName: ["Berkeley Folk Music Festival"],
            projectProposer: ["Scott Krafft"],
            projectTaskNumber: ["P0123"],
            status: {
              id: "DONE",
              label: "Done",
              scheme: "status",
            },
          },
          batches: [],
          collection: {
            id: "18ec4c6b-192a-4ab8-9903-ea0f393c35f7",
            title: "Berkeley Folk Music Festival",
          },
          createDate: "2021-03-16T23:07:31.173234Z",
          descriptiveMetadata: {
            source: [],
            title: "Musicians",
            scopeAndContents: [],
            notes: [],
            folderName: ["Times Square Two"],
            license: null,
            rightsHolder: [],
            genre: [
              {
                displayFacet: "black-and-white negatives",
                facet:
                  "http://vocab.getty.edu/aat/300128343||black-and-white negatives|",
                role: null,
                term: {
                  id: "http://vocab.getty.edu/aat/300128343",
                  label: "black-and-white negatives",
                },
              },
            ],
            catalogKey: [],
            legacyIdentifier: [],
            alternateTitle: [],
            contributor: [],
            caption: [],
            boxName: ["12"],
            physicalDescriptionMaterial: [],
            rightsStatement: {
              id: "http://rightsstatements.org/vocab/InC/1.0/",
              label: "In Copyright",
              scheme: "rights_statement",
            },
            series: [
              "Berkeley Folk Music Festival -- 1. Artists' Photo Archive",
            ],
            tableOfContents: [],
            location: [],
            termsOfUse:
              "The images on this web site are from material in the collections of the Charles Deering McCormick Library of Special Collections of Northwestern University Libraries, and are provided for use by its students, faculty and staff, and by other researchers visiting this site, for research consultation and scholarly purposes only. Further distribution and/or any commercial use of the images from this site is not permitted.",
            identifier: ["MS 63"],
            creator: [],
            relatedMaterial: [],
            ark: "ark:/81985/n20k26s37",
            relatedUrl: [],
            dateCreated: [
              {
                edtf: "1958~/1970~",
                humanized: "circa 1958 to circa 1970",
              },
            ],
            provenance: [],
            folderNumber: ["15"],
            keywords: [],
            description: [
              "Group of musicians. Found with material related to the Times Square Two. Digital scan of a black and white negative.",
            ],
            language: [],
            stylePeriod: [],
            publisher: [],
            technique: [],
            abstract: [],
            citation: [],
            physicalDescriptionSize: [],
            boxNumber: [],
            subject: [],
          },
          fileSets: [
            {
              accessionNumber: "BFMF_B12_F15_003_008n_am_donut_01",
              exif: {
                bitsPerSample: null,
                compression: "Uncompressed",
                imageHeight: 2998,
                imageWidth: 4453,
                make: "Phase One",
                model: "IQ180",
                photometricInterpretation: "BlackIsZero",
                resolutionUnit: "inches",
                xResolution: 3000,
                yResolution: 3000,
              },
              id: "6dc2aef7-2c5d-4d22-8784-bd43d4a76830",
              label: "BFMF_B12_F15_003_008n_am.tif",
            },
          ],
          id: "ff4d07f7-1a9a-4041-958b-14a80bb0fb05",
          iiifManifest:
            "https://iiif.stack.rdc.library.northwestern.edu/public/ff/4d/07/f7/-1/a9/a-/40/41/-9/58/b-/14/a8/0b/b0/fb/05-manifest.json",
          model: {
            application: "Meadow",
            name: "Image",
          },
          modifiedDate: "2021-03-16T23:07:37.325927Z",
          project: {},
          published: true,
          representativeFileSet: {
            fileSetId: "6dc2aef7-2c5d-4d22-8784-bd43d4a76830",
            url: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/6dc2aef7-2c5d-4d22-8784-bd43d4a76830",
          },
          sheet: {},
          visibility: {
            id: "OPEN",
            label: "Public",
            scheme: "visibility",
          },
          workType: {
            id: "IMAGE",
            label: "Image",
            scheme: "work_type",
          },
        },
        {
          accessionNumber: "BFMF_B16_F02_021",
          administrativeMetadata: {
            libraryUnit: {
              id: "SPECIAL_COLLECTIONS",
              label: "Charles Deering McCormick Library of Special Collections",
              scheme: "library_unit",
            },
            preservationLevel: {
              id: "1",
              label: "Level 1",
              scheme: "preservation_level",
            },
            projectCycle: "2018",
            projectDesc: [
              "NEH grant project to digitize Berkeley Folk Festival Collection",
            ],
            projectManager: ["Nicole Finzer"],
            projectName: ["Berkeley Folk Music Festival"],
            projectProposer: ["Scott Krafft"],
            projectTaskNumber: ["P0123"],
            status: {
              id: "DONE",
              label: "Done",
              scheme: "status",
            },
          },
          batches: [],
          collection: {
            id: "18ec4c6b-192a-4ab8-9903-ea0f393c35f7",
            title: "Berkeley Folk Music Festival",
          },
          createDate: "2021-03-16T02:39:47.773042Z",
          descriptiveMetadata: {
            source: [],
            title: "Berkeley Folk Music Festival Jubilee Concert, 1963",
            scopeAndContents: [],
            notes: [],
            folderName: ["Berkeley 1963 (P. Olivier)"],
            license: null,
            rightsHolder: [],
            genre: [
              {
                displayFacet: "black-and-white photographs",
                facet:
                  "http://vocab.getty.edu/aat/300128347||black-and-white photographs|",
                role: null,
                term: {
                  id: "http://vocab.getty.edu/aat/300128347",
                  label: "black-and-white photographs",
                },
              },
            ],
            catalogKey: [],
            legacyIdentifier: [],
            alternateTitle: [],
            contributor: [
              {
                displayFacet: "Berkeley Folk Music Festival (Contributor)",
                facet:
                  "http://id.loc.gov/authorities/names/n2012053361|ctb|Berkeley Folk Music Festival (Contributor)",
                role: {
                  id: "ctb",
                  label: "Contributor",
                  scheme: "marc_relator",
                },
                term: {
                  id: "http://id.loc.gov/authorities/names/n2012053361",
                  label: "Berkeley Folk Music Festival",
                },
              },
              {
                displayFacet: "Olivier, Phillip (Photographer)",
                facet:
                  "http://id.loc.gov/authorities/names/no2018025579|pht|Olivier, Phillip (Photographer)",
                role: {
                  id: "pht",
                  label: "Photographer",
                  scheme: "marc_relator",
                },
                term: {
                  id: "http://id.loc.gov/authorities/names/no2018025579",
                  label: "Olivier, Phillip",
                },
              },
            ],
            caption: [],
            boxName: [],
            physicalDescriptionMaterial: [],
            rightsStatement: {
              id: "http://rightsstatements.org/vocab/InC/1.0/",
              label: "In Copyright",
              scheme: "rights_statement",
            },
            series: [
              "Berkeley Folk Music Festival -- 2. Festivals Photo Archive -- 2.1. Berkeley",
            ],
            tableOfContents: [],
            location: [],
            termsOfUse:
              "The images on this web site are from material in the collections of the Charles Deering McCormick Library of Special Collections of Northwestern University Libraries, and are provided for use by its students, faculty and staff, and by other researchers visiting this site, for research consultation and scholarly purposes only. Further distribution and/or any commercial use of the images from this site is not permitted.",
            identifier: ["MS 63"],
            creator: [],
            relatedMaterial: [],
            ark: "ark:/81985/n2jh3dj2r",
            relatedUrl: [],
            dateCreated: [
              {
                edtf: "1963-06-30",
                humanized: "June 30, 1963",
              },
            ],
            provenance: [],
            folderNumber: ["2"],
            keywords: [],
            description: [
              "Audience watching a performer on stage at the Greek Theatre during the 1963 Berkeley Folk Music Festival",
            ],
            language: [],
            stylePeriod: [],
            publisher: [],
            technique: [],
            abstract: [],
            citation: [],
            physicalDescriptionSize: ["8 inches (height) x 10 inches (width)"],
            boxNumber: ["16"],
            subject: [
              {
                displayFacet: "Berkeley (Calif.) (Geographical)",
                facet:
                  "http://id.loc.gov/authorities/names/n79046046|GEOGRAPHICAL|Berkeley (Calif.) (Geographical)",
                role: {
                  id: "GEOGRAPHICAL",
                  label: "Geographical",
                  scheme: "subject_role",
                },
                term: {
                  id: "http://id.loc.gov/authorities/names/n79046046",
                  label: "Berkeley (Calif.)",
                },
              },
              {
                displayFacet:
                  "William Randolph Hearst Greek Theatre (Berkeley, Calif.) (Geographical)",
                facet:
                  "http://id.loc.gov/authorities/names/n2014047648|GEOGRAPHICAL|William Randolph Hearst Greek Theatre (Berkeley, Calif.) (Geographical)",
                role: {
                  id: "GEOGRAPHICAL",
                  label: "Geographical",
                  scheme: "subject_role",
                },
                term: {
                  id: "http://id.loc.gov/authorities/names/n2014047648",
                  label:
                    "William Randolph Hearst Greek Theatre (Berkeley, Calif.)",
                },
              },
              {
                displayFacet:
                  "University of California, Berkeley (Geographical)",
                facet:
                  "http://id.loc.gov/authorities/names/n79046084|GEOGRAPHICAL|University of California, Berkeley (Geographical)",
                role: {
                  id: "GEOGRAPHICAL",
                  label: "Geographical",
                  scheme: "subject_role",
                },
                term: {
                  id: "http://id.loc.gov/authorities/names/n79046084",
                  label: "University of California, Berkeley",
                },
              },
              {
                displayFacet:
                  "Berkeley Folk Music Festival (6th : 1963 : Berkeley, Calif.) (Topical)",
                facet:
                  "http://id.loc.gov/authorities/names/no2018164233|TOPICAL|Berkeley Folk Music Festival (6th : 1963 : Berkeley, Calif.) (Topical)",
                role: {
                  id: "TOPICAL",
                  label: "Topical",
                  scheme: "subject_role",
                },
                term: {
                  id: "http://id.loc.gov/authorities/names/no2018164233",
                  label:
                    "Berkeley Folk Music Festival (6th : 1963 : Berkeley, Calif.)",
                },
              },
            ],
          },
          fileSets: [
            {
              accessionNumber: "BFMF_B16_F02_021_donut_02",
              exif: {
                bitsPerSample: "8, 8, 8",
                compression: "Uncompressed",
                imageHeight: 4011,
                imageWidth: 4217,
                make: "Phase One",
                model: "IQ180",
                photometricInterpretation: "RGB",
                planarConfiguration: "Chunky",
                resolutionUnit: "inches",
                xResolution: 400,
                yResolution: 400,
              },
              id: "bfc5e82d-20c6-48a3-9503-6d06fb6cb81f",
              label: "Verso",
            },
            {
              accessionNumber: "BFMF_B16_F02_021_donut_01",
              exif: {
                bitsPerSample: "8, 8, 8",
                compression: "Uncompressed",
                imageHeight: 3978,
                imageWidth: 4209,
                make: "Phase One",
                model: "IQ180",
                photometricInterpretation: "RGB",
                planarConfiguration: "Chunky",
                resolutionUnit: "inches",
                xResolution: 400,
                yResolution: 400,
              },
              id: "d778f9b5-eb9b-423a-abae-f7a5c8c26e2a",
              label: "Recto",
            },
          ],
          id: "5f5f23ae-8613-41f2-bc58-40215700d7d4",
          iiifManifest:
            "https://iiif.stack.rdc.library.northwestern.edu/public/5f/5f/23/ae/-8/61/3-/41/f2/-b/c5/8-/40/21/57/00/d7/d4-manifest.json",
          model: {
            application: "Meadow",
            name: "Image",
          },
          modifiedDate: "2021-03-16T02:39:54.213585Z",
          project: {},
          published: true,
          representativeFileSet: {
            fileSetId: "d778f9b5-eb9b-423a-abae-f7a5c8c26e2a",
            url: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/d778f9b5-eb9b-423a-abae-f7a5c8c26e2a",
          },
          sheet: {},
          visibility: {
            id: "OPEN",
            label: "Public",
            scheme: "visibility",
          },
          workType: {
            id: "IMAGE",
            label: "Image",
            scheme: "work_type",
          },
        },
      ])
    );
  });
}

export async function getSharedItem() {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      resolve([
        {
          _index: "shared_links",
          _type: "_doc",
          _id: "ae4ba3ed-cbf4-4aba-a3c7-c10867b3499d",
          _version: 1,
          found: true,
          _source: {
            target_index: "meadow",
            target_id: "4fcfdf52-c64f-4745-b246-fa2159c400d4",
            shared_link_id: "ae4ba3ed-cbf4-4aba-a3c7-c10867b3499d",
            expires: "2021-04-23T19:44:52.046456Z",
          },
        },
      ])
    );
  });
}
