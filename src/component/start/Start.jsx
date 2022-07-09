import React from 'react';
import { useRef } from 'react';
import './start.css';

const Start = ({ setUsername }) => {
	const inputRef = useRef();

	const handleStart = () => {
		inputRef.current.value && setUsername(inputRef.current.value);
	};

	return (
		<div className='start'>
			<input
				ref={inputRef}
				type='text'
				placeholder='Enter your name'
				className='startInput'
			/>
			<button className='startButton' onClick={handleStart}>
				Start
			</button>
		</div>
	);
};

export default Start;
