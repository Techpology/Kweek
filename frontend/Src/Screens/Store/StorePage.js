import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { t } from "react-native-tailwindcss";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import { FontAwesome } from '@expo/vector-icons';

import Popup from '../../Components/Popup';
import ProductCard from '../../Components/ProductCard';

export default function StorePage(props) {
	const { id } = props.route.params

	const [store, setStore] = useState({})
	const [isstore, setIsStore] = useState(false)
	const getStore = () =>
	{
		axios.post("customer/get/store/", {"id": id})
		.then(resp=>{
			console.log(resp.data);
			setStore(resp.data);
			setIsStore(true);
		}).catch(err=>{
			alert(err.message);
		})
	}

	useEffect(()=>{
		getStore();
	},[])

	const listCategories = () =>
	{
		let categ = store["categories"]
		categ = categ.replace(/'/g,'"')
		console.log(JSON.parse(categ))

		const ret = JSON.parse(categ).map((i, key)=>
			<TouchableOpacity style={[t.bgWhite, t.wFull, {height: 100}, t.roundedLg, t.itemsCenter, t.justifyCenter, t.mY2]} onPress={()=>{}}>
				<Text style={[{color: "#00000080"}]}>{i}</Text>
			</TouchableOpacity>
		)

		return (
			<ScrollView style={[t.pT4, t.pX8, t.pB4]}>
				{ret}
			</ScrollView>
		)
	}

	const [isPopup, setIsPopup] = useState(false)

	return (
		<SafeAreaView>
			<View style={[t.absolute, t.flex, t.flexRow, t.wFull, t.itemsCenter, t.mT12, t.mX4, t.z10]}>
				<TouchableOpacity onPress={()=>{props.navigation.goBack()}} style={[t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter,
				{
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowOffset: {width: 0, height: 2},
					shadowRadius: 8,
					elevation: 5,
					height: 40,
					width: 40
				}]}>
					<FontAwesome name="angle-left" size={32} color="black" />
				</TouchableOpacity>
			</View>

			{
				(isPopup) ?
				<Popup>
				</Popup>
				:
				<></>
			}

			{
				(isstore) ?
				<ScrollView style={[t.wFull, t.hFull]}>
					<View style={[t.wFull, t.itemsCenter, t.justifyEnd]}>
						<Image style={[t.wFull, {height: 240}, t.z20]} source={{uri: axios.defaults.baseURL + store["banner"]}} />
						<Image source={{uri: axios.defaults.baseURL + store["pfp"]}} style={[t.absolute, {width: 90, height: 90, bottom: -30}, t.z30, t.roundedFull]}/>
					</View>
					<View style={[t.wFull, {paddingTop: 30}, t.z20, t.itemsCenter, t.bgWhite, t.pB10, t.roundedBLg]}>
						<Text style={[t.textXl]}>{store["name"]}</Text>
						<Text style={[{color: "#00000080"}]}>{store["address"]}</Text>
						<Text style={[{color: "#00000080"}]}>Mobile: {store["phone"]}</Text>
					</View>
					{listCategories()}
				</ScrollView>
				:
				<></>
			}

		</SafeAreaView>
	)
}