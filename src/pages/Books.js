import React from "react";
import "../components/ProductCard.css";
import BookCard from "../components/BookCard";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Add this import!
import { useEffect } from "react";


// Import images
import book1 from "../images/abdul-sir.jpg";
import book2 from "../images/chotu-ram.jpg";
import book3 from "../images/gandhi.jpg";
import book4 from "../images/mother-teresa.jpg";
import book5 from "../images/nelson-mandela.jpg";
import book6 from "../images/mrs-obama.jpg";
import book7 from "../images/Dune.jpg";
import book8 from "../images/green-poppy.jpg";
import book9 from "../images/harry-p.jpg";
import book10 from "../images/it-ends-with-us.jpg";
import book11 from "../images/just-a-girl.jpg";
import book12 from "../images/kid1.webp";
import book13 from "../images/little-frog.png";
import book14 from "../images/mermaid.jpg";
import book15 from "../images/moon.jpg";
import book16 from "../images/atomic-h.jpg";
import book17 from "../images/naughty-kids.png";
import book18 from "../images/ratan-bio.jpg";
import book19 from "../images/rich-poor.webp";
import book20 from "../images/story-of-struggle.jpg";
import book21 from "../images/the-black-witch.webp";
import book22 from "../images/to-kill.webp";
import book23 from "../images/under-sea.jpg";
import book24 from "../images/yogi.webp";

const booksList = [
  {
    id: 1,
    title: "Wings of Fire",
    category: "Autobiography",
    description: "Detailing his journey from a small-town boy to India’s Missile Man and President. Author: Arun Tiwari",
    price: 186,
    image: book1,
    badge: "58% off",
  },
  {
    id: 2,
    title: "Sir Chhotu Ram",
    category: "Autobiography",
    description: "A prominent Jat leader and politician in pre-independent India. Author: Madan Gopal",
    price: 476,
    image: book2,
    badge: "3% off",
  },
  {
    id: 3,
    title: "Mahatma Gandhi",
    category: "Autobiography",
    description: "Chronicles his journey from childhood to 1921. The Story of My Experiments with Truth",
    price: 992,
    image: book3,
    badge: "20% off",
  },
  {
    id: 4,
    title: "Mother Teresa",
    category: "Autobiography",
    description: "Inner spiritual life of Mother Teresa through her private writings. Author Brian Kolodiejchuk",
    price: 430,
    image: book4,
    badge: "42% off",
  },
  {
    id: 5,
    title: "Long Walk to Freedom",
    category: "Autobiography",
    description: "Detailing his journey from rural childhood to becoming South Africa's first Black president",
    price: 800,
    image: book5,
    badge: "12% off",
  },
  {
    id: 6,
    title: "Becoming Michelle Obama",
    category: "Autobiography",
    description: "From childhood in Chicago to her role as First Lady. Author: Michelle Obama.",
    price: 1270,
    image: book6,
    badge: "22% off",
  },
  {
    id: 7,
    title: "Dune",
    category: "Fiction",
    description: "A distant future where noble houses vie for control of the desert planet. Author: Frank Herbert",
    price: 379,
    image: book7,
    badge: "10% off",
  },
  {
    id: 8,
    title: "Green Poppy",
    category: "Kids",
    description: "Story of Max, a young boy who embarks on a fantastical adventure to an island",
    price: 360,
    image: book8,
    badge: "80% off",
  },
  {
    id: 9,
    title: "It Ends With Us",
    category: "Novel",
    description: "Lily Bloom as she navigates love, trauma, and resilience, drawing from her past. By Colleen Hoover",
    price: 180,
    image: book10,
    badge: "85% off",
  },
  {
    id: 10,
    title: "Just a Girl",
    category: "True Story",
    description: "Lia Levi, recounting her experiences as a young Jewish girl in Fascist Italy during World War II, By Lia Levi",
    price: 580,
    image: book11,
    badge: "32% off",
  },
  {
    id: 11,
    title: "Book Of Animals",
    category: "Kids",
    description: "A clever little mouse invents a monster, the Gruffalo, to scare away predators. By Julia Donaldson",
    price: 400,
    image: book12,
    badge: "12% off",
  },
  {
    id: 12,
    title: "Story Of Little Frog",
    category: "Fiction",
    description: "The journey of a little frog, making it an engaging read for children curious about nature",
    price: 280,
    image: book13,
    badge: "72% off",
  },
  {
    id: 13,
    title: "Mermaid To Rescue",
    category: "Fiction",
    description: "Young mermaids embarking on exciting underwater adventures. By Lisa Ann Scott",
    price: 450,
    image: book14,
    badge: "42% off",
  },
  {
    id: 14,
    title: "I See the Moon",
    category: "Fiction",
    description: "This book expands upon the classic nursery rhyme, following a child's day amidst nature.",
    price: 620,
    image: book15,
    badge: "19% off",
  },
  {
    id: 15,
    title: "Three Naughty Kids",
    category: "Fiction",
    description: "Tales of animals, fairies, toys, and children—both naughty and good. By- Enid Blyton",
    price: 720,
    image: book17,
    badge: "22% off",
  },
  {
    id: 16,
    title: "Rich Dad Poor Dad",
    category: "Finance Book",
    description: "It contrasts the financial philosophies of two fathers. Author- Robert T. Kiyosaki and Sharon L. Lechter",
    price: 286,
    image: book19,
    badge: "10% off",
  },
  {
    id: 17,
    title: "Ratan Tata: A Life",
    category: "Autobiography",
    description: "This biography delves from his early years to his leadership of the Tata Group. By- Thomas Mathew",
    price: 890,
    image: book18,
    badge: "30% off",
  },
  {
    id: 18,
    title: "Harry Potter",
    category: "Fiction",
    description: "A magical adventure that takes you to the world of Hogwarts. Author- J.K. Rowling",
    price: 1500,
    image: book9,
    badge: "30% off",
  },
  {
    id: 19,
    title: "The Black Witch",
    category: "Fantasy Novel",
    description: "A young adult fantasy novel by Laurie Forest, serving as the first installment in The Black Witch Chronicles.",
    price: 200,
    image: book21,
    badge: "28% off",
  },
  {
    id: 20,
    title: "Atomic Habits",
    category: "Self Help",
    description: "Learn how to build good habits and break bad ones effectively. Author- James Clear",
    price: 180,
    image: book16,
    badge: "20% off",
  },
  {
    id: 21,
    title: "Under the Sea",
    category: "Kids",
    description: "A kids thriller that will keep you on the edge of your seat. Author: Elloren Gardner",
    price: 250,
    image: book23,
    badge: "30% off",
  },
  {
    id: 22,
    title: "Autobiography of a Yogi",
    category: "Biography",
    description: "Yogananda recounts his journey from his early years in India, his search for his guru, Swami Sri Yukteswar Giri.",
    price: 410,
    image: book24,
    badge: "10% off",
  },
  {
    id: 23,
    title: "A Story Of Struggle",
    category: "Fantasy",
    description: "A hobbit who embarks on an unexpected journey with thirteen dwarves and the wizard Gandalf",
    price: 1480,
    image: book20,
    badge: "50% off",
  },
  {
    id: 24,
    title: "To Kill a Mockingbird",
    category: "Novel",
    description: "It narrates the story of young Scout Finch, her brother Jem, and their father Atticus Finch.",
    price: 320,
    image: book22,
    badge: "30% off",
  },
];


const Books = () => {
  const { addToCart: addProductToCart } = useContext(CartContext);
  const navigate = useNavigate(); // Hook for redirection

  // Enhanced Add to Cart handler with auth check
  const handleAddToCart = (book) => {
    const token = localStorage.getItem("token");
  
    console.log("Token from localStorage:", token);
  
    if (!token) {
      alert("Please login to add items to your cart.");
      navigate("/login");
      return;
    }
  
    addProductToCart(book);
  };
  
  return (
    <div className="books-container">
      {booksList.map((book) => (
        <BookCard key={book.id} book={book} addToCart={handleAddToCart} />
      ))}
    </div>
  );
};


export default Books;
export { booksList };
