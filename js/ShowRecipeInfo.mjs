import ShowMenu from "./MainMenu.mjs";
import { convertToJson } from "./MainMenu.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function recipeDetailsTemplate(product) {
    return `<h2>${product[0].name}</h2>
    <img
    src="${product[0].image}"
    alt="${product[0].name}">
    <div class="information-area">
    <p class="product-description">${product[0].description}</p>
    <h4>Ingredients</h4>
    <ul class="ingredients"></ul>
    <h4>How to make it</h4>
    <ul class="steps"></ul>
    </div>
    <button class="add-to-favorites" data-id="${product[0]._id}">Add to favorites</button>`
}

export default class ShowRecipe {
    constructor(key, host, productId) {
        this.key = key;
        this.host = host;
        this.productId = productId;
        this.url = `https://starbucks-coffee-db2.p.rapidapi.com/api/recipes?id=${this.productId}`;
    }

    async init() {
        console.log(this.productId)
        const selector = document.querySelector(".recipe")
        const product = await this.retrieveRecipeDetails();
        this.renderRecipe(selector, product)

        //Render list of ingredients
        const ingredientList = product[0].recipeIngredient;
        const ingredientListElement = document.querySelector(".ingredients");
        for (let i = 0; i < ingredientList.length; i++) {
            const listElement = document.createElement("li");
            listElement.textContent = ingredientList[i];
            ingredientListElement.append(listElement)
        }

        //Render list of steps in recipe
        const recipeInstructions = product[0].recipeInstructions;
        const stepsListElement = document.querySelector(".steps");
        for (let i = 0; i < recipeInstructions.length; i++) {
            const listElement = document.createElement("li");
            listElement.textContent = recipeInstructions[i].text;
            stepsListElement.append(listElement)
        }

        this.addToFavorites();
    }

    async retrieveRecipeDetails() {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.key,
                'x-rapidapi-host': this.host
            }
        };

        try {
            const response = await fetch(this.url, options);
            const result = await convertToJson(response);
            console.log(result);
            return result
        } catch (error) {
            console.error(error);
        }
    }

    renderRecipe(selector, product) {
        selector.insertAdjacentHTML(
            "afterBegin",
            recipeDetailsTemplate(product))
    }

    addToFavorites() {
        const addToFavBtn = document.querySelector(".add-to-favorites");
        if (addToFavBtn) {
            addToFavBtn.addEventListener("click", function (event) {
                const productId = event.target.getAttribute("data-id");

                const productImg = document.querySelector(".recipe img").src;
                const productName = document.querySelector(".recipe h2").textContent;
                const productUrl = window.location.href;

                const favoriteItem = {
                    id: productId,
                    image: productImg,
                    name: productName,
                    url: productUrl
                };

                let favoritesArray = getLocalStorage("favorites");
                if (!Array.isArray(favoritesArray)) {
                    favoritesArray = [];
                }

                const existingProduct = favoritesArray.some(item => item.id === productId); // some() checks every element's id inside the favoritesArray array and if it is similar to the current element's id (productId), then it means the product with that id is already in the array, therefore it won't adde it:

                if (!existingProduct) { //If it does not exist, then the next lines of code are executed
                    favoritesArray.push(favoriteItem);
                    setLocalStorage("favorites", favoritesArray)
                    alert(`${productName} has been added to favorites`)
                    window.location.reload()
                } else { // If it exists, this alert is triggered
                    alert(`${productName} already exists in favorites`)
                }
                
            })
        }
       
    }

}


