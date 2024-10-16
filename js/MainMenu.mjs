import { renderListWithTemplate } from "./utils.mjs";

const url = 'https://starbucks-coffee-db2.p.rapidapi.com/api/recipes';

function productCardTemplate(product) {
    return `
              <a href="product_info_pages/index.html?product=${product._id}" class="product-link product-card" data-id="${product._id}">
              <li class="">
                <img src="${product.image}" alt="Image of ${product.name}">
                <p class="card__brand">${product.name}</p>
                </li>
              </a>
            `;
}

export function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export default class ShowMenu {

    constructor(key, host, listElement) {
        this.key = key;
        this.host = host;
        this.listElement = listElement;
        this.init();
    }

    async init() {
        await this.getData();
    }

    async getData() {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.key,
                'x-rapidapi-host': this.host
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await convertToJson(response);

            const productsToRender = result.slice(0, 24); //Limit the products to 20
            this.renderList(productsToRender);
            this.getProductId();

        } catch (error) {
            console.error(error);
        }
    }

    renderList(products) {

        if (!Array.isArray(products)) {
            console.error("Expected an array of products");
            return;
        }

        this.listElement.innerHTML = '';

        // generate the list of products and insert them into the DOM
        renderListWithTemplate(productCardTemplate, this.listElement, products, "afterbegin", false);
    }

    getProductId() {
        const links = document.querySelectorAll(".product-link");
        links.forEach(link => {
            link.addEventListener("click", (event) => {
                const target = event.target.closest('.product-link');
                if (target) {
                    const productId = target.getAttribute("data-id");
                    console.log('Product ID:', productId);
                }
            });
        });
    }

}








