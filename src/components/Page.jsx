import '../css/styles.css';
import Card from './Card';
import Question from './Question';
import { useEffect ,useState } from 'react';
import axios from 'axios';

function Page(props) {
  const  [question,setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [rightAnswer,setRightAnswer] = useState(0);
  useEffect(() => {
    if(props.scoreNumber >= 0){
      console.log("subject" + props.subject);
      axios.get('http://localhost:3001/get' + props.subject + 'Quizz')
      .then(quizz => {
        let qusetionIndex = Math.floor(Math.random() * quizz.data.length);
        setQuestion(quizz.data[qusetionIndex].question);
        setAnswers([quizz.data[qusetionIndex].answer1,quizz.data[qusetionIndex].answer2,quizz.data[qusetionIndex].answer3,quizz.data[qusetionIndex].answer4])
        setRightAnswer(quizz.data[qusetionIndex].rightanswer)
      }
      )
      .catch(err => console.log(err))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.scoreNumber, props.subject]);
  const initialOrder = shuffleArray(props.cards)
  const  [cardsOrder,setCardsOrder] = useState(initialOrder);
  const [cardsStatus,setCardsStatus] = useState(["normalCard","normalCard","normalCard","normalCard"]);
  const [resetCard,setReset] = useState(0);
  
  useEffect(function(){
    setCardsStatus(["normalCard","normalCard","normalCard","normalCard"])
  },[props.gameStatus]
  );
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  
  function resetCards(){
    setCardsStatus(["normalCard","normalCard","normalCard","normalCard"]);
    console.log("prepare cards order!!!");
    setCardsOrder(shuffleArray(props.cards));
    props.increaseScore();
  }
  function changeStatus(cardNumber){
    if(cardNumber === rightAnswer){
      let currentCardsStatus = cardsStatus;
      currentCardsStatus[cardNumber - 1] = "rightCard";
      setReset(resetCard + 1);
      setCardsStatus(currentCardsStatus);
      setTimeout(() => { console.log("prepare shuffling!!!");resetCards();}, 2500);
      
    }
    else
    {
      props.decreaseLives();
      let currentCardsStatus = cardsStatus;
      currentCardsStatus[cardNumber - 1] = "wrongCard";
      setCardsStatus(currentCardsStatus);
    }
    
  }
  
  return (
    <div className="cardsHolder">
    {props.gameStatus === "notStarted" && <div className="coverSide" />}
    {props.gameStatus === "started" && <div className={"cardsSide"}>
    <div className='mainCardDiv'>
    <Question questionText={question}/>
    </div>
    <div className='cardsDiv'>
    {    cardsOrder.map(function (cardNumber,index) {
      return <Card key= {index} index = {index} cardNumber = {cardNumber} cardText= {answers[cardNumber-1]} clicked={false} cardStatus = {cardsStatus[cardNumber - 1]} changeStatus={changeStatus} reset = {resetCard}/>;
    })}
    
    </div>
    
    </div>}
    {props.gameStatus === "finished" && <div className="coverSide">
    <div className="result">
    <p>Your finale score is:</p>
    <output className='finalScore'>{props.scoreNumber}</output>
    </div>
    </div>}
    </div>
    
    
    );
  }
  
  export default Page;