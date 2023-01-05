import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { t } from "react-native-tailwindcss"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function WideImgBtn(props) {
  return (
	<TouchableOpacity style={[t.wFull, {height: 60}, t.flex, t.flexRow, t.itemsCenter, t.bgWhite, t.mT2, t.roundedLg, 
	{
		shadowColor: 'rgba(0, 0, 0, 0.1)',
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 8,
		elevation: 5,
	}]} onPress={()=>{props.trigger()}}>
		{
			(props.img != undefined) ?
			<Image source={{uri: props.img}} style={[t.roundedFull, t.mL4, {width: 50, height: 50}, 
			{
				shadowColor: 'rgba(0, 0, 0, 0.1)',
				shadowOffset: {width: 0, height: 2},
				shadowRadius: 8,
				elevation: 5,
			}]}/>
			:
			<></>
		}
		<View style={[t.hFull, t.flex, t.flexCol, t.justifyCenter]}>
			<Text style={[t.mL4, ((props.under != undefined) ? t.fontMedium : t.fontLight), t.textBlack]}>{props.inner}</Text>
			{(props.under != undefined) ? <Text style={[t.mL4, t.fontLight, t.textBlack]}>{props.under}</Text> : <></> }
		</View>
		{(props.controls) ?
			<TouchableOpacity style={[t.w1_6, t.absolute, t.right0, t.hFull, t.itemsCenter, t.justifyCenter]} onPress={()=>{props.closePress()}}>
				<MaterialCommunityIcons name="window-close" size={24} color="black" />
			</TouchableOpacity> : <></>
		}
	</TouchableOpacity>
  )
}