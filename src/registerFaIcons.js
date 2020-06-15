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
  faExpand,
  faFileCode,
  faImage,
  faSearchMinus,
  faSearchPlus,
  faTimes
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
    faExpand,
    faFileCode,
    faImage,
    faSearchMinus,
    faSearchPlus,
    faTimes
  );
}
