import React from "react";
import "./ProductCard.css";

const ProductCard = ({ book, onAddToCart }) => {
  return (
    <div className="product-card">
      {book.badge && <div className="badge">{book.badge}</div>}
      <div className="product-tumb">
        <img src={book.image} alt={book.title} />
      </div>
      <div className="product-details">
        <span className="product-catagory">{book.category}</span>
        <h4>{book.title}</h4>
        <p>{book.description}</p>
        <div className="product-bottom-details">
          <button
            className="view-more-btn"
            onClick={() => onAddToCart(book)} // 👉 passes the book when clicked
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
