import { View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'
import { t } from "react-native-tailwindcss"
import { Ionicons } from '@expo/vector-icons'; 

export default function Search(props) {
	const [text, setText] = useState("")
	return (
		<View style={[t.flex, t.flexCol, t.wFull, t.pX16, props.style]}>
			<Text style={[t.fontNormal, t.textXl]}>{props.title}</Text>
			<View style={[t.flex, t.flexRow]}>
				<TextInput secureTextEntry={props.secure}
					style={[t.wFull, t.bgWhite,
					{
						borderRadius: 8,
						height: 50,
						shadowColor: 'rgba(0, 0, 0, 0.1)',
						shadowOffset: {width: 0, height: 2},
						shadowRadius: 8,
						elevation: 4,
						paddingHorizontal: 12,
						fontSize: 16
					}]} placeholder={props.placeholder} text={text}
					onChangeText={(e)=>{setText(e); props.val(e)}} />
					<View style={[t.bgWhite, t.absolute, t.right0, t.mR4, t.hFull, t.flex, t.itemsCenter, t.justifyCenter]}>
						<Ionicons name="ios-search" size={24} color={(props.searchIC) ? "black" : "gray"} />
					</View>
			</View>
		</View>
	)
}