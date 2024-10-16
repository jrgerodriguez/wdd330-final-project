import { loadHeaderFooter } from "./utils.mjs";
import ShowMenu from "./MainMenu.mjs";
import { key, host } from "./config.js";

loadHeaderFooter();
const showMenu = new ShowMenu(key, host, document.querySelector(".product-list"),);
showMenu.init();
console.log("I am working")