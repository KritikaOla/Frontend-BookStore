import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

// Import images (Ensure the paths are correct)
import ratanTataImg from "../images/ratan-bio.jpg";
import onePieceImg from "../images/one-piece.jpg";
import richDadImg from "../images/rich-poor.webp";
import kidImg from "../images/kid1.webp";

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", padding: "20px" }}>
      <ProductCard
        book={{
          badge: "Best",
          image: ratanTataImg,
          category: "Autobiographies",
          title: "Ratan Tata",
          description: "Discover inspiring autobiography books, featuring real-life stories from remarkable individuals.",
          price: 20.99,
        }}
        onButtonClick={() => navigate("/books")}
      />
      <ProductCard
        book={{
          badge: "Hot",
          image: onePieceImg,
          category: "Manga Books",
          title: "One Piece Vol 1",
          description: "Explore a collection of manga books, filled with exciting stories and stunning artwork.",
          price: 15.99,
        }}
        onButtonClick={() => navigate("/manga")}
      />
      <ProductCard
        book={{
          badge: "New",
          image: kidImg,
          category: "Children Books",
          title: "That's My First",
          description: "Explore a magical collection of children's books, filled with adventure, perfect for young readers of all ages!",
          price: 10.99,
        }}
        onButtonClick={() => navigate("/books")}
      />
      <ProductCard
        book={{
          badge: "Sale",
          image: richDadImg,
          category: "Available in all languages",
          title: "Rich Dad Poor Dad",
          description: "Find books in different languages, offering stories and knowledge from around the world.",
          price: 18.50,
        }}
        onButtonClick={() => navigate("/books")}
      />
      <ProductCard
        book={{
          badge: "Sale",
          image: richDadImg,
          category: "Available in all languages",
          title: "Rich Dad Poor Dad",
          description: "Find books in different languages, offering stories and knowledge from around the world.",
          price: 18.50,
        }}
        onButtonClick={() => navigate("/books")}
      />
      <ProductCard
        book={{
          badge: "Sale",
          image: richDadImg,
          category: "Available in all languages",
          title: "Rich Dad Poor Dad",
          description: "Find books in different languages, offering stories and knowledge from around the world.",
          price: 18.50,
        }}
        onButtonClick={() => navigate("/books")}
      />
      <ProductCard
        book={{
          badge: "Sale",
          image: richDadImg,
          category: "Available in all languages",
          title: "Rich Dad Poor Dad",
          description: "Find books in different languages, offering stories and knowledge from around the world.",
          price: 18.50,
        }}
        onButtonClick={() => navigate("/books")}
      />
      <ProductCard
        book={{
          badge: "Sale",
          image: richDadImg,
          category: "Available in all languages",
          title: "Rich Dad Poor Dad",
          description: "Find books in different languages, offering stories and knowledge from around the world.",
          price: 18.50,
        }}
        onButtonClick={() => navigate("/books")}
      />
      
    </div>
  );
};

export default Home;
