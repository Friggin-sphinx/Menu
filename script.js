import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

import {
  onSnapshot,
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  setDoc,
  // addDoc
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAnRxiO_WsLK5qFsxX9dhqqbdsUpfwzbpc",
  authDomain: "jeswin-9d2c9.firebaseapp.com",
  projectId: "jeswin-9d2c9",
  storageBucket: "jeswin-9d2c9.appspot.com",
  messagingSenderId: "922234769222",
  appId: "1:922234769222:web:2b07698876c00db9dadf47",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get all the category pills
const categoryPills = document.querySelectorAll(".category-pill");

// Get all the menu item cards
const menuItemCards = document.querySelectorAll(".menu-item-card");

// Get all the increment and decrement buttons
const incrementBtns = document.querySelectorAll(".increment-btn");
const decrementBtns = document.querySelectorAll(".decrement-btn");

// Add event listeners to the category pills
categoryPills.forEach((pill, index) => {
  pill.addEventListener("click", () => {
    // Remove the active class from all pills
    categoryPills.forEach((p) => p.classList.remove("active"));

    // Add the active class to the clicked pill
    pill.classList.add("active");

    // Hide all menu item cards
    menuItemCards.forEach((card) => (card.style.display = "none"));

    // Show the menu item cards based on the clicked category
    const cardsToShow = document.querySelectorAll(
      `.menu-item-card.category-${index}`
    );
    cardsToShow.forEach((card) => (card.style.display = "block"));
  });
});

// Add event listeners to the increment and decrement buttons
incrementBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const quantityElement = e.target.previousElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
    e.target.previousElementSibling.previousElementSibling.style.display =
      "inline";
  });
});

decrementBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const quantityElement = e.target.nextElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
      quantity--;
      quantityElement.textContent = quantity;
    }
    if (quantity === 0) {
      e.target.style.display = "none";
    }
  });
});

// Add event listeners to the order and checkout buttons
const orderBtn = document.querySelector(".order-btn");
const checkoutBtn = document.querySelector(".checkout-btn");

orderBtn.addEventListener("click", () => {
  // Implement your order logic here
  console.log("Order button clicked");
});

checkoutBtn.addEventListener("click", () => {
  // Implement your checkout logic here
  console.log("Checkout button clicked");
});

// Function to generate the order summary
function generateOrderSummary() {
  const orderSummary = document.getElementById("order-summary");
  orderSummary.innerHTML = ""; // Clear previous content

  // Loop through each menu item card to get the selected quantities
  menuItemCards.forEach((card) => {
    const itemName = card.querySelector(".menu-item-name").textContent;
    const quantity = parseInt(card.querySelector(".quantity").textContent);

    if (quantity > 0) {
      const itemPrice = parseInt(
        card.querySelector(".menu-item-price").textContent.replace("₹", "")
      );
      const totalItemPrice = itemPrice * quantity;

      // Create a summary entry for the current item
      const summaryEntry = document.createElement("p");
      summaryEntry.textContent = `${itemName}: ₹${totalItemPrice} (${quantity} x ₹${itemPrice})`;
      orderSummary.appendChild(summaryEntry);
    }
  });

  // Show the order summary
  orderSummary.style.display = "block";
}

// Add event listener to the checkout button
checkoutBtn.addEventListener("click", () => {
  // Generate and display the order summary
  generateOrderSummary();
});

// Function to generate the order summary and save it as a text file
function generateOrderSummaryAndSave() {
  // Initialize the order summary string
  // let orderSummaryText = "";
  const urlParams = new URLSearchParams(window.location.search);
  const tid = urlParams.get("tid");
  let orderData = [];
  // Loop through each menu item card to get the selected quantities and generate the order summary
  menuItemCards.forEach((card) => {
    const itemName = card.querySelector(".menu-item-name").textContent;
    const quantity = parseInt(card.querySelector(".quantity").textContent);
    const itemPrice = parseInt(
      card.querySelector(".menu-item-price").textContent.replace("₹", "")
    );
    if (quantity > 0) {
      const totalItemPrice = itemPrice * quantity;
      console.log(itemPrice, itemName, totalItemPrice, quantity);
      orderData.push({
        itemName,
        quantity,
        itemPrice,
      });

      // Add the item details to the order summary string
      // orderSummaryText += `${itemName}: ₹${totalItemPrice} (${quantity} x ₹${itemPrice})\n`;
    }
  });
  setDoc(doc(db, "orders", tid), {
    orderData,
  });
}

// Add event listener to the order button to generate the order summary and save it as a text file
orderBtn.addEventListener("click", () => {
  // Generate and save the order summary
  generateOrderSummaryAndSave();
});
