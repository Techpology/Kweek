import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import Logo from "../Images/Logo"

import InputField from '../Components/InputField'
import TextButton from '../Components/TextButton'
import Btn from '../Components/Btn'

export default function Signup(props) {

	const [index, setIndex] = useState(0)

	const flow = ()=>
	{
		if(index == 0)
		{
			return(
				<View style={[t.wFull]}>
					<InputField title="Full name" placeholder="full-name" val={(e)=>{setFullName(e)}} style={[t.mB8]} />
					<InputField title="Email" placeholder="e-mail" val={(e)=>{setEmail(e)}} />
				</View>
			)
		}else if(index == 1)
		{
			return(
				<View style={[t.wFull]}>
					<InputField title="Password" placeholder="password" val={(e)=>{setPassword(e)}} />
				</View>
			)
		}else if(index == 2)
		{
			return(
				<View style={[t.wFull]}>
					<InputField title="Password" placeholder="password" val={(e)=>{setPassword(e)}} />
				</View>
			)
		}
	}

	const increment = () =>
	{
		setIndex(index + 1)
	}

	const [fullName, setFullName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	return (
		<View style={[{backgroundColor: "#F8F8F8"}, t.wFull, t.hFull]}>
			<View style={[t.hFull, t.wFull, t.flex, t.flexCol, t.itemsCenter, t.justifyCenter]}>
				<Logo />
				{flow()}
				<Btn inner="Next" style={[t.mT12]} trigger={()=>{increment()}} />
				<TextButton inner="Already have an account?" trigger={()=>{props.navigation.navigate("Signin")}} style={[{marginTop: 4}, t.mT4, t.textCenter]} />
			</View>
		</View>
	)
}