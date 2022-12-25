import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { t } from "react-native-tailwindcss";
import axios from "axios";
import React, {useState, useEffect} from 'react';
import QRCode from 'react-native-qrcode-svg';

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';

import WideImgBtn from '../Components/WideImgBtn';
import ProductCard from '../Components/ProductCard';
import Popup from "../Components/Popup";
import Btn from '../Components/Btn';

export default function Cart(props) {
	
	const [activeOrders, setActiveOrders] = useState([])
	const getActiveOrders = () =>
	{
		axios.get("customer/get/active/")
		.then(resp=>{
			console.log(resp.data);
			setActiveOrders(resp.data)
		}).catch(err=>{
			alert(err.message);
		})
	}

	const [qrPop, setQrPop] = useState(false)
	const [qrData, setQrData] = useState("")
	const listActiveOrders = () =>
	{
		const ret = activeOrders.map((i,key)=>
			<WideImgBtn key={key} inner={i["store"]} under={i["order"]} trigger={()=>{setSelectedStore(i["store"]); setQrData(i["order"]); setQrPop(true)}}/>
		)

		return(
			<ScrollView style={[t.wFull, t.pX2]}>
				{ret}
			</ScrollView>
		)
	}

	useEffect(()=>{
		props.updateSession()
		getActiveOrders();
	},[])

	const [selectedStore, setSelectedStore] = useState("")
	const [storePopup, setStorePopup] = useState(false)
	const [prods, setProds] = useState([])
	const getProds = (x) =>
	{
		axios.post("customer/get/cart/products/", {storeName: x})
		.then(resp=>{
			console.log(resp.data);
			setProds(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const [_price, set_price] = useState(0)
	const listProds = () =>
	{
		var j = 0
		const ret = prods.map((i, key) =>{
				j += parseFloat(i["price"]).toFixed(2) * parseInt(i["amt"])
				return(
					<ProductCard trigger={()=>{setSelectedProd(i); setKey(key); setProdPop(true); setAmt(i["amt"])}} 
					key={key} name={i["name"] + " " + i["amt"] + ((i["unit"] == 0) ? "st" : "kg")} price={parseFloat(i["price"]) * parseInt(i["amt"])} img={i["img"]} />
				)
			}
		)

		return(
			<ScrollView style={[t.wFull, {height: "75%"}, t.pX2]}>
				<Text style={[t.textLg, t.selfEnd]}>Total: {j.toFixed(2)}kr</Text>
				{ret}
			</ScrollView>
		)
	}

	const listCart = () =>
	{
		let _c = JSON.parse(props.session["cart"])
		const ret = Object.keys(_c).map((i, key) =>
			<WideImgBtn key={key} inner={i} trigger={()=>{setSelectedStore(i);getProds(i); setStorePopup(true)}}/>
		)

		return(
			<ScrollView style={[ t.wFull, t.pX8]}>
				{ret}
			</ScrollView>
		)
	}

	const [selectedProd, setSelectedProd] = useState(null)
	const [_key, setKey] = useState(null)
	const [amt, setAmt] = useState(1)
	const [prodPop, setProdPop] = useState(false)
	const editCartProd = () =>
	{
		axios.post("customer/edit/cart/", {storeName: selectedStore, key: _key, amt: selectedProd["amt"]})
		.then(resp=>{
			console.log(resp.data);
			setProdPop(false);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const removeCartProd = () =>
	{
		axios.post("customer/rem/cart/", {storeName: selectedStore, key: _key})
		.then(resp=>{
			console.log(resp.data);
			props.updateSession()
			setProdPop(false);
			setStorePopup(false);
		}).catch(err=>{
			alert(err.message);
		})
	}

	const postOrder = () =>
	{
		axios.post("customer/post/order/", {storeName: selectedStore})
		.then(resp=>{
			console.log(resp.data);
			props.updateSession();
			getActiveOrders();
			setProdPop(false);
			setStorePopup(false);
		}).catch(err=>{
			alert(err.message)
		})
	}

	return (
		<View _style={[{height: "75%"}]} style={[t.wFull, t.hFull, {backgroundColor: "#F8F8F8"}]}>
			{
				(storePopup) ?
				<Popup _style={[{height: "75%"}]} pressOut={()=>{setStorePopup(false)}}>
					<View style={[t.wFull, t.hFull, t.flex, t.flexCol, t.pY4]}>
						<View style={[t.flex, t.flexRow, t.wFull, t.pX4, t.justifyBetween, t.itemsCenter]}>
							<Text style={[t.textXl]}>Store name</Text>
							<TouchableOpacity onPress={()=>{setStorePopup(false)}} style={[t.p1]}>
								<Feather name="x" size={24} color="black" />
							</TouchableOpacity>
						</View>
						<View style={[t.pY2, t.wFull, t.hFull]}>
							<Text style={[t.textMd]}>Items in order</Text>
							{(prods.length != 0) ? listProds() : <></>}
							<Btn trigger={()=>{postOrder()}} inner="Order" style={[t.selfEnd, t.w24, t.h10, t.mB2]} _style={[t.textSm]} />
						</View>
					</View>
				</Popup>
				:
				<></>
			}
			{
				(prodPop)?
				<Popup pressOut={()=>{setProdPop(false)}} title="Edit amount or remove product" textStyle={[t.textCenter]} style={[t.itemsCenter]}>
					<Text style={[t.textLg]}></Text>
					<View style={[t.flex, t.flexRow, t.itemsCenter, t.justifyCenter, t.mT8]}>
						<TouchableOpacity style={[t.pY2, t.pX2, t.bgBlue400, t.roundedFull]} onPress={()=>{setAmt(amt - 1);}}>
							<AntDesign name="minus" size={24} color="black" />
						</TouchableOpacity>
						<Text style={[t.textXl, t.mX8]}>{amt}</Text>
						<TouchableOpacity style={[t.pY2, t.pX2, t.bgBlue400, t.roundedFull]} onPress={()=>{setAmt(amt + 1);}}>
							<AntDesign name="plus" size={24} color="black" />
						</TouchableOpacity>
					</View>
					<View style={[t.flex, t.flexRow, t.wFull, t.justifyBetween, t.pX8, t.mT8]}>
						<Btn inner="Remove" _style={[t.textSm]} style={[t.mT6, t.h10, t.w24, t.bgRed400]} trigger={()=>{removeCartProd();}} />
						<Btn inner="Done" _style={[t.textSm]} style={[t.mT6, t.h10, t.w24]} trigger={()=>{let x = selectedProd; x["amt"] = amt; setSelectedProd(x); editCartProd(); setProdPop(false);}} />
					</View>
				</Popup>
				:
				<></>
			}
			{
				(qrPop)?
				<Popup pressOut={()=>{setQrPop(false)}} textStyle={[t.textCenter]} _style={[{height: "60%"}]}>
					<View style={[t.wFull, t.flex, t.flexRow, t.justifyBetween, t.mT2, t.pX2]}>
						<Text style={[t.textLg]}>{selectedStore}</Text>
						<TouchableOpacity onPress={()=>{setStorePopup(false)}} style={[t.p1]}>
							<Feather name="x" size={24} color="black" />
						</TouchableOpacity>
					</View>
					<View style={[t.flex, t.flexCol, t.itemsCenter, t.justifyCenter, t.wFull, t.mT20]}>
						<QRCode value={qrData} size={150} />
						<Text style={[t.fontMedium, t.textXl]}>ORDER ID</Text>
						<Text style={[t.fontLight, t.textLg]}>{qrData}</Text>
					</View>
					<Text style={[t.selfCenter, t.mT8, t.textCenter, {color: "#00000080"}, t.textLg]}>Make sure to show your qr code upon arrival</Text>
				</Popup>
				:
				<></>
			}
			<View style={[t.absolute, t.flex, t.flexRow, t.wFull, t.itemsCenter, t.mT12, t.mX4]}>
				<TouchableOpacity onPress={()=>{props.navigation.goBack()}} style={[t.roundedFull, t.bgWhite, t.itemsCenter, t.justifyCenter,
				{
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowOffset: {width: 0, height: 2},
					shadowRadius: 8,
					elevation: 5,
					height: 50,
					width: 50
				}]}>
					<FontAwesome name="angle-left" size={32} color="black" />
				</TouchableOpacity>
			</View>
			<View style={[t.absolute, t.right0, t.top0, t.mT16, t.mX6]}>
				<Text style={[t.textLg]}>Cart</Text>
			</View>

			<Text style={[t.textLg, t.mT32, t.mX8]}>Cart for: </Text>
			{listCart()}

			<Text style={[t.textLg, t.mX8]}>Active orders</Text>
			{(activeOrders.length != 0) ? listActiveOrders() : <></>}
		</View>
	)
}