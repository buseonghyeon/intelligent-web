import React, { useState } from 'react';
import '../css/QuestionModal.css'; // 모달 스타일링 파일을 임포트

const QuestionModal = ({ isOpen, onClose, onSubmit }) => {
    const [questionAnswers, setQuestionAnswers] = useState({
        age: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: '',
        q7: '',
        q8: '',
        q9: '',
        q10: '',
        q11: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestionAnswers({
            ...questionAnswers,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const userId = localStorage.getItem('userId'); // 로그인된 사용자 ID를 가져옴
        onSubmit({ user_id: userId, answers: questionAnswers });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>맞춤형 질문</h2>

                <div className="question-block">
                    <label>질문1. 나이는 어떻게 되나요?</label>
                    <input type="text" name="age" value={questionAnswers.age} onChange={handleChange} />
                </div>

                <div className="question-block">
                    <label>질문2. 'happy'의 반대말은 무엇입니까?</label>
                    <div>
                        <label><input type="radio" name="q2" value="Sad" checked={questionAnswers.q2 === 'Sad'} onChange={handleChange} /> Sad</label>
                        <label><input type="radio" name="q2" value="Excited" checked={questionAnswers.q2 === 'Excited'} onChange={handleChange} /> Excited</label>
                        <label><input type="radio" name="q2" value="Angry" checked={questionAnswers.q2 === 'Angry'} onChange={handleChange} /> Angry</label>
                        <label><input type="radio" name="q2" value="Joyful" checked={questionAnswers.q2 === 'Joyful'} onChange={handleChange} /> Joyful</label>
                    </div>
                </div>

                <div className="question-block">
                    <label>질문3. '사람들이 사는 장소'를 의미하는 단어는 무엇입니까?</label>
                    <div>
                        <label><input type="radio" name="q3" value="School" checked={questionAnswers.q3 === 'School'} onChange={handleChange} /> School</label>
                        <label><input type="radio" name="q3" value="House" checked={questionAnswers.q3 === 'House'} onChange={handleChange} /> House</label>
                        <label><input type="radio" name="q3" value="Car" checked={questionAnswers.q3 === 'Car'} onChange={handleChange} /> Car</label>
                        <label><input type="radio" name="q3" value="Park" checked={questionAnswers.q3 === 'Park'} onChange={handleChange} /> Park</label>
                    </div>
                </div>

                <div className="question-block">
                    <label>질문4. 다음 문장을 완성하는 가장 적절한 단어는 무엇입니까: "나는 잠자기 전에 ______을(를) 읽습니다."?</label>
                    <div>
                        <label><input type="radio" name="q4" value="Plate" checked={questionAnswers.q4 === 'Plate'} onChange={handleChange} /> Plate</label>
                        <label><input type="radio" name="q4" value="Book" checked={questionAnswers.q4 === 'Book'} onChange={handleChange} /> Book</label>
                        <label><input type="radio" name="q4" value="Phone" checked={questionAnswers.q4 === 'Phone'} onChange={handleChange} /> Phone</label>
                        <label><input type="radio" name="q4" value="Chair" checked={questionAnswers.q4 === 'Chair'} onChange={handleChange} /> Chair</label>
                    </div>
                </div>

                <div className="question-block">
                    <label>질문5. 'city'의 복수형은 무엇입니까?</label>
                    <div>
                        <label><input type="radio" name="q5" value="Cityes" checked={questionAnswers.q5 === 'Cityes'} onChange={handleChange} /> Cityes</label>
                        <label><input type="radio" name="q5" value="Cities" checked={questionAnswers.q5 === 'Cities'} onChange={handleChange} /> Cities</label>
                        <label><input type="radio" name="q5" value="Citys" checked={questionAnswers.q5 === 'Citys'} onChange={handleChange} /> Citys</label>
                        <label><input type="radio" name="q5" value="Citis" checked={questionAnswers.q5 === 'Citis'} onChange={handleChange} /> Citis</label>
                    </div>
                </div>

                <div className="question-block">
                    <label>질문6. 'quick'의 동의어는 무엇입니까?</label>
                    <div>
                        <label><input type="radio" name="q6" value="Fast" checked={questionAnswers.q6 === 'Fast'} onChange={handleChange} /> Fast</label>
                        <label><input type="radio" name="q6" value="Slow" checked={questionAnswers.q6 === 'Slow'} onChange={handleChange} /> Slow</label>
                        <label><input type="radio" name="q6" value="Tall" checked={questionAnswers.q6 === 'Tall'} onChange={handleChange} /> Tall</label>
                        <label><input type="radio" name="q6" value="Soft" checked={questionAnswers.q6 === 'Soft'} onChange={handleChange} /> Soft</label>
                    </div>
                </div>

                <div className="question-block">
                    <label>질문7. 다음 중 올바른 문장은 무엇입니까?</label>
                    <div>
                        <label><input type="radio" name="q7" value="She are my friend." checked={questionAnswers.q7 === 'She are my friend.'} onChange={handleChange} /> She are my friend.</label>
                        <label><input type="radio" name="q7" value="She is my friend." checked={questionAnswers.q7 === 'She is my friend.'} onChange={handleChange} /> She is my friend.</label>
                        <label><input type="radio" name="q7" value="She am my friend." checked={questionAnswers.q7 === 'She am my friend.'} onChange={handleChange} /> She am my friend.</label>
                        <label><input type="radio" name="q7" value="She be my friend." checked={questionAnswers.q7 === 'She be my friend.'} onChange={handleChange} /> She be my friend.</label>
                    </div>
                </div>

                <div className="question-block">
                    <label>질문8. 'go'의 과거형은 무엇입니까?</label>
                    <div>
                        <label><input type="radio" name="q8" value="Goes" checked={questionAnswers.q8 === 'Goes'} onChange={handleChange} /> Goes</label>
                        <label><input type="radio" name="q8" value="Gone" checked={questionAnswers.q8 === 'Gone'} onChange={handleChange} /> Gone</label>
                        <label><input type="radio" name="q8" value="Went" checked={questionAnswers.q8 === 'Went'} onChange={handleChange} /> Went</label>
                        <label><input type="radio" name="q8" value="Going" checked={questionAnswers.q8 === 'Going'} onChange={handleChange} /> Going</label>
                    </div>
                </div>

                <div className="question-block">
                    <label>질문9. '가르치는 사람'을 의미하는 단어는 무엇입니까?</label>
                    <div>
                        <label><input type="radio" name="q9" value="Student" checked={questionAnswers.q9 === 'Student'} onChange={handleChange} /> Student</label>
                        <label><input type="radio" name="q9" value="Teacher" checked={questionAnswers.q9 === 'Teacher'} onChange={handleChange} /> Teacher</label>
                        <label><input type="radio" name="q9" value="Doctor" checked={questionAnswers.q9 === 'Doctor'} onChange={handleChange} /> Doctor</label>
                        <label><input type="radio" name="q9" value="Driver" checked={questionAnswers.q9 === 'Driver'} onChange={handleChange} /> Driver</label>
                    </div>
                </div>

                <div className="question-block">
                    <label>질문10. 다음 문장을 완성하는 가장 적절한 단어는 무엇입니까: "나는 애완 ______을(를) 가지고 있습니다."?</label>
                    <div>
                        <label><input type="radio" name="q10" value="Apple" checked={questionAnswers.q10 === 'Apple'} onChange={handleChange} /> Apple</label>
                        <label><input type="radio" name="q10" value="Cat" checked={questionAnswers.q10 === 'Cat'} onChange={handleChange} /> Cat</label>
                        <label><input type="radio" name="q10" value="Car" checked={questionAnswers.q10 === 'Car'} onChange={handleChange} /> Car</label>
                        <label><input type="radio" name="q10" value="Chair" checked={questionAnswers.q10 === 'Chair'} onChange={handleChange} /> Chair</label>
                    </div>
                </div>

                <div className="question-block">
                    <label>질문11. 누군가의 이름을 묻는 올바른 방법은 무엇입니까?</label>
                    <div>
                        <label><input type="radio" name="q11" value="What your name?" checked={questionAnswers.q11 === 'What your name?'} onChange={handleChange} /> What your name?</label>
                        <label><input type="radio" name="q11" value="What is you name?" checked={questionAnswers.q11 === 'What is you name?'} onChange={handleChange} /> What is you name?</label>
                        <label><input type="radio" name="q11" value="What is your name?" checked={questionAnswers.q11 === 'What is your name?'} onChange={handleChange} /> What is your name?</label>
                        <label><input type="radio" name="q11" value="What are your name?" checked={questionAnswers.q11 === 'What are your name?'} onChange={handleChange} /> What are your name?</label>
                    </div>
                </div>

                <button onClick={handleSubmit}>측정 및 생성</button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default QuestionModal;
