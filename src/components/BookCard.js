import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./ProductCard.css";

const BookCard = ({ book, addToCart }) => {
  if (!book) return null;

  return (
    <div className="product-card">
      {book.badge && <span className="badge">{book.badge}</span>}

      <div className="product-tumb">
        <img src={book.image} alt={book.title} />
      </div>

      <div className="product-details">
        <span className="product-category">{book.category}</span>
        <h4>{book.title}</h4>
        <p>{book.description}</p>

        <div className="price-cart">
          <span className="book-price">₹{book.price.toFixed(2)}</span>
          
          <FaShoppingCart
            className="cart-icon"
            role="button"
            aria-label="Add to Cart"
            onClick={() => addToCart(book)}
            title="Add to Cart"
          />
        </div>
      </div>
    </div>
  );
};

export default BookCard;
