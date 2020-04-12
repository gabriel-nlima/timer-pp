import React, { useState, useMemo } from "react";
import { Text, View } from "react-native";
import useInterval from "./hooks/useInterval";
import { MessageType } from "./types";

interface Props {
	message: MessageType;
	paused?: boolean;
	setCurrentMessage?: (msg: MessageType) => void;
}

const MessageHandler: React.FC<Props> = ({
	paused,
	setCurrentMessage,
	message,
}) => {
	const [showMsg, setShowMsg] = useState<string | undefined>();

	const defaultMsg = useMemo(() => `Passaram ${message.step} segundos`, [
		message.step,
	]);

	useInterval(
		() => {
			setShowMsg(message.msg || defaultMsg);
			setCurrentMessage && setCurrentMessage(message);
		},
		paused ? undefined : message.step * 1000
	);

	return <View>{!!showMsg && <Text>{showMsg}</Text>}</View>;
};

export default MessageHandler;
