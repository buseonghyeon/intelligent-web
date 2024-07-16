import React, { useState } from "react";
import "../css/QuestionModal.css"; // 모달 스타일링 파일을 임포트

const QuestionModal = ({ isOpen, onClose, onSubmit }) => {
  const [questionAnswers, setQuestionAnswers] = useState({
    age: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionAnswers({
      ...questionAnswers,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(questionAnswers);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>맞춤형 질문</h2>

        <div className="question-block">
          <label>질문1. 나이는 어떻게 되나요?</label>
          <input
            type="text"
            name="age"
            value={questionAnswers.age}
            onChange={handleChange}
          />
        </div>

        <div className="question-block">
          <label>질문2. 'happy'의 반대말은 무엇입니까?</label>
          <div>
            <label>
              <input
                type="radio"
                name="q2"
                value="a"
                checked={questionAnswers.q2 === "a"}
                onChange={handleChange}
              />{" "}
              Sad
            </label>
            <label>
              <input
                type="radio"
                name="q2"
                value="b"
                checked={questionAnswers.q2 === "b"}
                onChange={handleChange}
              />{" "}
              Excited
            </label>
            <label>
              <input
                type="radio"
                name="q2"
                value="c"
                checked={questionAnswers.q2 === "c"}
                onChange={handleChange}
              />{" "}
              Angry
            </label>
            <label>
              <input
                type="radio"
                name="q2"
                value="d"
                checked={questionAnswers.q2 === "d"}
                onChange={handleChange}
              />{" "}
              Joyful
            </label>
          </div>
        </div>

        <div className="question-block">
          <label>
            질문3. '사람들이 사는 장소'를 의미하는 단어는 무엇입니까?
          </label>
          <div>
            <label>
              <input
                type="radio"
                name="q3"
                value="a"
                checked={questionAnswers.q3 === "a"}
                onChange={handleChange}
              />{" "}
              School
            </label>
            <label>
              <input
                type="radio"
                name="q3"
                value="b"
                checked={questionAnswers.q3 === "b"}
                onChange={handleChange}
              />{" "}
              House
            </label>
            <label>
              <input
                type="radio"
                name="q3"
                value="c"
                checked={questionAnswers.q3 === "c"}
                onChange={handleChange}
              />{" "}
              Car
            </label>
            <label>
              <input
                type="radio"
                name="q3"
                value="d"
                checked={questionAnswers.q3 === "d"}
                onChange={handleChange}
              />{" "}
              Park
            </label>
          </div>
        </div>

        <div className="question-block">
          <label>
            질문4. 다음 문장을 완성하는 가장 적절한 단어는 무엇입니까: "나는
            잠자기 전에 ______을(를) 읽습니다."?
          </label>
          <div>
            <label>
              <input
                type="radio"
                name="q4"
                value="a"
                checked={questionAnswers.q4 === "a"}
                onChange={handleChange}
              />{" "}
              Plate
            </label>
            <label>
              <input
                type="radio"
                name="q4"
                value="b"
                checked={questionAnswers.q4 === "b"}
                onChange={handleChange}
              />{" "}
              Book
            </label>
            <label>
              <input
                type="radio"
                name="q4"
                value="c"
                checked={questionAnswers.q4 === "c"}
                onChange={handleChange}
              />{" "}
              Phone
            </label>
            <label>
              <input
                type="radio"
                name="q4"
                value="d"
                checked={questionAnswers.q4 === "d"}
                onChange={handleChange}
              />{" "}
              Chair
            </label>
          </div>
        </div>

        <div className="question-block">
          <label>질문5. 'city'의 복수형은 무엇입니까?</label>
          <div>
            <label>
              <input
                type="radio"
                name="q5"
                value="a"
                checked={questionAnswers.q5 === "a"}
                onChange={handleChange}
              />{" "}
              Cityes
            </label>
            <label>
              <input
                type="radio"
                name="q5"
                value="b"
                checked={questionAnswers.q5 === "b"}
                onChange={handleChange}
              />{" "}
              Cities
            </label>
            <label>
              <input
                type="radio"
                name="q5"
                value="c"
                checked={questionAnswers.q5 === "c"}
                onChange={handleChange}
              />{" "}
              Citys
            </label>
            <label>
              <input
                type="radio"
                name="q5"
                value="d"
                checked={questionAnswers.q5 === "d"}
                onChange={handleChange}
              />{" "}
              Citis
            </label>
          </div>
        </div>

        <div className="question-block">
          <label>질문6. 'quick'의 동의어는 무엇입니까?</label>
          <div>
            <label>
              <input
                type="radio"
                name="q6"
                value="a"
                checked={questionAnswers.q6 === "a"}
                onChange={handleChange}
              />{" "}
              Fast
            </label>
            <label>
              <input
                type="radio"
                name="q6"
                value="b"
                checked={questionAnswers.q6 === "b"}
                onChange={handleChange}
              />{" "}
              Slow
            </label>
            <label>
              <input
                type="radio"
                name="q6"
                value="c"
                checked={questionAnswers.q6 === "c"}
                onChange={handleChange}
              />{" "}
              Tall
            </label>
            <label>
              <input
                type="radio"
                name="q6"
                value="d"
                checked={questionAnswers.q6 === "d"}
                onChange={handleChange}
              />{" "}
              Soft
            </label>
          </div>
        </div>

        <div className="question-block">
          <label>질문7. 다음 중 올바른 문장은 무엇입니까?</label>
          <div>
            <label>
              <input
                type="radio"
                name="q7"
                value="a"
                checked={questionAnswers.q7 === "a"}
                onChange={handleChange}
              />{" "}
              She are my friend.
            </label>
            <label>
              <input
                type="radio"
                name="q7"
                value="b"
                checked={questionAnswers.q7 === "b"}
                onChange={handleChange}
              />{" "}
              She is my friend.
            </label>
            <label>
              <input
                type="radio"
                name="q7"
                value="c"
                checked={questionAnswers.q7 === "c"}
                onChange={handleChange}
              />{" "}
              She am my friend.
            </label>
            <label>
              <input
                type="radio"
                name="q7"
                value="d"
                checked={questionAnswers.q7 === "d"}
                onChange={handleChange}
              />{" "}
              She be my friend.
            </label>
          </div>
        </div>

        <div className="question-block">
          <label>질문8. 'go'의 과거형은 무엇입니까?</label>
          <div>
            <label>
              <input
                type="radio"
                name="q8"
                value="a"
                checked={questionAnswers.q8 === "a"}
                onChange={handleChange}
              />{" "}
              Goes
            </label>
            <label>
              <input
                type="radio"
                name="q8"
                value="b"
                checked={questionAnswers.q8 === "b"}
                onChange={handleChange}
              />{" "}
              Gone
            </label>
            <label>
              <input
                type="radio"
                name="q8"
                value="c"
                checked={questionAnswers.q8 === "c"}
                onChange={handleChange}
              />{" "}
              Went
            </label>
            <label>
              <input
                type="radio"
                name="q8"
                value="d"
                checked={questionAnswers.q8 === "d"}
                onChange={handleChange}
              />{" "}
              Going
            </label>
          </div>
        </div>

        <div className="question-block">
          <label>질문9. '가르치는 사람'을 의미하는 단어는 무엇입니까?</label>
          <div>
            <label>
              <input
                type="radio"
                name="q9"
                value="a"
                checked={questionAnswers.q9 === "a"}
                onChange={handleChange}
              />{" "}
              Student
            </label>
            <label>
              <input
                type="radio"
                name="q9"
                value="b"
                checked={questionAnswers.q9 === "b"}
                onChange={handleChange}
              />{" "}
              Teacher
            </label>
            <label>
              <input
                type="radio"
                name="q9"
                value="c"
                checked={questionAnswers.q9 === "c"}
                onChange={handleChange}
              />{" "}
              Doctor
            </label>
            <label>
              <input
                type="radio"
                name="q9"
                value="d"
                checked={questionAnswers.q9 === "d"}
                onChange={handleChange}
              />{" "}
              Driver
            </label>
          </div>
        </div>

        <div className="question-block">
          <label>
            질문10. 다음 문장을 완성하는 가장 적절한 단어는 무엇입니까: "나는
            애완 ______을(를) 가지고 있습니다."?
          </label>
          <div>
            <label>
              <input
                type="radio"
                name="q10"
                value="a"
                checked={questionAnswers.q10 === "a"}
                onChange={handleChange}
              />{" "}
              Apple
            </label>
            <label>
              <input
                type="radio"
                name="q10"
                value="b"
                checked={questionAnswers.q10 === "b"}
                onChange={handleChange}
              />{" "}
              Cat
            </label>
            <label>
              <input
                type="radio"
                name="q10"
                value="c"
                checked={questionAnswers.q10 === "c"}
                onChange={handleChange}
              />{" "}
              Car
            </label>
            <label>
              <input
                type="radio"
                name="q10"
                value="d"
                checked={questionAnswers.q10 === "d"}
                onChange={handleChange}
              />{" "}
              Chair
            </label>
          </div>
        </div>

        <div className="question-block">
          <label>질문11. 누군가의 이름을 묻는 올바른 방법은 무엇입니까?</label>
          <div>
            <label>
              <input
                type="radio"
                name="q11"
                value="a"
                checked={questionAnswers.q11 === "a"}
                onChange={handleChange}
              />{" "}
              What your name?
            </label>
            <label>
              <input
                type="radio"
                name="q11"
                value="b"
                checked={questionAnswers.q11 === "b"}
                onChange={handleChange}
              />{" "}
              What is you name?
            </label>
            <label>
              <input
                type="radio"
                name="q11"
                value="c"
                checked={questionAnswers.q11 === "c"}
                onChange={handleChange}
              />{" "}
              What is your name?
            </label>
            <label>
              <input
                type="radio"
                name="q11"
                value="d"
                checked={questionAnswers.q11 === "d"}
                onChange={handleChange}
              />{" "}
              What are your name?
            </label>
          </div>
        </div>

        <button onClick={handleSubmit}>측정 및 생성</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default QuestionModal;
