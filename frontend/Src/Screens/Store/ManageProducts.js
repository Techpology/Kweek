import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFocusEffect } from '@react-navigation/native' 
import { t } from "react-native-tailwindcss"
import axios from 'axios'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

import WideImgBtn from '../../Components/WideImgBtn'
import Search from '../../Components/Search';
import Popup from '../../Components/Popup';
import Btn from '../../Components/Btn';
import LoadingCard from '../../Components/LoadingCard'

export default function ManageProducts(props) {

	const [products, setProducts] = useState([])
	const [showProducts, setShowProducts] = useState(false)

	const getProducts = () =>
	{
		axios.get("store/get/products")
		.then(resp=>{
			if(resp.data.length != 0)
			{
				setProducts(resp.data);
				setShowProducts(true)
			}
		}).catch(err=>{
			alert(err.message)
		})
	}

	const delProduct = () =>
	{
		axios.post("store/del/product/",{"id": delKey})
		.then(resp=>{
			console.log(resp.data);
			setIsDelPopup(false);
		}).catch(err=>{
			alert(err.message);
		})
		getProducts();
	}

	const [isDelPopup, setIsDelPopup] = useState(false)
	const [delKey, setDelKey] = useState(-1)
	const delPopup = () =>
	{
		return(
			<Popup pressOut={()=>{setIsDelPopup(false);}}>
				<Text style={[t.text2xl, t.selfCenter, t.textCenter]}>Are you sure you want to delete this product?</Text>
				<Text style={[t.selfCenter, t.textCenter, t.mT2]}>You will not be able to retrieve this product.</Text>
				<View style={[t.flex, t.flexRow, t.itemsCenter, t.pT16, t.justifyBetween, t.pX8]}>
					<Btn trigger={()=>{delProduct()}} inner="Yes" style={[t.mB8]} />
					<Btn trigger={()=>{setIsDelPopup(false)}} inner="No" style={[t.mB8]} />
				</View>
			</Popup>
		)
	}

	useEffect(()=>{
		getProducts()
	},[])


	const ProdItem = ({i}) =>
	{
		console.log(i)
		return (
			<View style={[t.mB2]}>
				<WideImgBtn trigger={()=>{props.navigation.navigate("EditProduct", {_prod: i})}}
				controls={true} img={axios.defaults.baseURL + i["img"]} inner={i["name"]} closePress={()=>{setDelKey(i["id"]); setIsDelPopup(true)}} />
			</View>
		)
	}

	const renderItem = ({item}) =>
	{
		return(
			<ProdItem i={item} />
		)
	}

	const renderProds = () =>
	{
		if(products.length != 0)
		{
			const ret = products.map((i,key) => 
				<View key={key}>
					<WideImgBtn trigger={()=>{props.navigation.navigate("EditProduct", {_prod: i})}}
					controls={true} img={axios.defaults.baseURL + i["img"]} inner={i["name"]} closePress={()=>{setDelKey(i["id"]); setIsDelPopup(true)}} />
				</View>
			)
			return (
				<View>
					{ret}
				</View>
			)
		}
	}

	const [isPop, setIsPop] = useState(false)

	return (
		<View style={[t.wFull, t.hFull]}>
			{(isDelPopup) ?
				delPopup()
				:
				<></>
			}
			{(isPop) ?
				<Popup pressOut={()=>{setIsPop(false)}} >
					<Text style={[t.text2xl, t.selfCenter]}>Add product</Text>
					<View style={[t.flex, t.flexCol, t.itemsCenter, t.pT16]}>
						<Btn trigger={()=>{props.navigation.navigate("BarScanner")}} inner="Scan EAN" style={[t.mB8]} />
						<Btn trigger={()=>{props.navigation.navigate("AddProduct", {_ean: ""})}} inner="Manual" />
					</View>
				</Popup> : <></>
			}
			<View style={[t.absolute, t.flex, t.flexRow, t.wFull, t.itemsCenter, t.mT12, t.mX4, t.justifyBetween]}>
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
				<Text style={[t.mR12, t.textLg, t.textGray700]}>Manage products</Text>
			</View>
			<View style={[t.wFull, t.pT24]}>
				<Search placeholder="search" val={(e)=>{}} />
			</View>

			{(products.length != 0) ?
				<FlatList data={products} keyExtractor={item=>item.id} renderItem={renderItem} style={[t.pX4, t.pT4, t.mB4]} initialNumToRender={10} />
				:
				<LoadingCard />
			}

			<View style={[t.absolute, t.flex, t.flexRowReverse, t.wFull, t.itemsCenter, t.mB32, t.bottom0]}>
				<TouchableOpacity onPress={()=>{getProducts()}} style={[t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter, t.mR8,
				{
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowOffset: {width: 0, height: 2},
					shadowRadius: 8,
					elevation: 5,
					height: 50,
					width: 50
				}]}>
					<Feather name="refresh-cw" size={28} color="black" />
				</TouchableOpacity>
			</View>
			<View style={[t.absolute, t.flex, t.flexRowReverse, t.wFull, t.itemsCenter, t.mB12, t.bottom0]}>
				<TouchableOpacity onPress={()=>{setIsPop(true)}} style={[t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter, t.mR8,
				{
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowOffset: {width: 0, height: 2},
					shadowRadius: 8,
					elevation: 5,
					height: 50,
					width: 50
				}]}>
					<AntDesign name="plus" size={32} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	)
}