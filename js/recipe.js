import { loadHeaderFooter } from "../js/utils.mjs";
import { key, host } from "../js/config.js";
import ShowRecipe from "../js/ShowRecipeInfo.mjs";

loadHeaderFooter().then(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    const showRecipe = new ShowRecipe(key, host, productId);
    showRecipe.init();
});
