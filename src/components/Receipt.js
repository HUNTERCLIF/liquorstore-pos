import React from 'react';

const Receipt = ({ cart, totalAmount, paymentDetails }) => {
  return (
    <div className="receipt">
      <h3>Receipt</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <div className="total">Total Amount: ${totalAmount}</div>
      <div className="payment-details">
        <h4>Payment Details</h4>
        <p>Payment Method: {paymentDetails.method}</p>
        <p>Card Number: {paymentDetails.cardNumber}</p>
        {/* payment details  */}
      </div>
    </div>
  );
};

export default Receipt;
