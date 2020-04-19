import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import TimerDisplay from "./TimerDisplay";
import { MessageType } from "./types";
import useInterval from "./hooks/useInterval";
declare const global: any;
const isHermes = () => global.HermesInternal !== undefined;
console.log(`Hermes enabled: ${isHermes()}`);

export default function App() {
	const [messages, setMessages] = useState<MessageType[]>([
		{ step: 20, active: true, msg: "EXERCICIO" },
		{ step: 10, active: false, msg: "CORRIDA PARADA" },
	]);
	const [msgsHistory, setMsgsHistory] = useState<MessageType[]>([]);
	const [currentMessage, setCurrentMessage] = useState<
		MessageType | undefined
	>(messages.find((m) => m.active));

	const [isPlaying, setIsPlaying] = useState(false);

	// Ativa a mensagem com menor tempo ao iniciar/se n houver mensagem ativa
	// Ordena o array do menor para maior
	useEffect(() => {
		const sortedMsgs = messages.sort((a, b) => a.step - b.step);
		if (!sortedMsgs.find((m) => m.active)) {
			sortedMsgs[0].active = true;
		}
		setMessages(sortedMsgs);
	}, [messages]);

	// Setta a mensagem ativa e adiciona no histórico
	useEffect(() => {
		const activeMsg = messages.find((m) => m.active);
		if (activeMsg) {
			setMsgsHistory((prev) => [
				{ ...activeMsg, msg: `${activeMsg.msg} (${prev.length + 1})` },
				...prev,
			]);
		}
		setCurrentMessage(activeMsg);
	}, [messages]);

	const setNextActiveMsg = useCallback(
		(msg: MessageType) => {
			if (msg.active) {
				const msgs = Array.from(messages);
				const msgIndex = msgs.findIndex((m) => m.active);
				if (msgIndex > -1) {
					// Desativa a mensagem atual e ativa a próxima
					msgs[msgIndex].active = false;
					if (msgIndex + 1 <= messages.length - 1) {
						msgs[msgIndex + 1].active = true;
					} else {
						// Chegou no final do array, ativa a primeira mensagem (com menor tempo)
						msgs[0].active = true;
					}
				}
				setMessages(msgs);
			}
		},
		[messages]
	);

	useInterval(
		() => {
			currentMessage && setNextActiveMsg(currentMessage);
		},
		isPlaying && currentMessage && currentMessage.active
			? currentMessage.step * 1000
			: undefined
	);

	return (
		<View style={styles.container}>
			{isHermes() && <Text>Engine: Hermes</Text>}
			<Text>{currentMessage?.msg}</Text>
			<TimerDisplay playing={isPlaying} />
			{msgsHistory.map((message, idx) => (
				<Text key={idx}>{message.msg}</Text>
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
