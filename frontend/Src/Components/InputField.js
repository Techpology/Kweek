import { View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'
import { t } from "react-native-tailwindcss"

export default function InputField(props) {

	const [text, setText] = useState(props._text)
	return (
		<View style={[t.flex, t.flexCol, t.wFull, t.pX10, props.style]}>
			<Text style={[t.fontNormal]}>{props.title}</Text>
			<TextInput secureTextEntry={props.secure}
				keyboardType={props.type}
				autoCapitalize={'none'}
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
				}, props._style]} placeholder={props.placeholder} value={text}
				onChangeText={(e)=>{setText(e); props.val(e)}} 
				multiline={true} numberOfLines={(props.multi) ? props.lines : 0}
			/>
		</View>
	)
}