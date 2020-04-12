import React from "react";
import { StyleSheet, Text, View } from "react-native";
declare const global: any;
const isHermes = () => global.HermesInternal !== undefined;
console.log(`Hermes enabled: ${isHermes()}`);

export default function App() {
	return (
		<View style={styles.container}>
			{isHermes() && <Text>Engine: Hermes</Text>}
			<Text>Open up App.tsx to start working on your app!</Text>
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
