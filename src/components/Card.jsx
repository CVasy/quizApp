import React, { useEffect } from 'react';
import '../css/styles.css';

function Card(props) {
  const [clicked,setClicked] = React.useState(props.clicked);
  useEffect(function(){
    if(props.reset){
      setClicked(true);
      setTimeout(() => {setClicked(false);}, 2500);
    }
  },[props.reset]
  );
  

  function isClicked(){
    if(!clicked){
    props.changeStatus(props.cardNumber);
    setClicked(true);
    }
  }
  
  return (
    <div onClick={isClicked} className={`card ${clicked ? props.cardStatus : ''}`}>
    <div>{props.cardText}</div>
    </div>
    );
  }
  
  export default Card;
  