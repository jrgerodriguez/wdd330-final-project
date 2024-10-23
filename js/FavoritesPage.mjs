import { renderListWithTemplate } from "./utils.mjs";
import { convertToJson } from "./MainMenu.mjs";
import ShowMenu from "./MainMenu.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const url = 'https://starbucks-coffee-db2.p.rapidapi.com/api/recipes';

function favoriteCardTemplate(product) {
    return `
        <li class="product-card" data-id="${product.id}">
            <div>
                <img src="${product.image}" alt="Image of ${product.name}">
                <p class="card__brand">${product.name}</p>
                <div class="button-area">
                    <a href="product_info.html?product=${product.id}">
                        <button class="btn">See Recipe</button>
                    </a>
                    <button class="btn remove-item" data-id="${product.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                         class="icon icon-tabler icon-tabler-trash-x-filled" 
                         width="15" height="15" viewBox="0 0 24 24" 
                         stroke-width="1.5" stroke="#2c3e50" 
                         fill="none" stroke-linecap="round" 
                         stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" 
                              stroke-width="0" fill="currentColor" />
                        <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" 
                              stroke-width="0" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    `;
}

export default class RenderFavorites {
    init() {
        this.renderFavorites();
        this.removeItem();
    }

    renderFavorites() {
        const currentFavorites = getLocalStorage("favorites")
        console.log(currentFavorites)

        const favoritesListElement = document.querySelector(".product-list")
        for (let i = 0; i < currentFavorites.length; i++) {
            favoritesListElement.insertAdjacentHTML("afterbegin", favoriteCardTemplate(currentFavorites[i]))
        }
    }

    removeItem() {
        const removeItemBtns = document.querySelectorAll(".remove-item");
        removeItemBtns.forEach(removeItemBtn => {
            removeItemBtn.addEventListener("click", function (event) {
                const productId = this.getAttribute("data-id"); // by using this, it takes the complete element that triggered the event 
                let favoritesArray = getLocalStorage("favorites");

                const updatedFavoritesArray = favoritesArray.filter(item => item.id !== productId);

                if (favoritesArray.length !== updatedFavoritesArray.length) {
                    setLocalStorage("favorites", updatedFavoritesArray);
                    event.target.closest("li").remove();
                }
            });
        });
        
    }
}