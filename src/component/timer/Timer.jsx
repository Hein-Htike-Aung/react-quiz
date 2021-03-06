import { useEffect } from 'react';
import { useState } from 'react';

const Timer = ({ setStop, questionNumber }) => {
	const [timer, setTimer] = useState(30);

	useEffect(() => {
		if (timer === 0) return setStop(true);

		const interval = setInterval(() => {
			setTimer((prev) => prev - 1);
		}, 1000);

        // Clear Interval
		return () => clearInterval(interval);
	}, [setStop, timer]);

	// set timer after changing the question number
	useEffect(() => {
		setTimer(30);
	}, [questionNumber]);

	return timer;
};

export default Timer;
