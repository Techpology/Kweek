import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'

export default function WideBtn(props) {
  return (
	<TouchableOpacity onPress={()=>{props.trigger()}} style={[t.wFull, {height: 60}, t.bgWhite, 
	{
		shadowColor: 'rgba(0, 0, 0, 0.1)',
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 4
	}, t.justifyCenter, t.pX4, t.mB4]}>
		<Text style={[{fontSize: 16}, props.style]}>{props.inner}</Text>
	</TouchableOpacity>
  )
}