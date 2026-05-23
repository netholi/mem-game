import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader"

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];
function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore]=useState(0);
  const [moves, setMoves]=useState(0);
const [isLocked,setIsLocked]=useState(false);
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  const initializeGame = () => {
    //SHUFFLE CARDS
    const shuffled = shuffleArray(cardValues);

    // console.log(cardValues);

    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    setScore(0);
  setMoves(0);
  setMatchedCards([]);
  setFlippedCards([])
    setCards(finalCards);
    setIsLocked(false);
  }
  useEffect(() => {
    initializeGame();
  }, [])

  const handleCardClick = (card) => {
    //Don't allow clicking if card id flipped or matched

    if (card.isFlipped || card.isMatched || isLocked)
      return;
    //Update card flipped state
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });
    setCards(newCards);
    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];
      if (firstCard.value === card.value) {
        setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
        setScore((prev)=>prev+1);
        setCards((prev)=>prev.map((c) => {
          if (c.id === card.id || c.id === firstCard.id) {
            return { ...c, isMatched: true };
          } else {
            return c;
          }
        }));
        setFlippedCards([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {

          //flip back card 1 and 2
          const flippedBackCard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false }
            } else {
              return c;
            }
          });
          setFlippedCards([]);
          setCards(flippedBackCard);
          setIsLocked(false)
        }, 500);
      }
      setMoves(moves+1);
    }
  };

  return (
    <>
      <div className="app">
        <GameHeader score={score} moves={moves} onReset={initializeGame} />
        <div className="cards-grid">
          {cards.map((card, index) => (
            <Card key={index} card={card} onClick={handleCardClick} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
