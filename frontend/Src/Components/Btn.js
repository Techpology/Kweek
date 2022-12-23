import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { t } from "react-native-tailwindcss"

export default function Btn(props) {
  return (
	<TouchableOpacity onPress={()=>{props.trigger()}} style={[
		{
			width: 130,
			height: 55,
			backgroundColor: "#55D967",
			borderRadius: 8
		}, t.itemsCenter, t.justifyCenter, props.style
		]}>
	  <Text style={[t.textWhite, {fontSize: 20}, props._style]}>{props.inner}</Text>
	</TouchableOpacity>
  )
}