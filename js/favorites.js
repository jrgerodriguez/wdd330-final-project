import { loadHeaderFooter } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import RenderFavorites from "./FavoritesPage.mjs";

loadHeaderFooter().then(() => {
    const renderFavorites = new RenderFavorites();
    renderFavorites.init();
});


