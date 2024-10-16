import { loadHeaderFooter } from "../js/utils.mjs";
import ShowMenu from "../js/MainMenu.mjs";
import { key, host } from "../js/config.js";

loadHeaderFooter();
const showMenu = new ShowMenu(key,host, document.querySelector(".product-list"),);
    showMenu.init();