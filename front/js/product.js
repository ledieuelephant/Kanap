let image = document.getElementsByClassName("item__img")[0]
let id = new URLSearchParams(window.location.search).get("id")

fetch("http://localhost:3000/api/products/"+id)
.then(res => res.json())
.then(json => {
    let productImage = document.createElement("img")
    productImage.src = json.imageUrl
    image.appendChild(productImage)
    document.getElementById("title").innerHTML = json.name
    document.getElementById("price").innerHTML = json.price
    document.getElementById("description").innerHTML = json.description
    var colors = document.getElementById("colors")
    json.colors.map(color => {
        let newColor = document.createElement("option")
        newColor.value = color
        newColor.innerHTML = color
        colors.appendChild(newColor)
    })
})

let addCart = document.getElementById("addToCart")
addCart.onclick = function(){
    fetch("http://localhost:3000/api/products/"+id)
    .then(res => res.json())
    .then(json => {
        var item = {
            productId : json._id,
            color : document.getElementById("colors").value,
            qte : document.getElementById("quantity").value
        }
        var old = localStorage.getItem("cart")
        if (old === null) {
            var oldJSON = []
        } else {
            var oldJSON = JSON.parse(old)
        }
        oldJSON.push(item)
        localStorage.setItem("cart", JSON.stringify(oldJSON))
    })

    if (document.getElementById("colors").value === "") {
        alert("Veuillez choisir une couleur")
    }
    if (document.getElementById("quantity").value == 0) {
        alert("Veuillez sélectionner un nombre d'article")
    }
}

