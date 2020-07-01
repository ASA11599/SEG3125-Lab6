const leftArrowElement = document.getElementById("leftArrow");
const rightArrowElement = document.getElementById("rightArrow");

const imageElement = document.getElementById("websiteImage");

const imageNumber = document.getElementById("imgNumber");

const imageLink = document.getElementById("imgLink");

const images = {
    // Paths relative to index.html
    "./assets/amazon_main.png": "https://www.amazon.ca/",
    "./assets/amazon_cart.png": "https://www.amazon.ca/gp/cart/view.html",
    "./assets/amazon_help.png": "https://www.amazon.ca/gp/help/customer/display.html"
};

leftArrowElement.onclick = rightArrowElement.onclick = (ev) => {
    let i = parseInt(imageNumber.innerText) - 1;
    if (ev["target"]["id"] === "rightArrow") {
        i = i + 1;
        if (i >= Object.keys(images).length) i = 0;
    } else if (ev["target"]["id"] === "leftArrow") {
        i = i - 1;
        if (i < 0) i = Object.keys(images).length - 1;
    } else console.error("Invalid ID for carousel arrow");
    imageElement.attributes["src"]["value"] = Object.keys(images)[i];
    imageLink.attributes["href"]["value"] = images[Object.keys(images)[i]];
    imageNumber.innerText = i + 1;
};
