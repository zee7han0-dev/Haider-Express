// ==========================================
// 0. UI FEEDBACK UTILITIES (toasts + inline confirm)
// No native alert()/confirm() anywhere in this file — everything
// below renders inline, dismissible UI instead.
// ==========================================

function ensureToastHost() {
  let host = document.getElementById("toast-host");
  if (!host) {
    host = document.createElement("div");
    host.id = "toast-host";
    host.className =
      "fixed top-4 right-4 z-[100] flex flex-col gap-2 items-end pointer-events-none";
    document.body.appendChild(host);
  }
  return host;
}

/**
 * Shows an auto-dismissing toast banner.
 * type: "success" | "error" | "info"
 */
function showToast(message, type = "success", duration = 3000) {
  const host = ensureToastHost();

  const palette = {
    success: "bg-emerald-600 text-white",
    error: "bg-rose-600 text-white",
    info: "bg-slate-900 text-white",
  };
  const icon = { success: "✓", error: "✕", info: "ℹ" }[type] || "ℹ";

  const toast = document.createElement("div");
  toast.className = `pointer-events-auto ${palette[type] || palette.info} font-bold text-xs px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 max-w-xs opacity-0 translate-x-4 transition-all duration-300`;
  toast.innerHTML = `<span class="text-sm leading-none">${icon}</span><span>${escapeHtml(message)}</span>`;

  host.appendChild(toast);

  // animate in
  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0", "translate-x-4");
  });

  // animate out + remove
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-x-4");
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Renders an inline confirmation card in place of window.confirm().
 * Returns a Promise<boolean> resolved true/false based on the user's choice.
 * container: a DOM element to render the confirm card into (e.g. the order card footer)
 */
function showInlineConfirm(
  container,
  { title, message, confirmLabel = "Confirm", cancelLabel = "Go Back" },
) {
  return new Promise((resolve) => {
    const original = container.innerHTML;

    container.innerHTML = `
      <div class="bg-rose-50 border-t border-rose-100 px-5 py-4 space-y-3">
        <div>
          <p class="text-xs font-black text-rose-700">${escapeHtml(title)}</p>
          <p class="text-xs text-rose-600 mt-0.5">${escapeHtml(message)}</p>
        </div>
        <div class="flex gap-3">
          <button data-action="cancel" class="flex-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-xl transition">
            ${escapeHtml(cancelLabel)}
          </button>
          <button data-action="confirm" class="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-xl transition shadow-sm">
            ${escapeHtml(confirmLabel)}
          </button>
        </div>
      </div>
    `;

    container
      .querySelector('[data-action="confirm"]')
      .addEventListener("click", () => {
        resolve(true);
      });
    container
      .querySelector('[data-action="cancel"]')
      .addEventListener("click", () => {
        container.innerHTML = original;
        resolve(false);
      });
  });
}

let cart = JSON.parse(localStorage.getItem("bagzone_cart")) || [];

function saveCart() {
  localStorage.setItem("bagzone_cart", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.querySelector("header button span");
  if (!badge) return;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
}

// ==========================================
// 2. INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  applyFilters();
  renderCartPage();
  initOrdersTabs();
  renderOrdersPage();
  initReviewsSection();

  if (sessionStorage.getItem("bagzone_show_order_toast") === "1") {
    sessionStorage.removeItem("bagzone_show_order_toast");
    showToast("Order placed successfully!", "success");
  }
});

// ==========================================
// 3. CART CORE OPERATIONS
// ==========================================

window.addToCart = function (productId) {
  const productSource = PRODUCTS.find((p) => p.id === productId);
  if (!productSource) return;

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productSource.id,
      name: productSource.name,
      price: productSource.price,
      color: productSource.color,
      image: productSource.images[0],
      quantity: 1,
    });
  }
  saveCart();
};

// ==========================================
// 4. CART PAGE RENDERER
// ==========================================

function renderCartPage() {
  const cartContainer = document.getElementById("cart-items-container");
  const summaryBox = document.getElementById("cart-summary-box");
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm lg:col-span-3">
        <span class="text-5xl block mb-4">🛒</span>
        <h3 class="text-lg font-black text-slate-900 tracking-tight">Your shopping cart is empty</h3>
        <p class="text-slate-400 text-xs mt-1 mb-6">Looks like you haven't added any premium bag gear yet.</p>
        <a href="index.html" class="inline-block bg-[#2bc4c3] hover:bg-[#229e9d] text-white font-bold text-xs tracking-wide px-6 py-3 rounded-xl shadow-sm transition">
          Discover Products &rarr;
        </a>
      </div>
    `;
    if (summaryBox) summaryBox.classList.add("hidden");
    return;
  }

  if (summaryBox) summaryBox.classList.remove("hidden");

  let subtotal = 0;
  cart.forEach((item) => {
    const totalLinePrice = item.price * item.quantity;
    subtotal += totalLinePrice;

    cartContainer.innerHTML += `
      <div class="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4 w-full sm:w-auto">
          <div class="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center relative">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');" />
            <div class="hidden absolute inset-0 bg-slate-100 flex items-center justify-center text-[9px] font-mono text-slate-400">Bag</div>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 text-sm tracking-tight">${item.name}</h4>
            <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded">${item.color}</span>
          </div>
        </div>
        <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0">
          <div class="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
            <button onclick="changeQuantity('${item.id}', -1)" class="px-3 py-1.5 hover:bg-slate-200 text-slate-500 font-bold transition text-xs">-</button>
            <span class="px-2 font-black text-slate-900 text-xs min-w-[20px] text-center">${item.quantity}</span>
            <button onclick="changeQuantity('${item.id}', 1)" class="px-3 py-1.5 hover:bg-slate-200 text-slate-500 font-bold transition text-xs">+</button>
          </div>
          <div class="text-right min-w-[70px]">
            <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
            <span class="font-black text-slate-900 text-sm">Rs.${totalLinePrice.toFixed(0)}</span>
          </div>
          <button onclick="removeItemFromCart('${item.id}')" class="text-slate-300 hover:text-rose-500 transition font-medium text-sm p-1">✕</button>
        </div>
      </div>
    `;
  });

  const pageSubtotal = document.getElementById("page-subtotal");
  const pageTotal = document.getElementById("page-total");
  if (pageSubtotal) pageSubtotal.textContent = `Rs.${subtotal.toFixed(0)}`;
  if (pageTotal) pageTotal.textContent = `Rs.${subtotal.toFixed(0)}`;
}

window.changeQuantity = function (productId, direction) {
  const targetItem = cart.find((item) => item.id === productId);
  if (!targetItem) return;
  targetItem.quantity += direction;
  if (targetItem.quantity <= 0) {
    removeItemFromCart(productId);
    return;
  }
  saveCart();
  renderCartPage();
};

window.removeItemFromCart = function (productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCartPage();
};

// ==========================================
// 5. CHECKOUT MODAL — STEP 1 (Order Details)
// ==========================================

window.toggleCheckoutModal = function (showFlag) {
  const modal = document.getElementById("checkout-modal");
  const modalBody = document.getElementById("modal-body");
  if (!modal || !modalBody) return;

  if (showFlag) {
    populateCheckoutSummary();
    modal.classList.remove("invisible", "opacity-0");
    modalBody.classList.remove("scale-95");
    modalBody.classList.add("scale-100");
  } else {
    modal.classList.add("invisible", "opacity-0");
    modalBody.classList.remove("scale-100");
    modalBody.classList.add("scale-95");
  }
};

function populateCheckoutSummary() {
  const summaryWrapper = document.getElementById("modal-checkout-items");
  const mSubtotal = document.getElementById("modal-subtotal");
  const mTotal = document.getElementById("modal-total");
  if (!summaryWrapper) return;

  summaryWrapper.innerHTML = "";
  let totalCash = 0;

  cart.forEach((item) => {
    const cost = item.price * item.quantity;
    totalCash += cost;
    summaryWrapper.innerHTML += `
      <div class="flex justify-between items-center text-xs text-slate-600">
        <span>${item.name} <strong class="text-slate-900">x${item.quantity}</strong></span>
        <span class="font-bold text-slate-900">Rs.${cost.toFixed(0)}</span>
      </div>
    `;
  });

  if (mSubtotal) mSubtotal.textContent = `Rs.${totalCash.toFixed(0)}`;
  if (mTotal) mTotal.textContent = `Rs.${totalCash.toFixed(0)}`;
}

// ==========================================
// 6. CHECKOUT — STEP 2 (Payment Method Modal)
// ==========================================

let pendingOrderData = null;

window.handleOrderSubmission = function (event) {
  event.preventDefault();
  const formElement = event.target;

  const nameField = formElement.querySelector('input[name="Client Name"]');
  const addressField = formElement.querySelector(
    'input[name="Street Address"]',
  );
  const cityField = formElement.querySelector('input[name="City"]');
  const emailField = formElement.querySelector('input[name="_replyto"]');
  const phoneField = formElement.querySelector('input[name="Phone"]');
  const zipField = formElement.querySelector('input[name="Zip Code"]');

  const rawPhone = phoneField ? phoneField.value.trim() : "";
  const phoneDigits = rawPhone.replace(/[\s\-\(\)]/g, "");
  const pakistanPhoneRegex = /^(\+92|0092|0)3[0-9]{9}$/;

  if (!pakistanPhoneRegex.test(phoneDigits)) {
    showFieldError(
      phoneField,
      "Please enter a valid Pakistani phone number (e.g. 03001234567 or +923001234567)",
    );
    phoneField.focus();
    return;
  } else {
    clearFieldError(phoneField);
  }

  const rawZip = zipField ? zipField.value.trim() : "";
  const pakistanZipRegex = /^[0-9]{5}$/;

  if (!pakistanZipRegex.test(rawZip)) {
    showFieldError(
      zipField,
      "Please enter a valid 5-digit Pakistani postal code (e.g. 38000)",
    );
    zipField.focus();
    return;
  } else {
    clearFieldError(zipField);
  }

  pendingOrderData = {
    customerName: nameField ? nameField.value : "Customer",
    email: emailField ? emailField.value : "",
    phone: phoneField ? phoneField.value : "",
    deliveryAddress: `${addressField ? addressField.value : ""}, ${cityField ? cityField.value : ""}, ${zipField ? zipField.value : ""}`,
    items: [...cart],
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };

  toggleCheckoutModal(false);
  setTimeout(() => openPaymentModal(), 300);
};

function showFieldError(field, message) {
  clearFieldError(field);
  field.classList.add("border-rose-400", "bg-rose-50");

  const errorEl = document.createElement("p");
  errorEl.className =
    "field-error-msg text-rose-500 text-[11px] font-semibold mt-1.5 flex items-center gap-1";
  errorEl.innerHTML = `<span>⚠️</span> ${message}`;

  field.parentNode.appendChild(errorEl);
}

function clearFieldError(field) {
  field.classList.remove("border-rose-400", "bg-rose-50");
  const existingError = field.parentNode.querySelector(".field-error-msg");
  if (existingError) existingError.remove();
}

// ==========================================
// 7. PAYMENT METHOD MODAL
// ==========================================

window.openPaymentModal = function () {
  const modal = document.getElementById("payment-modal");
  const modalBody = document.getElementById("payment-modal-body");
  if (!modal || !modalBody) return;

  showPaymentMethodSelection();

  modal.classList.remove("invisible", "opacity-0");
  modalBody.classList.remove("scale-95");
  modalBody.classList.add("scale-100");
};

window.closePaymentModal = function () {
  const modal = document.getElementById("payment-modal");
  const modalBody = document.getElementById("payment-modal-body");
  if (!modal || !modalBody) return;
  modal.classList.add("invisible", "opacity-0");
  modalBody.classList.remove("scale-100");
  modalBody.classList.add("scale-95");
};

function showPaymentMethodSelection() {
  const content = document.getElementById("payment-modal-content");
  if (!content) return;

  const total = pendingOrderData ? pendingOrderData.total : 0;

  // COD is the ONLY payment method offered. No selection step needed —
  // this just confirms COD and lets the user place the order.
  content.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
      <div>
        <h2 class="text-xl font-black text-slate-900 tracking-tight">Confirm Your Order</h2>
        <p class="text-slate-400 text-xs mt-0.5">Cash on Delivery — pay when your order arrives.</p>
      </div>
      <button onclick="closePaymentModal()" class="text-slate-300 hover:text-slate-500 text-xl font-bold p-1 transition">&times;</button>
    </div>

    <div class="bg-amber-50 border border-amber-100 rounded-2xl p-5 space-y-3 mb-6">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">💵</div>
        <div>
          <span class="block font-black text-slate-900 text-sm">Cash on Delivery</span>
          <span class="text-xs text-slate-400">Have the exact amount ready for our rider</span>
        </div>
      </div>
      <div class="bg-white rounded-xl p-3 border border-amber-100 flex justify-between items-center">
        <span class="text-xs font-bold text-slate-500">Amount Payable on Delivery</span>
        <span class="text-lg font-black text-amber-600">Rs.${total.toFixed(0)}</span>
      </div>
    </div>

    <div class="flex gap-3">
      <button onclick="closePaymentModal()" class="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition">Cancel</button>
      <button onclick="confirmOrder('cod')" class="w-2/3 bg-[#2bc4c3] hover:bg-[#229e9d] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm">Place Order ✓</button>
    </div>
  `;
}

// ==========================================
// 8. ORDER CONFIRMATION & FORMSPREE SUBMISSION
// ==========================================

window.confirmOrder = async function (paymentMethod) {
  if (!pendingOrderData) return;

  // COD is the only supported method now.
  const paymentLabel = "Cash on Delivery";

  // 1. Compile the readable items summary for your email alert
  const itemsText = pendingOrderData.items
    .map(
      (item) =>
        `${item.name} (x${item.quantity}) - Rs.${(item.price * item.quantity).toFixed(0)}`,
    )
    .join("\n");

  // 2. Build the data package matching your HTML Form input fields
  const formData = new FormData();
  formData.append("Client Name", pendingOrderData.customerName);
  formData.append("_replyto", pendingOrderData.email);
  formData.append("Phone", pendingOrderData.phone);
  formData.append("Street Address", pendingOrderData.deliveryAddress);
  formData.append("Order_Items_Summary", `Items:\n${itemsText}`);
  formData.append("Selected_Payment_Method", paymentLabel);
  formData.append("Total_Payable", `Rs.${pendingOrderData.total}`);

  // 3. Visual Loading State in the payment modal while it sends
  const contentContainer = document.getElementById("payment-modal-content");
  if (contentContainer) {
    contentContainer.innerHTML = `
      <div class="text-center py-12 space-y-4">
        <div class="w-12 h-12 border-4 border-[#2bc4c3] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h3 class="font-black text-slate-900 text-lg">Placing Your Order...</h3>
        <p class="text-slate-400 text-xs">Please do not close this window.</p>
      </div>
    `;
  }

  // 4. Notify you via Formspree (best-effort — order still proceeds if this fails)
  try {
    await fetch("https://formspree.io/f/mbdewgyz", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
  } catch (error) {
    console.error("Formspree Submission Error:", error);
  }

  // 5. Push the order to Supabase `orders` table
  let supabaseOrderId = null;
  try {
    const { data, error } = await supabaseClient
      .from("orders")
      .insert({
        customer_name: pendingOrderData.customerName,
        contact_number: pendingOrderData.phone,
        delivery_address: pendingOrderData.deliveryAddress,
        total_amount: pendingOrderData.total,
        items: pendingOrderData.items,
        order_status: "pending",
      })
      .select()
      .single();

    if (error) throw error;
    supabaseOrderId = data.id;
  } catch (error) {
    console.error("Supabase order insert failed:", error);
    // Still fall back to a locally-generated ID so the customer sees a confirmation,
    // but cancellation won't be able to reach Supabase for this order.
  }

  // 6. Keep a local display cache so orders.html can render instantly without a fetch
  const newOrder = {
    orderId:
      supabaseOrderId || "HE-" + Math.floor(100000 + Math.random() * 900000),
    supabaseId: supabaseOrderId,
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    customerName: pendingOrderData.customerName,
    email: pendingOrderData.email,
    phone: pendingOrderData.phone,
    deliveryAddress: pendingOrderData.deliveryAddress,
    items: pendingOrderData.items,
    total: pendingOrderData.total,
    paymentMethod: paymentLabel,
    status: "pending", // always starts pending; COD orders are pending until fulfilled/cancelled
  };

  let orderHistory = JSON.parse(localStorage.getItem("bagzone_orders")) || [];
  orderHistory.unshift(newOrder);
  localStorage.setItem("bagzone_orders", JSON.stringify(orderHistory));

  cart = [];
  localStorage.setItem("bagzone_cart", JSON.stringify(cart));
  updateCartBadge();
  pendingOrderData = null;

  sessionStorage.setItem("bagzone_show_order_toast", "1");
  closePaymentModal();
  window.location.href = "orders.html";
};

// ==========================================
// 8b. CANCEL ORDER
// ==========================================

window.cancelOrder = async function (localOrderId, btnEl) {
  const orderHistory = JSON.parse(localStorage.getItem("bagzone_orders")) || [];
  const orderIndex = orderHistory.findIndex((o) => o.orderId === localOrderId);
  if (orderIndex === -1) return;

  const order = orderHistory[orderIndex];

  // Find the footer container that holds the Cancel button so we can swap
  // it for an inline confirm card instead of window.confirm().
  const footerContainer = btnEl ? btnEl.closest("[data-order-footer]") : null;
  if (!footerContainer) return;

  const confirmed = await showInlineConfirm(footerContainer, {
    title: `Cancel order ${order.orderId}?`,
    message: "This cannot be undone.",
    confirmLabel: "Yes, Cancel It",
    cancelLabel: "Keep Order",
  });

  if (!confirmed) return;

  // 1. Update Supabase, if this order has a real Supabase row
  if (order.supabaseId) {
    try {
      const { error } = await supabaseClient
        .from("orders")
        .update({ order_status: "cancelled" })
        .eq("id", order.supabaseId);
      if (error) throw error;
    } catch (error) {
      console.error("Supabase cancel update failed:", error);
      showToast(
        "Could not reach the server to cancel this order. Please try again.",
        "error",
      );
      return;
    }
  }

  // 2. Update local cache immediately so the UI reflects it
  order.status = "cancelled";
  orderHistory[orderIndex] = order;
  localStorage.setItem("bagzone_orders", JSON.stringify(orderHistory));

  // 3. Email you via Formspree so you know to stop fulfillment
  try {
    const itemsText = order.items
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - Rs.${(item.price * item.quantity).toFixed(0)}`,
      )
      .join("\n");

    const formData = new FormData();
    formData.append("Client Name", order.customerName);
    formData.append("_replyto", order.email || "");
    formData.append("Phone", order.phone || "");
    formData.append("Cancelled_Order_ID", order.orderId);
    formData.append("Order_Items_Summary", `Items:\n${itemsText}`);
    formData.append("Total_Payable", `Rs.${order.total}`);
    formData.append("Notice", "CUSTOMER CANCELLED THIS ORDER");

    await fetch("https://formspree.io/f/mbdewgyz", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    console.error("Formspree cancellation email failed:", error);
  }

  showToast("Order cancelled successfully.", "success");
  renderOrdersPage();
};

// ==========================================
// 9. FILTER ENGINE
// ==========================================

function applyFilters() {
  const searchInput = document.getElementById("catalog-search");
  const minPriceInput = document.getElementById("filter-min-price");
  const maxPriceInput = document.getElementById("filter-max-price");
  if (!searchInput || !minPriceInput || !maxPriceInput) return;

  const query = searchInput.value.toLowerCase().trim();
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.color.toLowerCase().includes(query);
    return matchesPrice && matchesSearch;
  });

  renderFilteredGrid(filteredProducts);
}

function renderFilteredGrid(productsList) {
  const productGrid = document.getElementById("homepage-product-grid");
  if (!productGrid) return;

  productGrid.innerHTML = "";

  if (productsList.length === 0) {
    productGrid.innerHTML = `
      <div class="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <span class="text-5xl block mb-4">🔍</span>
        <h4 class="font-black text-slate-900 tracking-tight text-lg">No matching items found</h4>
        <p class="text-slate-400 text-xs mt-1">Try tweaking your search keywords or broadening your budget boundaries.</p>
      </div>
    `;
    return;
  }

  productsList.forEach((product) => {
    productGrid.innerHTML += `
      <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col group">
        <a href="product-details.html?id=${product.id}" class="h-64 bg-slate-100 relative overflow-hidden flex items-center justify-center text-slate-400 block cursor-pointer">
          <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');" />
          <div class="hidden absolute inset-0 flex items-center justify-center p-4 text-center bg-slate-100">
            <span class="text-xs font-semibold text-slate-400">Missing Image<br><span class="text-[10px] font-mono">${product.images[0]}</span></span>
          </div>
        </a>
        
        <div class="p-6 flex flex-col flex-grow">
          <div class="mb-2 flex items-center justify-between gap-2">
            <a href="product-details.html?id=${product.id}" class="hover:text-[#2bc4c3] transition cursor-pointer">
              <h3 class="font-black text-slate-900 text-base tracking-tight">${product.name}</h3>
            </a>
            <span class="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg whitespace-nowrap">${product.color}</span>
          </div>
          <p class="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-6 flex-grow">${product.description}</p>
          <div class="flex items-center justify-between gap-4 mt-auto border-t border-slate-50 pt-4">
            <div>
              <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Price</span>
              <span class="text-base font-black text-slate-900">Rs.${product.price.toFixed(0)}</span>
            </div>
            <button onclick="addToCart('${product.id}')" class="bg-[#2bc4c3] hover:bg-[#229e9d] text-white font-bold px-3 py-2 rounded-xl text-xs tracking-wide shadow-sm transition">Add To Cart 🎒</button>
          </div>
        </div>
      </div>
    `;
  });
}

// ==========================================
// 10. ORDERS PAGE RENDERER
// ==========================================

let currentOrdersTab = "all";

function initOrdersTabs() {
  const tabsContainer = document.getElementById("orders-tabs");
  if (!tabsContainer) return; // not on orders.html

  tabsContainer.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-tab]");
    if (!btn) return;
    currentOrdersTab = btn.dataset.tab;
    renderOrdersPage();
  });
}

function getOrdersTabCounts(orders) {
  return {
    all: orders.length,
    active: orders.filter((o) => o.status === "pending").length,
    completed: orders.filter(
      (o) => o.status !== "pending" && o.status !== "cancelled",
    ).length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };
}

function renderOrdersTabs(counts) {
  const tabsContainer = document.getElementById("orders-tabs");
  if (!tabsContainer) return;

  const tabs = [
    { key: "all", label: "All", count: counts.all },
    { key: "active", label: "Active / Pending", count: counts.active },
    { key: "completed", label: "Completed", count: counts.completed },
    { key: "cancelled", label: "Cancelled", count: counts.cancelled },
  ];

  tabsContainer.innerHTML = tabs
    .map((tab) => {
      const isActive = currentOrdersTab === tab.key;
      return `
        <button
          data-tab="${tab.key}"
          class="${isActive ? "bg-slate-900 text-white shadow-sm" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-100"} font-bold text-xs px-4 py-2 rounded-xl transition whitespace-nowrap"
        >
          ${tab.label} <span class="${isActive ? "text-slate-300" : "text-slate-400"} font-semibold">(${tab.count})</span>
        </button>
      `;
    })
    .join("");
}

function renderOrdersPage() {
  const container = document.getElementById("orders-log-container");
  if (!container) return;

  const allOrders = JSON.parse(localStorage.getItem("bagzone_orders")) || [];
  const counts = getOrdersTabCounts(allOrders);
  renderOrdersTabs(counts);

  const orders = allOrders.filter((order) => {
    if (currentOrdersTab === "all") return true;
    if (currentOrdersTab === "active") return order.status === "pending";
    if (currentOrdersTab === "cancelled") return order.status === "cancelled";
    if (currentOrdersTab === "completed")
      return order.status !== "pending" && order.status !== "cancelled";
    return true;
  });

  container.innerHTML = "";

  if (allOrders.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <span class="text-5xl block mb-4">📦</span>
        <h3 class="text-lg font-black text-slate-900 tracking-tight">No orders placed yet</h3>
        <p class="text-slate-400 text-xs mt-1 mb-6">Your historical purchase logs will show up here.</p>
        <a href="index.html" class="inline-block bg-[#2bc4c3] hover:bg-[#229e9d] text-white font-bold text-xs tracking-wide px-6 py-3 rounded-xl shadow-sm transition">
          Shop Premium Bags &rarr;
        </a>
      </div>
    `;
    return;
  }

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <span class="text-4xl block mb-3">🗂️</span>
        <h3 class="text-sm font-black text-slate-900 tracking-tight">No orders in this tab</h3>
        <p class="text-slate-400 text-xs mt-1">Try a different filter above.</p>
      </div>
    `;
    return;
  }

  orders.forEach((order) => {
    const itemsMarkup = order.items
      .map(
        (item) => `
        <div class="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
          <div class="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex-shrink-0">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
          </div>
          <div class="flex-grow">
            <h5 class="text-xs font-bold text-slate-900">${item.name}</h5>
            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">${item.color} <strong class="text-slate-700 font-black">x${item.quantity}</strong></span>
          </div>
          <span class="text-xs font-black text-slate-900">Rs.${(item.price * item.quantity).toFixed(0)}</span>
        </div>
      `,
      )
      .join("");

    const isPending = order.status === "pending";
    const isCancelled = order.status === "cancelled";

    let statusBadge;
    if (isCancelled) {
      statusBadge = `<span class="bg-rose-100 text-rose-700 font-black px-2.5 py-0.5 rounded-full text-[10px] tracking-wide uppercase inline-block">✕ Cancelled</span>`;
    } else if (isPending) {
      statusBadge = `<span class="bg-amber-100 text-amber-700 font-black px-2.5 py-0.5 rounded-full text-[10px] tracking-wide uppercase inline-block animate-pulse">⏳ Pending</span>`;
    } else {
      statusBadge = `<span class="bg-emerald-100 text-emerald-700 font-black px-2.5 py-0.5 rounded-full text-[10px] tracking-wide uppercase inline-block">✅ ${order.status}</span>`;
    }

    const paymentBadge = `<span class="bg-slate-100 text-slate-600 font-bold px-2.5 py-0.5 rounded-full text-[10px] tracking-wide uppercase inline-block">${order.paymentMethod || "N/A"}</span>`;

    container.innerHTML += `
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="bg-slate-50 border-b border-slate-100 p-4 flex flex-wrap gap-4 justify-between items-center text-xs">
          <div>
            <span class="text-slate-400 font-bold block uppercase text-[9px] tracking-wider">Order ID</span>
            <span class="font-black text-slate-900 font-mono">${order.orderId}</span>
          </div>
          <div>
            <span class="text-slate-400 font-bold block uppercase text-[9px] tracking-wider">Date</span>
            <span class="font-bold text-slate-700">${order.date}</span>
          </div>
          <div>
            <span class="text-slate-400 font-bold block uppercase text-[9px] tracking-wider">Payment</span>
            ${paymentBadge}
          </div>
          <div>
            <span class="text-slate-400 font-bold block uppercase text-[9px] tracking-wider">Status</span>
            ${statusBadge}
          </div>
        </div>

        <div class="p-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div class="md:col-span-2 space-y-1">
            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Items Purchased</span>
            ${itemsMarkup}
          </div>
          <div class="bg-slate-50/50 p-4 rounded-xl border border-slate-100 text-xs space-y-2">
            <div>
              <span class="text-slate-400 font-bold block text-[9px] uppercase tracking-wider">Shipping To</span>
              <strong class="text-slate-900 block mt-0.5">${order.customerName}</strong>
              <p class="text-slate-500 text-[11px] leading-tight mt-0.5">${order.deliveryAddress}</p>
            </div>
            ${order.phone ? `<div><span class="text-slate-400 font-bold block text-[9px] uppercase tracking-wider">Phone</span><p class="text-slate-700 font-bold text-[11px]">${order.phone}</p></div>` : ""}
            <div class="border-t border-slate-200/60 pt-2 mt-2 flex justify-between items-baseline">
              <span class="text-slate-900 font-black">Total</span>
              <span class="text-base font-black text-[#2bc4c3]">Rs.${order.total.toFixed(0)}</span>
            </div>
          </div>
        </div>

        <div data-order-footer>
          ${
            isPending
              ? `
          <div class="bg-amber-50 border-t border-amber-100 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
            <p class="text-xs text-amber-700 font-medium">
              ⚠️ Your order is being prepared for dispatch. You can cancel it any time before it ships.
            </p>
            <button onclick="cancelOrder('${order.orderId}', this)" class="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-xl transition shadow-sm">
              Cancel Order
            </button>
          </div>`
              : isCancelled
                ? `
          <div class="bg-rose-50 border-t border-rose-100 px-5 py-3 text-xs text-rose-700 font-medium">
            This order was cancelled and will not be fulfilled.
          </div>`
                : ""
          }
        </div>
      </div>
    `;
  });
}

// ==========================================
// 11. PRODUCT REVIEWS
// ==========================================

function initReviewsSection() {
  const container = document.getElementById("reviews-section-container");
  if (!container) return; // only runs on product-details.html

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  if (!productId) return;

  loadReviews(productId);

  const form = document.getElementById("review-form");
  if (form) {
    form.addEventListener("submit", (event) =>
      handleReviewSubmit(event, productId),
    );
  }

  // Star rating picker interactivity
  const starButtons = document.querySelectorAll(".review-star-btn");
  const ratingInput = document.getElementById("review-rating-input");
  starButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = parseInt(btn.dataset.value, 10);
      if (ratingInput) ratingInput.value = value;
      starButtons.forEach((b) => {
        const bVal = parseInt(b.dataset.value, 10);
        b.textContent = bVal <= value ? "★" : "☆";
        b.classList.toggle("text-amber-400", bVal <= value);
        b.classList.toggle("text-slate-300", bVal > value);
      });
    });
  });
}

async function loadReviews(productId) {
  const listEl = document.getElementById("reviews-list");
  const summaryEl = document.getElementById("reviews-summary");
  if (!listEl) return;

  listEl.innerHTML = `
    <div class="text-center py-8">
      <div class="w-8 h-8 border-4 border-[#2bc4c3] border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  `;

  try {
    const { data, error } = await supabaseClient
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    renderReviews(data || []);
  } catch (error) {
    console.error("Failed to load reviews:", error);
    listEl.innerHTML = `
      <div class="text-center py-8 text-xs text-slate-400 font-semibold">
        Couldn't load reviews right now. Please try again later.
      </div>
    `;
  }
}

function renderReviews(reviews) {
  const listEl = document.getElementById("reviews-list");
  const summaryEl = document.getElementById("reviews-summary");
  if (!listEl) return;

  if (reviews.length === 0) {
    listEl.innerHTML = `
      <div class="text-center py-10 border border-dashed border-slate-200 rounded-2xl">
        <span class="text-3xl block mb-2">📝</span>
        <p class="text-sm font-bold text-slate-700">No reviews yet</p>
        <p class="text-xs text-slate-400 mt-1">Be the first to share your experience with this product.</p>
      </div>
    `;
    if (summaryEl) summaryEl.innerHTML = "";
    return;
  }

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-3xl font-black text-slate-900">${avg.toFixed(1)}</span>
        <div>
          <div class="text-amber-400 text-lg leading-none">${renderStars(Math.round(avg))}</div>
          <span class="text-xs text-slate-400 font-semibold">${reviews.length} review${reviews.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    `;
  }

  listEl.innerHTML = reviews
    .map(
      (r) => `
      <div class="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <span class="font-black text-slate-900 text-sm">${escapeHtml(r.customer_name)}</span>
          <span class="text-amber-400 text-sm">${renderStars(r.rating)}</span>
        </div>
        <p class="text-slate-600 text-xs leading-relaxed">${escapeHtml(r.comment)}</p>
        <span class="block text-[10px] text-slate-300 font-semibold mt-3 uppercase tracking-wider">${new Date(r.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
      </div>
    `,
    )
    .join("");
}

function renderStars(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

async function handleReviewSubmit(event, productId) {
  event.preventDefault();

  const nameInput = document.getElementById("review-name-input");
  const ratingInput = document.getElementById("review-rating-input");
  const commentInput = document.getElementById("review-comment-input");
  const submitBtn = document.getElementById("review-submit-btn");
  const errorEl = document.getElementById("review-form-error");

  const name = nameInput ? nameInput.value.trim() : "";
  const rating = ratingInput ? parseInt(ratingInput.value, 10) : 0;
  const comment = commentInput ? commentInput.value.trim() : "";

  if (errorEl) {
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
  }

  if (!name || !comment || !rating || rating < 1 || rating > 5) {
    if (errorEl) {
      errorEl.textContent =
        "Please enter your name, write a comment, and select a star rating.";
      errorEl.classList.remove("hidden");
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
  }

  try {
    const { error } = await supabaseClient.from("reviews").insert({
      product_id: productId,
      customer_name: name,
      rating: rating,
      comment: comment,
    });

    if (error) throw error;

    // Reset form
    if (nameInput) nameInput.value = "";
    if (commentInput) commentInput.value = "";
    if (ratingInput) ratingInput.value = "";
    document.querySelectorAll(".review-star-btn").forEach((b) => {
      b.textContent = "☆";
      b.classList.remove("text-amber-400");
      b.classList.add("text-slate-300");
    });

    showToast("Review submitted — thank you!", "success");
    await loadReviews(productId);
  } catch (error) {
    console.error("Failed to submit review:", error);
    if (errorEl) {
      errorEl.textContent =
        "Something went wrong submitting your review. Please try again.";
      errorEl.classList.remove("hidden");
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Review";
    }
  }
}
