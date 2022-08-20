import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faListCheck,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
  faPlus,
  faDeleteLeft,
} from '@fortawesome/free-solid-svg-icons';

const icons = {
  faHome,
  faListCheck,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faPlus,
  faDeleteLeft,
};

library.add({ ...icons });
export default FontAwesomeIcon;
