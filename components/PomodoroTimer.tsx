'use client';

import React, { useState, useEffect } from "react";
import { FaStop, FaPlay, FaPause } from "react-icons/fa";

const PomodoroTimer = () => {
	const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
	const [isRunning, setIsRunning] = useState(false);
	const [customTime, setCustomTime] = useState("25:00");
	const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (isRunning && timeLeft > 0) {
			timer = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
		} else if (timeLeft === 0 && isRunning) {
			setIsRunning(false);
			playAlarmSound();
		}

		return () => {
			if (timer) clearInterval(timer);
		};
	}, [isRunning, timeLeft]);

	const playAlarmSound = () => {
		try {
			// Create audio context if it doesn't exist
			if (!audioContext) {
				const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
				setAudioContext(newAudioContext);
			}

			const ctx = audioContext || new (window.AudioContext || (window as any).webkitAudioContext)();
			
			// Create oscillator for the alarm sound
			const oscillator = ctx.createOscillator();
			const gainNode = ctx.createGain();

			oscillator.connect(gainNode);
			gainNode.connect(ctx.destination);

			// Create a pleasant alarm pattern (3 beeps)
			const now = ctx.currentTime;
			
			// First beep
			oscillator.frequency.setValueAtTime(523, now); // C5
			gainNode.gain.setValueAtTime(0.3, now);
			gainNode.gain.setValueAtTime(0, now + 0.3);
			
			// Second beep
			oscillator.frequency.setValueAtTime(659, now + 0.5); // E5
			gainNode.gain.setValueAtTime(0.3, now + 0.5);
			gainNode.gain.setValueAtTime(0, now + 0.8);
			
			// Third beep
			oscillator.frequency.setValueAtTime(784, now + 1.0); // G5
			gainNode.gain.setValueAtTime(0.3, now + 1.0);
			gainNode.gain.setValueAtTime(0, now + 1.3);

			oscillator.start(now);
			oscillator.stop(now + 1.5);
		} catch (error) {
			console.log('Failed to play alarm sound:', error);
		}
	};

	const toggleTimer = async () => {
		// Initialize audio context on first user interaction
		if (!audioContext && 'AudioContext' in window) {
			const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
			setAudioContext(newAudioContext);
		}
		setIsRunning(!isRunning);
	};

	const resetTimer = () => {
		setIsRunning(false);
		const totalSeconds = parseTimeToSeconds(customTime);
		setTimeLeft(totalSeconds);
	};

	const parseTimeToSeconds = (timeString: string): number => {
		if (!timeString || timeString.trim() === '') {
			return 25 * 60; // Default 25 minutes
		}

		const parts = timeString.split(':');
		if (parts.length === 2) {
			const minutes = parseInt(parts[0]) || 0;
			const seconds = parseInt(parts[1]) || 0;
			return Math.max(0, minutes * 60 + seconds);
		} else if (parts.length === 1) {
			// If only one number, treat as minutes
			const minutes = parseInt(parts[0]) || 0;
			return Math.max(0, minutes * 60);
		}
		return 25 * 60; // Default 25 minutes
	};

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		
		// Allow MM:SS format or just numbers
		if (/^(\d{0,2}:?\d{0,2})$/.test(value) || value === '') {
			setCustomTime(value);
			if (!isRunning) {
				const totalSeconds = parseTimeToSeconds(value);
				// Only update timeLeft if it's a valid time and not zero
				if (totalSeconds > 0) {
					setTimeLeft(totalSeconds);
				}
			}
		}
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<div className="flex items-center space-x-3 px-2">
			<input
				type="text"
				value={isRunning ? formatTime(timeLeft) : customTime}
				onChange={handleTimeChange}
				className="w-20 text-center rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
				placeholder="25:00"
				disabled={isRunning}
			/>
			<button
				onClick={toggleTimer}
				className="text-gray-600 hover:text-blue-600 transition-colors"
				aria-label={isRunning ? "Pause Timer" : "Start Timer"}
			>
				{isRunning ? <FaPause /> : <FaPlay />}
			</button>
			<button
				onClick={resetTimer}
				className="text-gray-600 hover:text-red-600 transition-colors"
				aria-label="Reset Timer"
			>
				<FaStop />
			</button>
		</div>
	);
};

export default PomodoroTimer; 