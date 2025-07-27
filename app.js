const navbar = document.querySelector("nav");
const sidebar = document.querySelector(".sidebar");
const menu = document.querySelector(".menu");
const cross = document.querySelector(".cross");

menu.addEventListener("click", () => {
  navbar.style.display = "none";
  sidebar.style.display = "flex";
});

cross.addEventListener("click", () => {
  navbar.style.display = "flex";
  sidebar.style.display = "none";
});

const cartItems = [];
const cartButtons = document.querySelectorAll(".cart");

cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest(".product");
    const name = product.querySelector("a").textContent;
    const priceText = product.querySelector("p").textContent;
    const price = parseFloat(priceText.replace(/[^\d.]/g, ""));

    cartItems.push({ name, price });
    updateCartDisplay();
  });
});

function updateCartDisplay() {
  let cartDisplay = document.querySelector("#cart-display");

  if (!cartDisplay) {
    cartDisplay = document.createElement("div");
    cartDisplay.id = "cart-display";
    cartDisplay.style.position = "fixed";
    cartDisplay.style.top = "4rem";
    cartDisplay.style.right = "0";
    cartDisplay.style.background = "#fff";
    cartDisplay.style.padding = "1rem";
    cartDisplay.style.borderRadius = "1rem";
    cartDisplay.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
    cartDisplay.style.zIndex = "1000";
    cartDisplay.style.maxHeight = "100vh";
    cartDisplay.style.overflowY = "auto";
    cartDisplay.style.width = "300px";
    document.body.appendChild(cartDisplay);

    const closeBtn = document.createElement("span");
    closeBtn.textContent = "×";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "0.5rem";
    closeBtn.style.right = "1rem";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.fontSize = "1.5rem";
    closeBtn.style.fontWeight = "bold";
    closeBtn.onclick = () => cartDisplay.remove();
    cartDisplay.appendChild(closeBtn);

    const cartText = document.createElement("div");
    cartText.id = "cart-text";
    cartDisplay.appendChild(cartText);

    const CheckoutBtn = document.createElement("button");
    CheckoutBtn.textContent = "Checkout";
    CheckoutBtn.id = "Checkout";
    CheckoutBtn.style.height = "2.3rem";
    CheckoutBtn.style.width = "8rem";
    CheckoutBtn.style.marginTop = "1rem";
    CheckoutBtn.style.backgroundColor = "#5db73d";
    CheckoutBtn.style.outline = "none";
    CheckoutBtn.style.borderRadius = "0.9rem";
    CheckoutBtn.style.border = "none";
    CheckoutBtn.style.color = "#fff0ff";
    CheckoutBtn.style.fontSize = "1.1rem";
    CheckoutBtn.style.fontWeight = "600";
    CheckoutBtn.addEventListener("click", showAddressForm);
    cartDisplay.appendChild(CheckoutBtn);
  }

  const cartText = document.querySelector("#cart-text");
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  cartText.innerHTML = `
        <strong>🛒 Cart Summary</strong><br>
        ${cartItems
          .map((item) => `${item.name} - $${item.price.toFixed(2)}`)
          .join("<br>")}
        <br><br><strong>Total: $${total.toFixed(2)}</strong>
    `;
}

function showAddressForm() {
  const formContainer = document.createElement("div");
  formContainer.id = "form-container";
  formContainer.style.position = "fixed";
  formContainer.style.top = "0";
  formContainer.style.left = "0";
  formContainer.style.width = "100vw";
  formContainer.style.height = "100vh";
  formContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  formContainer.style.display = "flex";
  formContainer.style.alignItems = "center";
  formContainer.style.justifyContent = "center";
  formContainer.style.zIndex = "2000";

  formContainer.innerHTML = `
        <form id="address-form" style="background:white;padding:2rem;border-radius:1rem;max-width:400px;width:90%;">
            <h2>Enter Delivery Address</h2>
            <label>Name:</label><br>
            <input type="text" required style="width:100%;padding:0.5rem;"><br><br>
            <label>Phone:</label><br>
            <input type="tel" required style="width:100%;padding:0.5rem;"><br><br>
            <label>Address:</label><br>
            <textarea required style="width:100%;padding:0.5rem;"></textarea><br><br>
            <button type="submit" style="background-color:#28a745;color:white;padding:0.6rem 1rem;border:none;border-radius:0.5rem;">Proceed to Payment</button>
        </form>
    `;

  document.body.appendChild(formContainer);

  document
    .getElementById("address-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      showPaymentOptions(formContainer);
    });
}

function showPaymentOptions(container) {
  container.innerHTML = `
        <div style="background:white;padding:2rem;border-radius:1rem;max-width:400px;width:90%;text-align:center;">
            <h2>Select Payment Method</h2>
            <button onclick="showUPIForm()" style="margin: 1rem; padding:0.6rem 1rem;background-color:#007bff;color:white;border:none;border-radius:0.5rem;">UPI</button>
            <button onclick="showCardForm()" style="margin: 1rem; padding:0.6rem 1rem;background-color:#28a745;color:white;border:none;border-radius:0.5rem;">Card</button>
            <button onclick="placeOrder()" style="margin: 1rem; padding:0.6rem 1rem;background-color:#ffc107;color:black;border:none;border-radius:0.5rem;">Cash on Delivery</button>
        </div>
    `;
}

function showUPIForm() {
  const container = document.getElementById("form-container");
  container.innerHTML = `
        <form onsubmit="event.preventDefault(); placeOrder();" style="background:white;padding:2rem;border-radius:1rem;max-width:400px;width:90%;">
            <h2>Enter UPI ID</h2>
            <input type="text" placeholder="yourupi@bank" required style="width:100%;padding:0.5rem;"><br><br>
            <button type="submit" style="background-color:#007bff;color:white;padding:0.6rem 1rem;border:none;border-radius:0.5rem;">Pay & Place Order</button>
        </form>
    `;
}

function showCardForm() {
  const container = document.getElementById("form-container");
  container.innerHTML = `
        <form onsubmit="event.preventDefault(); placeOrder();" style="background:white;padding:2rem;border-radius:1rem;max-width:400px;width:90%;">
            <h2>Card Payment</h2>
            <input type="text" placeholder="Card Number" required style="width:100%;padding:0.5rem;"><br><br>
            <input type="text" placeholder="Expiry MM/YY" required style="width:100%;padding:0.5rem;"><br><br>
            <input type="text" placeholder="CVV" required style="width:100%;padding:0.5rem;"><br><br>
            <button type="submit" style="background-color:#28a745;color:white;padding:0.6rem 1rem;border:none;border-radius:0.5rem;">Pay & Place Order</button>
        </form>
    `;
}

function placeOrder() {
  const container = document.getElementById("form-container");
  container.innerHTML = `
        <div style="background:white;padding:2rem;border-radius:1rem;max-width:400px;width:90%;text-align:center;">
            <h2>✅ Order Placed Successfully!</h2>
            <p>Thank you for shopping with SellSmart!</p>
            <button onclick="document.getElementById('form-container').remove()" style="margin-top:1rem;padding:0.6rem 1rem;background-color:#5db73d;color:white;border:none;border-radius:0.5rem;">Close</button>
        </div>
    `;
}

fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
      let scrollY = window.pageYOffset;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(sectionId)) {
              link.classList.add("active");
            }
          });
        }
      });
    });
  });
