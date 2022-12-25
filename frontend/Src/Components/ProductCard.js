import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { t } from "react-native-tailwindcss";
import axios from 'axios';

export default function ProductCard(props) {
  return (
	<TouchableOpacity style={[t.wFull, t.pY2, t.pX2, t.flex, t.flexRow, t.itemsCenter, t.bgWhite, t.roundedLg, {
		shadowColor: 'rgba(0, 0, 0, 0.1)',
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 8,
		elevation: 5,
	}, props._style]} onPress={()=>{props.trigger()}}>
		<Image source={{uri: axios.defaults.baseURL + props.img}} style={[{height: 45, width: 45}, t.bgGray300, t.roundedLg]} />
		<Text style={[{color: "#00000080"}, t.mL2]}>{props.name}</Text>
		<View style={[t.absolute, t.right0, t.hFull, t.mR2, t.itemsCenter, t.justifyCenter]}>
			<Text style={[t.mL2]}>{props.price}kr</Text>
		</View>
	</TouchableOpacity>
  )
}