import { View, Text, TextInput } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { t } from "react-native-tailwindcss"
import * as Animatable from "react-native-animatable";

export default function V3InputField(props) {
  return (
	<Animatable.View animation="fadeInUp" style={[t.mY2]} delay={(props.delay != undefined) ? props.delay : 0}>
		<Text style={[{fontFamily: "Kodchasan_light", fontSize: 16}]}>{props.title}</Text>
		<View style={[t.wFull, t.flex, t.flexRow, t.itemsCenter]}>
			<TextInput placeholder={props.placeholder} style={[{fontFamily: "Kodchasan_light", fontSize: 16, borderBottomColor: "#00000080", borderBottomWidth: 1}, t.pX2, t.w3_5]} />
			<View style={[{borderBottomColor: "#00000080", borderBottomWidth: 1}, t.hFull, t.pT1]}>
				{(props.icon)}
			</View>
		</View>
	</Animatable.View>
  )
}