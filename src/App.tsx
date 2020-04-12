import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import TimerDisplay from "./TimerDisplay";
import MessageHandler from "./MessageHandler";
import { MessageType } from "./types";
declare const global: any;
const isHermes = () => global.HermesInternal !== undefined;
console.log(`Hermes enabled: ${isHermes()}`);

export default function App() {
	const [messages, setMessages] = useState<MessageType[]>([
		{ step: 10 },
		{ step: 20, msg: "Passaram 25 segundos" },
	]);
	const [currentMessage, setCurrentMessage] = useState<
		MessageType | undefined
	>();
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<View style={styles.container}>
			{isHermes() && <Text>Engine: Hermes</Text>}
			<Text>{currentMessage}</Text>
			<TimerDisplay paused={!isPlaying} />
			{messages.map((message, idx) => (
				<MessageHandler
					key={idx}
					message={message}
					paused={!isPlaying}
					setCurrentMessage={setCurrentMessage}
				/>
			))}
			<Button
				onPress={() => setIsPlaying(!isPlaying)}
				title={isPlaying ? "Pause" : "Play"}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
