import { loadHeaderFooter } from "./utils.mjs";
import { key, host } from "./config.js";
import ShowRecipe from "./ShowRecipeInfo.mjs";

loadHeaderFooter().then(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    const showRecipe = new ShowRecipe(key, host, productId);
    showRecipe.init();
});
