import "@testing-library/jest-dom/extend-expect";
import "jest-canvas-mock";

import registerFaIcons from "./registerFaIcons";
registerFaIcons();

jest.mock("api/elasticsearch-api.js");
