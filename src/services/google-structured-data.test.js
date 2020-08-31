import * as gsd from "./google-structured-data";

const mockObj = {
  description: ["description here"],
  title: {
    primary: ["Title 1", "Title2"],
  },
  thumbnail_iiif_url: "http://here.com",
};
const pathName = "https://nu.com";

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
    const obj = gsd.loadCollectionStructuredData(mockObj, pathName);
    expect(obj["@type"]).toEqual("Collection");
    expect(obj).toHaveProperty("@context");
    expect(obj).toHaveProperty("name");
    expect(obj).toHaveProperty("description");
    expect(obj).toHaveProperty("url");
    expect(obj).toHaveProperty("thumbnail");
  });

  it("does not add empty values", () => {
    let anotherMock = { ...mockObj };
    delete anotherMock.description;
    const obj = gsd.loadCollectionStructuredData(anotherMock, pathName);
    expect(obj).not.toHaveProperty("description");
  });
});

describe("work structured data", () => {
  let anotherMock = {
    creator: [{ label: "john" }],
    contributor: [{ label: "bob" }, { label: "Rush, Otis" }],
    iiif_manifest:
      "https://iiif.stack.rdc.library.northwestern.edu/public/c7/86/33/6b",
    representative_file_url: "http://location.com/xyz",
    thumbnail_url:
      "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/fe%2F1c%2F30%2F0",
    subject: [{ label: "Smith, John" }, { label: "Ben" }],
    ...mockObj,
  };
  it("returns the expected work structured data ", () => {
    const obj = gsd.loadItemStructuredData(anotherMock, pathName);

    expect(obj["@type"]).toEqual("ImageObject");
    expect(obj).toHaveProperty("@context");
    expect(obj).toHaveProperty("name");
    expect(obj).toHaveProperty("contentUrl");
    expect(obj).toHaveProperty("image");
    expect(obj).toHaveProperty("thumbnail");
    expect(obj).toHaveProperty("url");
  });

  it("returns a quoted value when a comma is present in a metadata value", () => {
    const obj = gsd.loadItemStructuredData(anotherMock, pathName);
    expect(obj.contributor).toContain("Rush, Otis");

    anotherMock.contributor = [{ label: "Smith John" }, { label: "Ben" }];
    const obj2 = gsd.loadItemStructuredData(anotherMock, pathName);
    expect(obj2.contributor).toContain("Smith John");
    expect(obj2.contributor).not.toContain('"Smith, John"');
  });
});
