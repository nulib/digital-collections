// Font Awesome Imports
import { library } from '@fortawesome/fontawesome-svg-core';

// Reference icons here: https://fontawesome.com/how-to-use/on-the-web/using-with/react

// Import all icons used in the application here
import {
  faAngleDown,
  faAngleUp,
  faCaretDown,
  faCopy,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(faAngleDown, faAngleUp, faTimes, faCaretDown, faCopy, fab);
