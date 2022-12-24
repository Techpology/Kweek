import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'

export default function Popup(props) {
  return (
	<View style={[t.absolute, t.wFull, t.hFull, {backgroundColor: "#00000040"}, t.itemsCenter, t.justifyCenter, t.z10]}>
		<TouchableOpacity style={[t.absolute, t.wFull, t.hFull, t.z10]} onPress={()=>{props.pressOut()}} />
		<View style={[{width: "90%", height: "45%", borderRadius: 20}, t.bgWhite, t.z20, t.flex, t.flexCol, t.pX4, t.pY4, props._style]}>
			<Text style={[t.text2xl, t.selfCenter]}>{props.title}</Text>
			{props.children}
		</View>
	</View>
  )
}