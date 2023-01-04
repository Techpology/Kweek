import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Camera, CameraType } from 'expo-camera';
import { t } from "react-native-tailwindcss";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialIcons } from '@expo/vector-icons';

import {
	SafeAreaView,
	SafeAreaProvider,
	SafeAreaInsetsContext,
	useSafeAreaInsets,
	initialWindowMetrics,
} from 'react-native-safe-area-context';

import Popup from '../../Components/Popup';
import Btn from '../../Components/Btn';
import axios from 'axios';

export default function ScanOrder(props) {
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [isScanned, setIsScanned] = useState(false)

	const [isPopup, setIsPopup] = useState(false)
	const [order, setOrder] = useState("")

	const orderDone = () =>
	{
		axios.post("/store/order/done/", {order: order})
		.then(resp=>{
			console.log(resp.data);
		}).catch(err=>{
			alert(err.message);
		})
	}

	return (
		<SafeAreaView>
			<View style={[t.wFull, t.hFull]}>
				{
					(isPopup) ?
					<Popup pressOut={()=>{setIsPopup(false); setIsScanned(false)}}>
						<View style={[t.wFull, t.hFull, t.flex, t.flexCol, t.itemsCenter, t.justifyCenter]}>
							<Text style={[t.textLg]}>Order id</Text>
							<Text style={[t.textXl]}>{order}</Text>
							<Text style={[t.fontLight, t.textCenter, t.mT4]}>Make sure to get the order before clicking this popup away.</Text>
							<Text style={[t.fontLight, t.textCenter]}>You will not be able to retrive the order after clicking away.</Text>
							<Btn style={[t.mT4]} inner="Done" trigger={()=>{orderDone(); setIsPopup(false); setIsScanned(false);}} />
						</View>
					</Popup>
					:
					<></>
				}
				<View style={[t.absolute, t.wFull, t.mT4, t.flexRow, t.itemsCenter, t.justifyBetween, t.pX4, t.z10]}>
					<TouchableOpacity onPress={()=>{props.navigation.goBack()}}>
						<MaterialIcons name="keyboard-arrow-left" size={45} color="black" />
					</TouchableOpacity>
					<Text style={[t.textLg, t.textGray700]}>Scan order</Text>
				</View>
				<BarCodeScanner
					style={StyleSheet.absoluteFillObject}
					type={CameraType.back}
					onBarCodeScanned={(e)=>{
						if(!isScanned)
						{
							setIsScanned(true)
							console.log(e.data)
							setOrder(e.data)
							setIsPopup(true)
							//props.navigation.goBack()
						}
					}} />
			</View>
		</SafeAreaView>
	)
}
