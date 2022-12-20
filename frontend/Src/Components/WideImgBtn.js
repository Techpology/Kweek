import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"

export default function WideImgBtn(props) {
  return (
	<TouchableOpacity style={[t.wFull, {height: 80}, t.flex, t.flexRow, t.itemsCenter, t.bgWhite, t.mY2, t.roundedLg, 
	{
		shadowColor: 'rgba(0, 0, 0, 0.1)',
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 8,
		elevation: 5,
	}]} onPress={()=>{alert("test")}}>
		<Image source={{uri: props.img}} style={[t.roundedFull, t.mL4, {width: 65, height: 65}, 
		{
			shadowColor: 'rgba(0, 0, 0, 0.1)',
			shadowOffset: {width: 0, height: 2},
			shadowRadius: 8,
			elevation: 5,
		}]}/>
		<Text style={[t.textXl, t.mL4, t.fontLight, t.textBlack]}>{props.inner}</Text>
	</TouchableOpacity>
  )
}