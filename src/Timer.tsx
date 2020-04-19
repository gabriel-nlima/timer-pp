import React, { useState, memo } from "react";
import { View, Button } from "react-native";
import useInterval from "./hooks/useInterval";
import DisplayTime from "./components/DisplayTime";

interface Props {
	playing: boolean;
	setIsPlaying: (playing: boolean) => void;
	setLoops: React.Dispatch<React.SetStateAction<number[]>>;
}

const Timer: React.FC<Props> = ({ playing, setIsPlaying, setLoops }) => {
	const [time, setTime] = useState(0);

	useInterval(
		() => {
			setTime((prevTime) => prevTime + 1);
		},
		playing ? 1000 : undefined
	);

	const resetTimer = () => {
		setTime(0);
		setIsPlaying(false);
	};

	return (
		<View>
			<DisplayTime time={time} />
			<Button
				onPress={() => setIsPlaying(!playing)}
				title={playing ? "Pause" : "Play"}
			/>
			<Button
				onPress={() => setLoops((prev) => [time, ...prev])}
				disabled={!playing}
				title={"Volta"}
			/>
			<Button onPress={resetTimer} disabled={!playing} title={"Reset"} />
		</View>
	);
};

export default memo(Timer);
