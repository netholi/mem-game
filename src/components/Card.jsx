

export const Card=({card , onClick})=>{
  
  return <div className={`card ${card.isMatched ? "matched":""} ${card.isFlipped ? "flipped":""}`} onClick={()=> onClick(card)}>
    <div className="card-front">?</div>
    <div className="card-back">{card.value}</div>

  </div>
}