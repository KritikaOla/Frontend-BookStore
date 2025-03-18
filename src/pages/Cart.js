
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate the total price
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  return (
    <section className="h-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">

            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0">Shopping Cart</h3>
            </div>

            {cartItems.length === 0 && (
              <div className="alert alert-info text-center">
                Your cart is empty.
              </div>
            )}

            {cartItems.map((item, index) => (
              <div className="card rounded-3 mb-4" key={index}>
                <div className="card-body p-4">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src={item.image || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp'}
                        className="img-fluid rounded-3"
                        alt={item.title}
                      />
                    </div>

                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <p className="lead fw-normal mb-2">{item.title}</p>
                      <p>
                        <span className="text-muted">Author: </span>{item.author}
                      </p>
                    </div>

                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button type="button" className="btn btn-link px-2">
                        <i className="fas fa-minus"></i>
                      </button>

                      <input
                        min="0"
                        name="quantity"
                        defaultValue="1"
                        value={item.quantity}
                        type="number"
                        className="form-control form-control-sm"
                        readOnly
                      />

                      <button type="button" className="btn btn-link px-2">
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>

                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 className="mb-0">₹{item.price}</h5>
                    </div>

                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <button
                        type="button"
                        className="btn btn-link text-danger p-0 border-0"
                        onClick={() => removeFromCart(item.id)}
                        style={{ fontSize: '1.5rem' }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Checkout Button */}
            {cartItems.length > 0 && (
              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <h4>Total: ₹{totalAmount.toFixed(2)}</h4>
                  <button
                    type="button"
                    className="btn btn-warning btn-lg"
                    onClick={() => navigate('/payment', { state: { totalAmount } })}
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
