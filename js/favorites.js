import { loadHeaderFooter } from "../js/utils.mjs";
import { getLocalStorage } from "../js/utils.mjs";

loadHeaderFooter().then(() => {
    console.log(getLocalStorage("favorites"))
});
