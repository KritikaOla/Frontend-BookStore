
import React from "react";
import "../components/ProductCard.css";
import BookCard from "../components/BookCard";

// Import images
import book1 from "../images/manga1.jpg";
import book2 from "../images/manga2.jpg";
import book3 from "../images/manga3.jpg";
import book4 from "../images/manga4.jpg";
import book5 from "../images/manga5.jpg";
import book6 from "../images/manga6.webp";
import book7 from "../images/manga7.webp";
import book8 from "../images/manga8.jpg";
import book9 from "../images/manga9.jpg";
import book10 from "../images/manga10.webp";
import book11 from "../images/manga11.webp";
import book12 from "../images/manga12.jpg";
import book13 from "../images/manga13.jpg";
import book14 from "../images/manga14.jpg";
import book15 from "../images/manga15.jpg";
import book16 from "../images/manga16.jpg";
import book17 from "../images/manga17.jpg";
import book18 from "../images/manga18.jpg";
import book19 from "../images/manga19.jpg";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";


const mangaList = [
  {
    id: 1,
    title: "My Hero Academia",
    category: "Fiction",
    description: "A Quirkless boy dreams of becoming a hero in a world full of superpowered individuals.",
    price: 462,
    image: book1,
    badge: "20% off",
  },
  {
    id: 2,
    title: "Death Note",
    category: "Psychological Thriller",
    description: "A high school student discovers a notebook that allows him to kill anyone by writing their name in it.",
    price: 1200,
    image: book2,
    badge: "20% off",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    category: "Action, Dark Fantasy",
    description: "A high schooler swallows a cursed object and gets pulled into a brutal world of sorcery and deadly curses.",
    price: 600,
    image: book3,
    badge: "40% off",
  },
  {
    id: 4,
    title: "Demon Slayer",
    category: "Adventure",
    description: "A young boy trains to become a demon slayer after his family is killed and his sister is turned into a demon.",
    price: 620,
    image: book4,
    badge: "20% off",
  },
  {
    id: 5,
    title: "I Want to Eat Your Pancreas",
    category: "Romance, Drama",
    description: "A high school boy discovers his classmate's secret illness, leading to a transformative friendship.",
    price: 600,
    image: book5,
    badge: "80% off",
  },
  {
    id: 6,
    title: "Tokyo Ghoul",
    category: "Horror, Supernatural",
    description: "A boy after a near-fatal encounter, thrusting him into a violent world where he must balance his humanity and ghoul instincts.",
    price: 900,
    image: book6,
    badge: "42% off",
  },
  {
    id: 7,
    title: "Naruto",
    category: "Adventure, Martial Arts",
    description: "A young ninja with dreams of becoming his village's leader embarks on adventures filled with friendship and personal growth.",
    price: 690,
    image: book7,
    badge: "10% off",
  },
  {
    id: 8,
    title: "One Piece",
    category: "Adventure, Fantasy",
    description: "A young pirate embarks on a quest to find the legendary treasure One Piece.",
    price: 1200,
    image: book8,
    badge: "28% off",
  },
  {
    id: 9,
    title: "Attack On Titan",
    category: "Post-Apocalyptic",
    description: "Eren Yeager and his friends join the military to fight for survival and uncover the mysteries behind the Titans.",
    price: 860,
    image: book9,
    badge: "83% off",
  },
  {
    id: 10,
    title: "Dandadan",
    category: "Action, Comedy",
    description: "Momo Ayase and Ken Takakura encounter bizarre phenomena involving aliens and ghosts.",
    price: 390,
    image: book10,
    badge: "20% off",
  },
  {
    id: 11,
    title: "Solo Leveling",
    category: "Action, Fantasy",
    description: "Weak hunter Jinwoo Sung discovers a unique ability to level up in strength.",
    price: 530,
    image: book11,
    badge: "10% off",
  },
  {
    id: 12,
    title: "Spy x Family",
    category: "Comedy, Spy Fiction",
    description: "A spy, an assassin, and a telepath form a makeshift family to accomplish their individual missions.",
    price: 200,
    image: book12,
    badge: "30% off",
  },
  {
    id: 13,
    title: "Blue Lock",
    category: "Sports",
    description: "A soccer training program aims to create the world's greatest striker by pitting players against each other.",
    price: 350,
    image: book13,
    badge: "20% off",
  },
  {
    id: 14,
    title: "Dragon Ball",
    category: "Adventure, Martial Arts",
    description: "Follows the adventures of Goku from childhood to adulthood as he trains in martial arts.",
    price: 200,
    image: book14,
    badge: "40% off",
  },
  {
    id: 15,
    title: "Your Name",
    category: "Romance",
    description: "Two teenagers inexplicably begin to swap bodies, changing their lives forever.",
    price: 820,
    image: book15,
    badge: "10% off",
  },
  {
    id: 16,
    title: "Chainsaw Man",
    category: "Horror, Dark Fantasy",
    description: "A young man merges with his pet devil, Pochita, becoming Chainsaw Man.",
    price: 410,
    image: book16,
    badge: "30% off",
  },
  {
    id: 17,
    title: "Sakamoto Days",
    category: "Action, Comedy",
    description: "Taro Sakamoto, a retired hitman, finds his peaceful life disrupted.",
    price: 230,
    image: book17,
    badge: "90% off",
  },
  {
    id: 18,
    title: "Wind Breaker",
    category: "Sports, Action",
    description: "A high school student gets involved in the world of extreme cycling.",
    price: 410,
    image: book18,
    badge: "32% off",
  },
  {
    id: 19,
    title: "Bleach",
    category: "Adventure, Supernatural",
    description: "A teenager becomes a Soul Reaper to protect the living world from malevolent spirits.",
    price: 320,
    image: book19,
    badge: "28% off",
  },
  {
    id: 10,
    title: "Dandadan",
    category: "Action, Comedy",
    description: "Momo Ayase and Ken Takakura encounter bizarre phenomena involving aliens and ghosts.",
    price: 390,
    image: book10,
    badge: "20% off",
  },
];


const Manga = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="books-container">
      {mangaList.map((book) => (
        <BookCard key={book.id} book={book} addToCart={addToCart} />
      ))}
    </div>
  );
};
export default Manga;
export { mangaList };
