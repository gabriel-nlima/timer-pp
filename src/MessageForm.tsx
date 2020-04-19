import React, { useMemo, memo, useState } from "react";
import { Text, TextInput, View, Button, Switch } from "react-native";
import { MessageType } from "./types";

interface Props {
	setMessage: (msg: MessageType) => void;
	playing: boolean;
	message?: MessageType;
}

const MessageForm: React.FC<Props> = ({ message, playing, setMessage }) => {
	const [data, setData] = useState(message);

	const inputHandler = (value: string, key: keyof MessageType) => {
		setData(
			(prev) =>
				({
					...prev,
					[key]: key === "step" ? Number(value) : value,
				} as MessageType)
		);
	};

	const toggleActive = () => {
		setData(
			(prevData) =>
				prevData && {
					...prevData,
					active: prevData.active ? !prevData.active : true,
				}
		);
	};

	const handleSubmit = () => {
		if (!playing && data && data.step && data.msg) {
			setMessage(data);
		}
	};

	return (
		<View>
			<Text>Intervalo (em segundos):</Text>
			<TextInput
				value={data && data.step ? `${data.step}` : ""}
				placeholder="Intervalo"
				keyboardType="number-pad"
				onChangeText={(text) => inputHandler(text, "step")}
				editable={!playing}
			/>
			<Text>Mensagem:</Text>
			<TextInput
				value={data && data.msg ? `${data.msg}` : ""}
				placeholder="Mensagem"
				onChangeText={(text) => inputHandler(text, "msg")}
				editable={!playing}
			/>
			<Switch
				trackColor={{ false: "#767577", true: "#81b0ff" }}
				thumbColor={data && data.active ? "#f5dd4b" : "#f4f3f4"}
				ios_backgroundColor="#3e3e3e"
				onValueChange={toggleActive}
				value={data && data.active}
				disabled={playing}
			/>
			<Button
				onPress={handleSubmit}
				title="Adicionar"
				disabled={playing}
			/>
		</View>
	);
};

export default memo(MessageForm);
