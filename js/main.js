import { loadHeaderFooterIndex } from "../js/utils.mjs";
import ShowMenu from "../js/MainMenu.mjs";
import { key, host } from "../js/config.js";

loadHeaderFooterIndex();
const showMenu = new ShowMenu(key,host, document.querySelector(".product-list"),);
    showMenu.init();