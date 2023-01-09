import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import * as Animatable from "react-native-animatable";
import axios from 'axios'

export default function WideBtn(props) {
  return (
	<Animatable.View animation="fadeInDown" style={[t.wFull, {height: 50}, t.mB4]} delay={(props.delay != undefined) ? props.delay : 0}>
		<TouchableOpacity onPress={()=>{props.trigger()}} style={[t.wFull, t.hFull, t.bgWhite, 
		{
			shadowColor: 'rgba(0, 0, 0, 0.2)',
			shadowOffset: {width: 0, height: 2},
			shadowRadius: 8,
			elevation: 5,
			borderRadius: 10
		}, t.justifyCenter, t.pX4]}>
			<Text style={[{fontSize: 16}, props.style]}>{props.inner}</Text>
		</TouchableOpacity>
	</Animatable.View>
  )
}