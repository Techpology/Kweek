import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'

export default function SqBtn(props) {
  return (
	<TouchableOpacity onPress={()=>{props.trigger()}} style={[
		{
			width: 45,
			height: 45,
			backgroundColor: "#FFFFFF",
			borderRadius: 8,
			shadowColor: 'rgba(0, 0, 0, 0.4)',
			shadowOffset: {width: 0, height: 2},
			shadowRadius: 8,
			elevation: 4,
		}, t.itemsCenter, t.justifyCenter, props.style
		]}>
			<Text style={[{color: "#00000080"}, props.textStyle]}>{props.inner}</Text>
	</TouchableOpacity>
  )
}