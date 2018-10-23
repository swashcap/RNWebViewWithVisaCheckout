function formatPrice(value) {
  return '$' + value.toFixed(2);
}

function setOrderSummary() {
  var subtotalEl = document.getElementById('order-summary-subtotal');
  var subtotal = parseFloat(subtotalEl.getAttribute('data-value'));
  var shipping = 5;
  var taxes = (subtotal + shipping) * 0.0875;
  var total = subtotal + shipping + taxes;

  subtotalEl.innerText = formatPrice(subtotal);
  document.getElementById('order-summary-shipping').innerText = formatPrice(
    shipping
  );
  document.getElementById('order-summary-taxes').innerText = formatPrice(taxes);
  document.getElementById('order-summary-total').innerText = formatPrice(total);
}
