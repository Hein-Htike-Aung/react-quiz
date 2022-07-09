import React, { useEffect } from 'react';
import { useState } from 'react';
import useSound from 'use-sound';
import './trivia.css';
import play from '../../sounds/play.mp3';
import correct from '../../sounds/correct.mp3';
import wrong from '../../sounds/play.mp3';

const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {
	const [question, setQuestion] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [activeAnswer, setActiveAnswer] = useState('answer');

	const [letsPlay] = useSound(play);
	const [correctAnswer] = useSound(correct);
	const [wrongAnswer] = useSound(wrong);

	// useEffect(() => {
	// 	letsPlay();
	// }, [letsPlay]);

	useEffect(() => {
		// -1 (question number starts with 1)
		setQuestion(data[questionNumber - 1]);
	}, [data, questionNumber]);

	const delay = (duration, callback) => {
		setTimeout(() => {
			callback();
		}, duration);
	};

	const handleAnswer = (a) => {
		setSelectedAnswer(a);

		setActiveAnswer('answer active');

		// wait 3s to check the answer
		delay(3000, () => {
			setActiveAnswer(a.correct ? 'answer correct' : 'answer wrong');
		});

		// wait 5 secs to wait the animation (3s long) finished
		delay(5000, () => {
			if (a.correct) {
				correctAnswer();

				delay(1000, () => {
					setQuestionNumber((prev) => prev + 1);
					setSelectedAnswer(null);
				});
			} else {
				wrongAnswer();

				delay(1000, () => {
					setStop(true);
				});
			}
		});
	};

	return (
		<div className='trivia'>
			<div className='question'>{question?.question}</div>
			<div className='answers'>
				{question?.answers.map((a) => (
					<div
						className={selectedAnswer === a ? activeAnswer : 'answer'}
						onClick={() => handleAnswer(a)}
					>
						{a.text}
					</div>
				))}
			</div>
		</div>
	);
};

export default Trivia;
