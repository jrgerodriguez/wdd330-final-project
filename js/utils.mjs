export function renderWithTemplate(template, parent, data, callback) {
    parent.insertAdjacentHTML("afterbegin", template);
    if (callback) {
        callback(data);
    }
}

export async function loadTemplate(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error("Unable to fetch");
        }
        const html = await response.text();
        const template = document.createElement('template');
        template.innerHTML = html;
        return template;
    } catch (err) {
        console.error(err);
    }
}

export async function loadHeaderFooter() {
    const headerContent = await loadTemplate("header.html");
    const footerContent = await loadTemplate("footer.html");
    const headerElement = document.querySelector("#dynamic-header");
    const footerElement = document.querySelector("#dynamic-footer");
    renderWithTemplate(headerContent.innerHTML, headerElement);
    renderWithTemplate(footerContent.innerHTML, footerElement);

    const currentFavorites = getLocalStorage("favorites")

    // const itemInFavIcon = document.querySelector(".item-in-fav");
    //     if (currentFavorites.length != 0) {
    //         itemInFavIcon.style.display = "block";
    //     }
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
    const htmlStrings = list.map(templateFn);
    if (clear) {
        parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}