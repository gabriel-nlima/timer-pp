import React, { useMemo, memo } from "react";
import { Text, View } from "react-native";

interface Props {
	time: number;
}

const DisplayTime: React.FC<Props> = ({ time }) => {
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

export default memo(DisplayTime);
