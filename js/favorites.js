import { loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

loadHeaderFooter().then(() => {
    console.log(getLocalStorage("favorites"))
});
