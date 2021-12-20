import "@testing-library/jest-dom";
import "jest-canvas-mock";

import registerFaIcons from "./registerFaIcons";
registerFaIcons();

jest.mock("api/elasticsearch-api.js");
