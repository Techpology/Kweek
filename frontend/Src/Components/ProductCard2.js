import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { t } from "react-native-tailwindcss";
import axios from 'axios';

import Btn from './Btn';

export default function ProductCard(props) {

	return(
		<TouchableOpacity style={[{minWidth: "45%", minHeight: 220}, t.pB2, t.flex, t.flexCol, t.bgWhite, {
			shadowColor: 'rgba(0, 0, 0, 0.5)',
			shadowOffset: {width: 0, height: 2},
			shadowRadius: 8,
			elevation: 5,
			borderBottomLeftRadius: 8,
			borderBottomRightRadius: 8
		}, t.itemsCenter]} onPress={()=>{props.trigger()}}>
			<Image source={{uri: axios.defaults.baseURL + props.img}} style={[{height: 150}, t.resizeContain, t.wFull, t.bgWhite]} />
			<Text style={[{fontSize: 16}, t.mX1]}>{props.name}</Text>
		</TouchableOpacity>
	)
}