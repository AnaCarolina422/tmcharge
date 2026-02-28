let cart = [];

document.addEventListener("DOMContentLoaded", function () {

    const basePrice = 299;
    const modelSelect = document.getElementById("model");
    const priceElement = document.getElementById("price");

    // Atualizar preço
    modelSelect.addEventListener("change", function () {
        let currentPrice = (this.value === "premium") ? basePrice + 50 : basePrice;
        priceElement.innerText = currentPrice;
    });

    // Adicionar ao carrinho
    window.addToCart = function () {

        const brand = document.getElementById("brand").value;
        const model = modelSelect.options[modelSelect.selectedIndex].text;
        const color = document.getElementById("color").value;
        const price = parseInt(priceElement.innerText);

        cart.push({ brand, model, color, price });

        renderCart();
        alert("Produto adicionado!");
    };

    function renderCart() {
        const cartContainer = document.getElementById("cart-items");
        const totalElement = document.getElementById("total");

        let total = 0;
        cartContainer.innerHTML = "";

        cart.forEach((item, index) => {
            total += item.price;

            cartContainer.innerHTML += `
                <div class="cart-item">
                    <span>${item.brand} - ${item.model} (${item.color})</span>
                    <span>
                        R$ ${item.price}
                        <button onclick="removeItem(${index})" 
                        style="background:none; border:none; color:red; cursor:pointer; margin-left:10px;">✕</button>
                    </span>
                </div>
            `;
        });

        totalElement.innerText = total;
    }

    window.removeItem = function (index) {
        cart.splice(index, 1);
        renderCart();
    };

    window.openLogin = () =>
        document.getElementById("loginModal").style.display = "flex";

    window.closeLogin = () =>
        document.getElementById("loginModal").style.display = "none";

    window.scrollToProduct = () => {
        document.getElementById("produto")
            .scrollIntoView({ behavior: "smooth" });
    };

});

// FINALIZAR COMPRA
function finalizarCompra() {

    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    localStorage.setItem("thermoCart", JSON.stringify(cart));
    window.location.href = "pagamento.html";
}