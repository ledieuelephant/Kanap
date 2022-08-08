if (localStorage.getItem("cart") === null) {
    console.log("There is no article")
    document.getElementById("totalQuantity").innerHTML = "0"
    document.getElementById("totalPrice").innerHTML = "0"
}
else {
    let cartItems = document.getElementById("cart__items")
    let cart = JSON.parse(localStorage.getItem("cart"))
    let totalQte = 0
    let totalPrice = 0
    var productsIDS = []
    cart.forEach(async product => {
        await fetch("http://localhost:3000/api/products/"+product.id)
        .then(res => res.json())
        .then(json => {
           /*  productsIDS.push(product.id) */
            // Creation des éléments
            let article = document.createElement("article")
            /* IMG */
            let itemImg = document.createElement("div")
            let Img = document.createElement("img")
            /* Contenu produit */
            let content = document.createElement("div")
            /* Description */
            let contentDescription = document.createElement("div")
            let nomProduit = document.createElement("h2")
            let couleurProduit = document.createElement("p")
            let prixProduit = document.createElement("p")
            /* Settings */
            let settings = document.createElement("div")
            let settingQuantity = document.createElement("div")
            let qte = document.createElement("p")
            let inputQte = document.createElement("input")
            /* Delete */
            let settingDelete = document.createElement("div")
            let deleteItem = document.createElement("p")

            // Setup des classes
            article.className = "cart__item"
            itemImg.className = "cart__item__img"
            content.className = "cart__item__content"
            contentDescription.className = "cart__item__content__description"
            settings.className = "cart__item__content__settings"
            settingQuantity.className = "cart__item__content__settings__quantity"
            inputQte.className = "itemQuantity"
            settingDelete.className = "cart__item__content__settings_delete"
            deleteItem.className = "deleteItem"

            // Setup des attribut
            article.setAttribute("data-id", json._id)
            article.setAttribute("data-color", product.color)
            Img.src = json.imageUrl
            Img.alt = json.altTxt
            inputQte.type = "number"
            inputQte.name = "itemQuantity"
            inputQte.min = "1"
            inputQte.max = "100"
            inputQte.value = product.qte

            // Setup des textes
            nomProduit.innerHTML = json.name
            couleurProduit.innerHTML = product.color
            prixProduit.innerHTML = json.price + " €"

            qte.innerHTML = "Qté : "
            deleteItem.innerHTML = "Supprimer"

            // Mise en page
            article.appendChild(itemImg)
            article.appendChild(content)

            itemImg.appendChild(Img)

            content.appendChild(contentDescription)
            content.appendChild(settings)

            contentDescription.appendChild(nomProduit)
            contentDescription.appendChild(prixProduit)
            contentDescription.appendChild(couleurProduit)

            settings.appendChild(settingDelete)
            settingDelete.appendChild(settingQuantity)
            settingQuantity.appendChild(qte)
            settingQuantity.appendChild(inputQte)
            settingDelete.appendChild(deleteItem)

            cartItems.appendChild(article)

            var productPrice = json.price * parseInt(product.qte)
            totalPrice = totalPrice + productPrice
            totalQte = totalQte + parseInt(product.qte)
            
            deleteItem.onclick = function(){
                let mycart = JSON.parse(localStorage.getItem("cart"))
                let deleteProduct = mycart.filter(myproduct => myproduct.id !== product.id)
                localStorage.setItem("cart", JSON.stringify(deleteProduct))
                document.location.reload(true)
            }

            inputQte.onchange = function(e){
                // recupere le panier
                let mycart = JSON.parse(localStorage.getItem("cart"))
                // Je recherche le bon item
                let changeItem = mycart.find(myproduct => myproduct.id == product.id)
                // je le change
                let newItem = {
                    ...changeItem,
                    qte : e.target.value
                }
                mycart[mycart.indexOf(changeItem)] = newItem
                // Je le remplace dans le localstorage
                localStorage.setItem("cart", JSON.stringify(mycart))
                // Change totalQte + totalPrice
                totalQte = 0
                totalPrice = 0
                mycart.forEach(product1 => {
                    fetch("http://localhost:3000/api/products/"+product1.id)
                    .then(response => response.json())
                    .then(json1 => {
                        var product1price = json1.price * parseInt(product1.qte)
                        totalPrice = totalPrice + product1price
                        totalQte = totalQte + parseInt(product1.qte)
                        document.getElementById("totalQuantity").innerHTML = totalQte
                        document.getElementById("totalPrice").innerHTML = totalPrice
                    })
                })

            }
        })
    });
    setTimeout(() => {
        document.getElementById("totalQuantity").innerHTML = totalQte
        document.getElementById("totalPrice").innerHTML = totalPrice
    }, 1000)



    // verif panier vide (Verif localstorage = alert)

    var firstName = false;
    var lastName = false;
    var address = false;
    var city = false;
    var email = false;

    var nameRGEX = /([A-Z]|[a-z]){2,}\w+/g
    var firstNameRGEX = /([A-Z]|[a-z]){2,}\w+/g
    
    // Verification First Name
    document.getElementById("firstName").onchange = function(e){
        if (firstNameRGEX.test(e.target.value) == false) {
            document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez entrée votre prénom"
            firstName = false
        } else {
            document.getElementById("firstNameErrorMsg").innerHTML = ""
                firstName = true
        }
    }

    // Verification Last Name
    document.getElementById("lastName").onchange = function(e){
        if (nameRGEX.test(e.target.value) == false) {
            document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez entrée votre prénom"
            lastName = false
        } else {
            document.getElementById("lastNameErrorMsg").innerHTML = ""
            lastName = true
        }
    }

    // Verification Address
    document.getElementById("address").onchange = function(e){
        if (e.target.value == "") {
            document.getElementById("addressErrorMsg").innerHTML = "Veuillez entrée votre adresse"
        } else {
            document.getElementById("addressErrorMsg").innerHTML = ""
            address = true
        }
    }

    document.getElementById("city").onchange = function(e){
        if (e.target.value == "") {
            document.getElementById("cityErrorMsg").innerHTML = "Veuillez entrée votre ville"
        } else {
            document.getElementById("cityErrorMsg").innerHTML = ""
            city = true
        }
    }

    document.getElementById("email").onchange = function(e){
        if (e.target.value == "") {
            document.getElementById("emailErrorMsg").innerHTML = "Veuillez entrée un email"
        } 
        else if (e.target.value.includes("@") === false || e.target.value.includes(".") === false) {
            document.getElementById("emailErrorMsg").innerHTML = "Veuillez entrée un email"
        }
        else {
            document.getElementById("emailErrorMsg").innerHTML = ""
            email = true
        }
    }

    document.getElementById("order").onclick = function(e){ // Verif chiffre nom prenom min 3 caractere
        if (localStorage.getItem("cart") === null) {
            alert("Vous devez avoir un produit dans le panier")
        }
        else {
            if (firstName && lastName && address && city && email) {
                        e.preventDefault()
                        var panierFinal = JSON.parse(localStorage.getItem("cart"))
                        panierFinal.forEach(produit => {
                            productsIDS.push(produit.id)
                        })
                        fetch("http://localhost:3000/api/products/order", {
                            method : "POST",
                            headers: {
                                'Content-Type': 'application/json'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body : JSON.stringify(
                                {
                                    contact : {
                                        firstName : document.getElementById("firstName").value,
                                        lastName : document.getElementById("lastName").value,
                                        address : document.getElementById("address").value,
                                        city : document.getElementById("city").value,
                                        email : document.getElementById("email").value
                                    },
                                    products : productsIDS
                                }
                            )
                        })
                        .then(res => res.json())
                        .then(json => {
                            alert("Merci pour votre achat")
                            localStorage.removeItem("cart")
                            document.location.href = `./confirmation.html?orderID=${json.orderId}`
                        })
                    }
            else {
                console.log("Erreur 1")
            }
        }
    }

    
}