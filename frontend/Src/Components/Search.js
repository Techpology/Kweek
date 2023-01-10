import { View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'
import { t } from "react-native-tailwindcss"
import { Ionicons } from '@expo/vector-icons'; 

export default function Search(props) {
	const [text, setText] = useState("")
	return (
		<View style={[t.flex, t.flexCol, t.wFull, t.pX8, props.style]}>
			<Text style={[t.fontNormal, t.textXl]}>{props.title}</Text>
			<View style={[t.flex, t.flexRow]}>

				<View style={[t.bgWhite, t.absolute, t.left0, t.mL4, t.hFull, t.flex, t.itemsCenter, t.justifyCenter, t.z10]}>
					<Ionicons name="ios-search" size={24} color={(props.searchIC) ? "black" : "gray"} />
				</View>
				
				<TextInput secureTextEntry={props.secure}
					onFocus={()=>{props.onFocus()}}
					style={[t.wFull, t.bgWhite,
					{
						borderRadius: 10,
						height: 50,
						shadowColor: 'rgba(0, 0, 0, 0.1)',
						shadowOffset: {width: 0, height: 2},
						shadowRadius: 8,
						elevation: 4,
						paddingLeft: 50,
						fontSize: 16
					}]} placeholder={props.placeholder} text={text}
					onChangeText={(e)=>{setText(e); props.val(e)}} />
			</View>
		</View>
	)
}