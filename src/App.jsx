import { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Heading from './components/Heading'
import Page from './components/Page';
import Status from './components/Status';

//db.bibles.insert({question:"Cati ucenici a avut Isus2?", answer1:12, answer2:14,answer3:11, answer4:7, rightanswer:1});
function App() {
  const [lives,setLivesNumber] = useState(4);
  const [scoreNumber,setScoreNumber] = useState(-1);
  const [showChoices,setShowChoices] = useState(false);
  const [gameStatus, setgameStatus] = useState("notStarted");
  const [subject,setSubject] = useState("");
  function increaseScore(){
    setScoreNumber(scoreNumber + 1);
  };
  function decreaseLives(){
    if(lives > 1)
    setLivesNumber(lives - 1);
      else
      {
          setgameStatus("finished");
      }
  };
  function showOptions(){
    setShowChoices(true);
  }
  function startGame(subject){
    setSubject(subject);
    setScoreNumber(0);
    setShowChoices(false);
    setgameStatus("started");
  }
  function restartGame(){
    setLivesNumber(4);
    setScoreNumber(0);
    setgameStatus("notStarted");
    setShowChoices(true);
    
  }
  return (
    <div className="App">
    <Heading score={scoreNumber} lives = {lives}/>
    <div className="contentSide">
    <Status startGame={startGame} showChoices={showChoices} showOptions={showOptions} gameStatus = {gameStatus} score={scoreNumber} lives = {lives} restartGame={restartGame}/>
    <Page cards={[1,2,3,4]} increaseScore={increaseScore} decreaseLives={decreaseLives} gameStatus = {gameStatus} scoreNumber={scoreNumber} subject={subject}/>
    </div>
    
    <Footer />
    </div>
    );
  }
  
  export default App;
  