let itemsSection = document.getElementById("items")

fetch("http://localhost:3000/api/products")
.then(res => res.json())
.then(json => {
    console.log(json)
    json.forEach(element => {
        // Creation des éléments
        let product = document.createElement("a")
        let productArticle = document.createElement("article")
        let productImage = document.createElement("img")
        let productH3 = document.createElement("h3")
        let productP = document.createElement("p")
        // Setup des classes pour le CSS
        productH3.className = "productName"
        productP.className = "productDescription"
        // Setup des attributs
        product.href = "./product.html?id=" + element._id
        productImage.src = element.imageUrl
        productImage.alt = element.altTxt
        // Setup des textes
        productH3.innerHTML = element.name
        productP.innerHTML = element.description
        // Mise en page
        productArticle.appendChild(productImage)
        productArticle.appendChild(productH3)
        productArticle.appendChild(productP)
        product.appendChild(productArticle)
        itemsSection.appendChild(product)
    });
})