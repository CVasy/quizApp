import '../css/styles.css';
import React, { useEffect } from 'react';

function Status(props) {
    const [hearts,setHearts] = React.useState(<p className='gameName'>Hearts</p>);
    useEffect(function(){
        var divv= [];
        for(let i = 0 ;i< props.lives;i++){
            divv.push(<img key= {i} src='/images/redheart.png'  alt='not found' />);
        }
        for(let i = props.lives ;i< 4;i++){
            divv.push(<img key= {i} src='/images/heartimg.png'  alt='not found' />);
        }
        setHearts(divv);
    },[props.lives]
    );
    function startGame(subject){
        props.startGame(subject);
    }
    function showOptions(){
        props.showOptions();
    }
    function restartGame(){
        props.restartGame();
    }
    return (
        <div className="statusSide">
        {props.gameStatus === "notStarted" && !props.showChoices && <button onClick={showOptions} className='myButton'>Start Game</button>}
        {(props.gameStatus === "started" || props.gameStatus === "finished") && <button onClick={restartGame} className='myButton'>Start Again</button>}
        {props.showChoices && <div className={"quizzDomainClass"}>
        <div className="chooseDiv">Choose the quizz domain:</div>
        <button onClick={() => startGame('Bible')} className='chooseButton'>Bible</button>
        <button onClick={() => startGame('Math')} className='chooseButton'>Math</button>
        <button onClick={() => startGame('Biology')} className='chooseButton'>Biology</button>
        </div>}
        {props.gameStatus === "started" && <div className={"scoreDiv"}>
        <div className= "lives">
        <p >Lives:</p>
        {hearts}
        </div>
        <div className= "lives">
        <p className ="score">Score:</p>
        <output> {props.score} </output>
        </div>
        </div>}
        </div>
        
        );
    }
    
    export default Status;