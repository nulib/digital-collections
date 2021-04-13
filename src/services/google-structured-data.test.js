import * as gsd from "./google-structured-data";
import { mockWork2 } from "testing-helpers/mock-work2";

const collectionMock = {
  adminEmail: null,
  createDate: "2021-02-26T22:20:24.303996Z",
  description:
    "The Berkeley Folk Music Festival Archive consists of over 32,000 items, including photographs of folk artists and groups, press clippings, correspondence, publicity information, and posters and flyers. Also included here are photographs and posters from other area music festivals. A few audio recordings from the Archive can be found here (copy and paste link): http://libraries.nu/FolkFestivalAudio",
  featured: false,
  findingAidUrl: null,
  id: "18ec4c6b-192a-4ab8-9903-ea0f393c35f7",
  keywords: ["featured"],
  model: { application: "Meadow", name: "Collection" },
  modifiedDate: "2021-03-09T16:17:41.421273Z",
  published: true,
  representativeImage: {
    url:
      "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/c0d39641-cedb-4213-aaa0-568b586d27b8",
    workId: "0755cad4-4dd2-4df3-a702-664fb39885ba",
  },
  title: "Berkeley Folk Music Festival",
  visibility: { id: "OPEN", label: "Public", scheme: "visibility" },
};
const pathName = "/ima/path";

it("returns the expected default structured data ", () => {
  const obj = gsd.loadDefaultStructuredData();
  expect(Object.keys(obj).length).toBeGreaterThan(0);
  expect(obj["@type"]).toEqual("WebSite");
  expect(obj).toHaveProperty("@context");
  expect(obj).toHaveProperty("name");
  expect(obj).toHaveProperty("description");
  expect(obj).toHaveProperty("url");
});

describe("collection structured data", () => {
  it("returns the expected collection structured data ", () => {
    const obj = gsd.loadCollectionStructuredData(collectionMock, pathName);
    expect(obj["@type"]).toEqual("Collection");
    expect(obj).toHaveProperty("@context");
    expect(obj).toHaveProperty("name");
    expect(obj).toHaveProperty("description");
    expect(obj).toHaveProperty("url");
    expect(obj).toHaveProperty("thumbnail");
  });

  it("does not add empty values", () => {
    let anotherMock = { ...collectionMock };
    delete anotherMock.description;
    const obj = gsd.loadCollectionStructuredData(anotherMock, pathName);
    expect(obj).not.toHaveProperty("description");
  });
});

describe("work structured data", () => {
  it("returns the expected work structured data ", () => {
    const obj = gsd.loadItemStructuredData(mockWork2, pathName);

    expect(obj["@type"]).toEqual("ImageObject");
    expect(obj).toHaveProperty("@context");
    expect(obj.about).toEqual(["Watson, Doc", "Watson, Merle"]);
    expect(obj.contentLocation).toEqual("");
    expect(obj.contentUrl).toEqual(
      "https://iiif.stack.rdc-staging.library.northwestern.edu/public/63/bd/ab/1f/-3/6c/f-/4e/65/-b/30/f-/41/62/68/4e/f9/80-manifest.json"
    );
    expect(obj.contributor).toEqual('"Olivier, Barry, 1935-"');
    expect(obj.dateCreated[0]).toEqual("September 17, 1968");
    expect(obj.description).toEqual(
      "Doc Watson and Merle Watson (holding guitar). Digital image scanned from black and white negative."
    );
    expect(obj.genre[0]).toEqual("black-and-white negatives");
    expect(obj.image).toEqual(
      "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/069f462e-935d-4e75-a131-28fb95751da2"
    );
    expect(obj.license).toEqual("http://rightsstatements.org/vocab/InC/1.0/");
    expect(obj.name).toEqual("Doc and Merle Watson");
    expect(obj.thumbnail).toEqual(
      "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/069f462e-935d-4e75-a131-28fb95751da2"
    );
    expect(obj.url).toEqual(
      "https://digitalcollections.library.northwestern.edu/ima/path"
    );
  });

  it("returns a quoted value when a comma is present in a metadata value", () => {
    const obj = gsd.loadItemStructuredData(mockWork2, pathName);
    expect(obj.contributor).toContain("Olivier, Barry, 1935-");

    mockWork2.descriptiveMetadata.contributor = [
      ...mockWork2.descriptiveMetadata.contributor,
      {
        displayFacet: "Betty Boop (Model)",
        facet:
          "http://id.loc.gov/authorities/names/no2017159756|pht|Olivier, Barry, 1935- (Photographer)",
        role: { id: "pht", label: "Model", scheme: "marc_relator" },
        term: {
          id: "http://id.loc.gov/authorities/names/no2017159756",
          label: "Boop, Betty",
        },
      },
    ];
    const obj2 = gsd.loadItemStructuredData(mockWork2, pathName);
    expect(obj2.contributor).toContain('"Boop, Betty"');
  });
});
