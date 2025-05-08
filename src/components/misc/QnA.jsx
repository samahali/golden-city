import React, {useState} from 'react'
import './QnA.css'

const QnA = ({n, q}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [border, setBorder] = useState("");
    
  function toggleAnswer() {
    setShowAnswer(!showAnswer);
    toggleBorder();
  }
  
  function toggleBorder() {
    setBorder(border === "" ? "border-gold": "")
  }
    return (
        <React.Fragment>
          <div id="qna" className={border} onClick={toggleAnswer}>
            <div className="question">
              <h3>
                <span className="number">{n}.</span> {q.question}
              </h3>
              <div className="drop-down">
                <i 
                  className={showAnswer ? "fas fa-angle-down" : "fas fa-angle-right"}
                />
              </div>
            </div>
            {showAnswer && 
              <p className="answer-content">
                {q.answer}
              </p>
            }
          </div>
        </React.Fragment>
    )
}

export default QnA;