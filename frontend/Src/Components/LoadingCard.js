import { View, Text, Animated, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Animatable from "react-native-animatable";
import { t } from "react-native-tailwindcss";
import AnimatedLoader from 'react-native-animated-loader';

import { AntDesign } from '@expo/vector-icons';

export default function LoadingCard(props) {
	const [visible, setVisible] = useState(true);

	return (
		<AnimatedLoader
		visible={visible}
		overlayColor={"rgba(255,255,255,0.75)"}
		animationStyle={styles.lottie}
		source={{uri: "https://assets4.lottiefiles.com/private_files/lf30_ykdoon9j.json"}}
		loop={true}
		speed={1}>
			<Text style={[{fontSize: 16, fontWeight: "300"}, t.textCenter]}>{(props.inner == undefined) ? "Loading..." : props.inner}</Text>
		</AnimatedLoader>
	)
}

const styles = StyleSheet.create({
	lottie: {
	  width: 100,
	  height: 100,
	},
  });
