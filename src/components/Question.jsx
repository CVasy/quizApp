import '../css/styles.css';

function Question(props) {
  return (
    <div  className="question">
    <div>{props.questionText}</div>
    </div>
    );
  }
  
  export default Question;
  