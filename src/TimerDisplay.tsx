import React, { useState, useMemo, memo } from "react";
import { Text, View } from "react-native";
import useInterval from "./hooks/useInterval";

interface Props {
	playing: boolean;
}
const TimerDisplay: React.FC<Props> = ({ playing }) => {
	const [time, setTime] = useState(0);

	useInterval(
		() => {
			setTime((prevTime) => prevTime + 1);
		},
		playing ? 1000 : undefined
	);

	const timeString = useMemo(
		() => new Date(time * 1000).toISOString().substr(11, 8),
		[time]
	);

	return (
		<View>
			<Text>{timeString}</Text>
		</View>
	);
};

export default memo(TimerDisplay);
