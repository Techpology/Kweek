import { View, Text, Animated, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Animatable from "react-native-animatable";
import { t } from "react-native-tailwindcss";
import GifImage from '@lowkey/react-native-gif';

import { AntDesign } from '@expo/vector-icons'; 

import Loading from "../Images/Loading.gif"

export default function LoadingCard(props) {
	return (
		<Animatable.View style={[{width: "75%", height: "25%"}, t.selfCenter, t.flex, t.itemsCenter, t.justifyCenter, t.mX3, t.mY2, t.bgWhite, t.roundedLg,{
			shadowColor: 'rgba(0, 0, 0, 0.5)',
			shadowOffset: {width: 0, height: 2},
			shadowRadius: 8,
			elevation: 5,
		}]} animation="fadeInUp" >
			<GifImage source={Loading} style={[{width: 64, height: 64}]} />
			<Text style={[{fontSize: 16, fontWeight: "300"}, t.textCenter]}>{(props.inner == undefined) ? "Loading..." : props.inner}</Text>
		</Animatable.View>
	)
}