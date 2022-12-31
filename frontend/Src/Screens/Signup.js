import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import Logo from "../Images/Logo"

import InputField from '../Components/InputField'
import TextButton from '../Components/TextButton'
import Popup from '../Components/Popup'
import DropDown from '../Components/DropDown'
import Btn from '../Components/Btn'

export default function Signup(props) {

	const [index, setIndex] = useState(0)
	
	const [cityArr, setCityArr] = useState([
		"Norrköping",
		"Linköping",
		"Finspång",
		"Motala",
		"Mjölby",
		//"Nyköping",
		//"Stockholm"
	])
	const [selectedCity, setSelectedCity] = useState(0)

	const [regionArr, setRegionArr] = useState([
		"Östegötland",
		//"Södermanland",
		//"Stockholmslän"
	])
	const [selectedRegion, setSelectedRegion] = useState(0)

	const flow = ()=>
	{
		if(index == 0)
		{
			return(
				<View style={[t.wFull]}>
					<InputField _text={fullName} title="Full name" placeholder="full-name" val={(e)=>{setFullName(e); console.log(e)}} style={[t.mB8]} />
					<InputField _text={email} title="Email" placeholder="e-mail" val={(e)=>{setEmail(e); console.log(e)}} />
				</View>
			)
		}else if(index == 1)
		{
			return(
				<View style={[t.wFull]}>
					<InputField secure={true} title="Password" _text={password} placeholder="password" val={(e)=>{setPassword(e); console.log(e)}} />
				</View>
			)
		}else if(index == 2)
		{
			var closePopup_city = () => {};
			var set_city = () => {};

			var closePopup_region = () => {};
			var set_region = () => {};

			const retCity = cityArr.map((i, key)=>
				<TouchableOpacity style={[t.wFull, t.pY2, t.pX4, t.mT4]} onPress={()=>{setSelectedCity(key); closePopup_city(); set_city(key)}}>
					<Text style={[t.textXl]}>{i}</Text>
				</TouchableOpacity>
			)

			const retRegion = regionArr.map((i, key)=>
				<TouchableOpacity style={[t.wFull, t.pY2, t.pX4, t.mT4]} onPress={()=>{setSelectedRegion(key); closePopup_region(); set_region(key)}}>
					<Text style={[t.textXl]}>{i}</Text>
				</TouchableOpacity>
			)

			return(
				<View style={[t.wFull]}>
					<DropDown popupTitle="Select your city" title="City" arr={cityArr} index={(e)=>{set_city = e}} close={(e)=>{closePopup_city = e}}>
						<ScrollView>
							{retCity}
						</ScrollView>
					</DropDown>
					<DropDown style={[t.mT4]} popupTitle="Select your Region" title="Region" arr={regionArr} index={(e)=>{set_region = e}} close={(e)=>{closePopup_region = e}}>
						<ScrollView>
							{retRegion}
						</ScrollView>
					</DropDown>
				</View>
			)
		}else{
		}
	}

	const increment = () =>
	{
		if(index == 2){
			axios.post("customer/create/",{
				"name": fullName,
				"email": email,
				"password": password,
				"city": cityArr[selectedCity],
				"region": regionArr[selectedRegion]
			}).then(resp=>{
				console.log(resp.data)
				props.navigation.navigate("Signin")
			}).catch(err=>{
				alert(err.message)
			})
		}
		else{
			setIndex(index + 1)
		}
	}

	const decrement = () =>
	{
		if(index == 0){
		}
		else{
			setIndex(index - 1)
		}
	}

	const [fullName, setFullName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isPopup, setIsPopup] = useState(false)

	return (
		<View style={[{backgroundColor: "#F8F8F8"}, t.wFull, t.hFull]}>
			<View style={[t.hFull, t.wFull, t.flex, t.flexCol, t.itemsCenter, t.justifyCenter]}>
				<Logo width={200} height={200} />
				{flow()}
					{
						(index != 0) ?
						<View style={[t.flex, t.flexRow, t.wFull, t.justifyBetween, t.pX12]}>
							<Btn inner="Back" style={[t.mT12]} trigger={()=>{decrement()}} />
							<Btn inner="Next" style={[t.mT12]} trigger={()=>{increment()}} />
						</View>
						:
						<Btn inner="Next" style={[t.mT12]} trigger={()=>{increment()}} />
					}
				<TextButton inner="Already have an account?" trigger={()=>{props.navigation.navigate("Signin")}} style={[{marginTop: 4}, t.mT4, t.textCenter]} />
			</View>
		</View>
	)
}