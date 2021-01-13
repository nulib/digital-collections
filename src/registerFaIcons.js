import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArrowCircleLeft,
  faArrowCircleRight,
  faCaretDown,
  faCode,
  faCopy,
  faDownload,
  faExclamationTriangle,
  faExpand,
  faFileCode,
  faImage,
  faImages,
  faSearchMinus,
  faSearchPlus,
  faTimes,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

export default function registerIcons() {
  library.add(
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faArrowCircleLeft,
    faArrowCircleRight,
    faCaretDown,
    faCode,
    faCopy,
    faDownload,
    faExclamationTriangle,
    faExpand,
    faFileCode,
    faImage,
    faImages,
    faSearchMinus,
    faSearchPlus,
    faTimes,
    faTv
  );
}
