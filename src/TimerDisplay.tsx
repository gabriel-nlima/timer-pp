import React, { useState, useMemo, memo } from "react";
import { Text, View } from "react-native";
import useInterval from "./hooks/useInterval";

interface Props {
	paused?: boolean;
	step?: number;
}
const TimerDisplay: React.FC<Props> = ({ paused }) => {
	const [time, setTime] = useState(0);

	useInterval(
		() => {
			setTime((prevTime) => prevTime + 1);
		},
		paused ? undefined : 1000
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
