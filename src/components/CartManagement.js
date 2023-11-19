import React from 'react';

const CartManagement = ({ cart, updateCart, removeFromCart }) => {
  if (!cart || cart.length === 0) {
    // Handle the case where cart is undefined or empty
    return <div>Your cart is empty.</div>;
  }

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 0) {
      updateCart(itemId, newQuantity);
    }
  };

  return (
    <div>
      <h4>Cart Management</h4>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} - Quantity:
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
              className="cart-input"
            />
            <button
              className="btn btn-warning btn-sm ml-2"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div>
        <strong>Total Amount:</strong> ${calculateTotalAmount()}
      </div>
    </div>
  );
};

export default CartManagement;
