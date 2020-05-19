import {
  getESDescription,
  getESImagePath,
  getESTitle,
  prepPhotoGridItems
} from "./elasticsearch-parser";
import {
  COLLECTION_MODEL,
  IIIF_MEDIUM_ITEM_REGION,
  IMAGE_MODEL
} from "./global-vars";
import placeholderImage from "../images/book_placeholder.jpg";

describe("ElasticSearch parser module", () => {
  describe("Get description function", () => {
    test("returns the right description from a source result", () => {
      const _source = {
        description: ["Description 1", "Description2"]
      };
      const emptySource = {
        accession_number: "12345",
        full_text: ["some full text"]
      };
      const value = getESDescription(_source);
      const emptyString = getESDescription(emptySource);

      expect(value).toBe("Description 1");
      expect(emptyString).toBe("No description");
    });
  });

  describe("Get image path function", () => {
    const urls = {
      representative_file_set: {
        url: "http://localhost:8183/iiif/2/file",
        file_set_id: "filesetid1"
      },
      representative_image: {
        url: "http://localhost:8183/iiif/2/image",
        work_id: "filesetid1"
      },
      thumbnail_iiif_url: "http://localhost:8183/iiif/thumbnail"
    };
    const imageModel = {
      model: { application: "Nextgen", name: "Image" }
    };
    const collectionModel = {
      model: { application: "Nextgen", name: "Collection" }
    };

    test("returns the right image path for an Image model", () => {
      const source = { ...urls, ...imageModel };
      const value = getESImagePath(source);

      expect(value).toContain(urls.representative_file_set.url);
      expect(value).toContain(IIIF_MEDIUM_ITEM_REGION);
    });

    test("returns the right image path for a Collection model", () => {
      const source = { ...urls, ...collectionModel };
      const value = getESImagePath(source);
      expect(value).toContain(urls.representative_image.url);
      expect(value).toContain(IIIF_MEDIUM_ITEM_REGION);
    });

    test("returns a placeholder image when no image file path is specified", () => {
      const source = {
        representative_file_set: {},
        representative_image: {},
        ...imageModel
      };
      const value = getESImagePath(source);

      expect(value).toContain("");
    });

    test("overrides the default IIIF image sizing region", () => {
      const source = { ...urls, ...collectionModel };
      const iiifRegion = "/test/iiif/params/default.jpg";
      const value = getESImagePath(source, iiifRegion);
      expect(value).toContain(iiifRegion);
      expect(value).not.toContain(IIIF_MEDIUM_ITEM_REGION);
    });
  });

  describe("Get title function", () => {
    const singleTitle = {
      title: "Alchemical Properties: 15 Years of Dilettantism"
    };
    const multiTitle = {
      title: {
        primary: ["Alchemical Properties: 15 Years of Dilettantism", "Title 2"]
      }
    };

    test("returns an empty string if no source supplied", () => {
      const value = getESTitle();
      expect(value).toEqual("No title exists");
    });

    test("returns a single title successfully", () => {
      const source = { ...singleTitle };
      const value = getESTitle(source);

      expect(value).toBe(singleTitle.title);
    });

    //Multiple titles is not supported

    // test("combines multiple titles successfully", () => {
    //   const source = { ...multiTitle };
    //   const value = getESTitle(source);

    //   expect(value).toBe(
    //     "Alchemical Properties: 15 Years of Dilettantism, Title 2"
    //   );
    // });
  });

  describe("Photogrid prep function", () => {
    const esResponse = [
      {
        description: ["asdf"],
        representative_file_set: {
          url: "http://localhost:8183/iiif/2",
          file_set_id: "filesetid1"
        },
        title: "Two Poster Work"
      }
    ];

    test("returns an empty array if no items are present in elastic search response", () => {
      const emptyResponse = [];
      const value = prepPhotoGridItems(emptyResponse);
      expect(value).toHaveLength(0);
    });

    test("returns all necessary items to build a photo grid", () => {
      const value = prepPhotoGridItems(esResponse, IMAGE_MODEL);
      expect(Array.isArray(value)).toBeTruthy();
      const valueObj = value[0];
      expect(valueObj).toHaveProperty("description");
      expect(valueObj).toHaveProperty("id");
      expect(valueObj).toHaveProperty("imageUrl");
      expect(valueObj).toHaveProperty("label", "Two Poster Work");
      expect(valueObj).toHaveProperty("type", IMAGE_MODEL);
    });

    test("returns the correct number of photogrid objects", () => {
      const value = prepPhotoGridItems(esResponse, IMAGE_MODEL);
      expect(value).toHaveLength(1);

      let multiResponse = [esResponse, esResponse];
      const multiValue = prepPhotoGridItems(multiResponse, IMAGE_MODEL);
      expect(multiValue).toHaveLength(2);
    });

    test("returns the right type when passed a Collection type", () => {
      const value = prepPhotoGridItems(esResponse, COLLECTION_MODEL);
      const valueObj = value[0];
      expect(valueObj).toHaveProperty("type", COLLECTION_MODEL);
    });
  });
});
