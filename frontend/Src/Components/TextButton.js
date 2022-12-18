import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function TextButton(props) {
	return (
		<View style={[props.style]}>
			<TouchableOpacity onPress={()=>{props.trigger()}}>
				<Text style={[
					{
						textDecorationLine: 'underline',
						color: "#00000080",
						fontSize: 14,
						fontWeight: "400",
					}
				]}>{props.inner}</Text>
			</TouchableOpacity>
		</View>
	)
}