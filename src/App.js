import { useState } from 'react';
import { useEffect } from 'react';



function RollOneDice(){
  //return random 1-6 num
  return 1 + Math.floor(Math.random() * 6);

}
export default function Game() {
  
  const [diceScore, setDiceScore ] = useState({p1:0,p2:0});
  const [diceRoll, setDiceDiceRoll ] = useState({d1:0,d2:0});
  const [isPlayerOne, setIsPlayerOne ] = useState(true);
  const [roundScore, setRoundScore] = useState(0);
  const [winnerMax, setWinnerMax ] = useState(100);

  function resetGame(){
    setDiceScore({p1:0,p2:0});
    setDiceDiceRoll({d1:0,d2:0});
    setIsPlayerOne(true);
    setRoundScore(0);
  }
  function CalculateWinnerDice(player){
    //check if the palyers score is over or eqaul max
    if(isPlayerOne){
      //player 1 turn
      if(diceScore["p1"]>winnerMax || roundScore > winnerMax){
        alert("winner player 1");
        resetGame();
      }
    }else{
      if(diceScore["p2"]>winnerMax || roundScore > winnerMax){
        alert("winner player 2");
        resetGame();
      }

    }
    
  }
  
  function handleInputChange(val){
    setWinnerMax(val)
  }
  function hold(){
    if(isPlayerOne){
      //player 1 turn
     setDiceScore({...diceScore, "p1": roundScore});

    }else{
      setDiceScore({...diceScore, "p2": roundScore});

    }
    let currentPlayer = isPlayerOne
    setIsPlayerOne(!currentPlayer);
  }

  function RollDices(){
    //recives player num adn retur obj with olayer num and the sum
    let dice1 = RollOneDice();
    let dice2 = RollOneDice();
    setDiceDiceRoll({d1:dice1,d2:dice2});
    //check for condition
    let currentScore;
    if(dice1+dice2==12){
      currentScore = 0;
      setRoundScore(0);
      let currentPlayer = isPlayerOne
      setIsPlayerOne(!currentPlayer);
    }else{
      currentScore = dice1 + dice2;
      setRoundScore(roundScore + currentScore)
      CalculateWinnerDice(isPlayerOne);

    }     
   }

  useEffect(() => {
    console.log("score", diceScore,"winnerMax",winnerMax,"is player one", isPlayerOne); // Access the updated value here
  }, [diceScore]); // Specify "value" as the dependency
  
  function DiceBoard(){
    //players buttons to roll dices
    return(

    <>
    <h2>DICE GAME</h2>
    {isPlayerOne&&<h4>payer 1 turn</h4>}
    {!isPlayerOne&&<h4>payer 2 turn</h4>}

    <div>
      <h3>
        set max score
      </h3>
    <input
      value={winnerMax} 
      onChange={(e)=> handleInputChange(e.target.value)} 
    />
    </div> 

    <button onClick={resetGame}>reload game</button>

    <h1>result of the roll</h1>
    <h2>dice 1 : {diceRoll.d1}</h2>
    <h2>dice 2 : {diceRoll.d2}</h2>
    
    <button onClick={()=>{hold()}}>
      hold
    </button>
    <button onClick={()=>{RollDices()}}>roll dice</button>

      <h3>player 1 score {diceScore.p1}</h3>
      <h3>player 2 score {diceScore.p2}</h3>
    </>
    )

  }
  
  return (
    <div className="game">
      <div className='dice-game'>
        <DiceBoard/>
      </div>
    </div>
  );
}
