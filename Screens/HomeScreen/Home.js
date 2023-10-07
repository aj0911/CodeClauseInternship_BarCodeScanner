import { View, Text, Button, Share, TouchableOpacity, Linking, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeStyleSheet from './Home.Style'
import Ionicons from '@expo/vector-icons/Ionicons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Toast from 'react-native-toast-message'
import Colors from '../../assets/Colors';
import Screens from '../../assets/Screen';

const Home = ({setScreen}) => {

    const [cameraPermission,setCameraPermission] = useState(null);
    const [scanned,setScanned] = useState(false);
    const [scan,setScan] = useState(false);
    const [data,setData] = useState('');

    const cameraPermissionGranted = async()=>{
        const {status} = await BarCodeScanner.requestPermissionsAsync();
        setCameraPermission(status==='granted');
    }
    const handleBarCodeScanned = (data) => {
        setData(data);
        setScanned(true);
        setScan(false);
    };
    const handleSharing = async()=>{
        Share.share({
            message:data.data
          }).catch((err)=>{
            Toast.show({
                text1:'Failed',
                text2: `${err}`,
                visibilityTime:3000,
                autoHide:true,
                type:'error'
            })
        })
    }
    const handleConnect = ()=>{
           Linking.openURL(data.data).catch((err)=>{
               Toast.show({
                   text1:'Failed',
                   text2: `${err}`,
                   visibilityTime:3000,
                   autoHide:true,
                   type:'error'
               })
           })
    }
    useEffect(()=>{
        cameraPermissionGranted();
    },[])

    if(cameraPermission===null)return( 
        <View style={HomeStyleSheet.loader}>
            
            <ActivityIndicator size={100} color={Colors.mainColor}/>
            <Text style={HomeStyleSheet.loader.title}>Requesting For Camera Services.</Text>
        </View>
    )

    if(cameraPermission === false) return(
        <View style={HomeStyleSheet.loader}>
            <Image style={{width:'100%',height:200,objectFit:'cover'}} source={require('../../assets/Images/error.jpg')}/>
            <Text style={HomeStyleSheet.loader.title}>Permission for Camera is must for using the Bar Code Scanner App</Text>
            <TouchableOpacity style={HomeStyleSheet.response.btn} onPress={()=>cameraPermissionGranted()}><Text style={HomeStyleSheet.response.btn.text}>Ask For Permission</Text></TouchableOpacity>
        </View>
    )
    return (
        <View style={HomeStyleSheet.home}>
            <View style={HomeStyleSheet.header}>
                <Ionicons name='scan-outline' size={25}/>
                <Text style={HomeStyleSheet.header.title}>Scanny</Text>
                <TouchableOpacity onPress={()=>setScreen(Screens.QR_SCREEN)}>
                    <Ionicons name='md-add' style={{backgroundColor:Colors.secColor,textAlign:'center',textAlignVertical:'center', borderRadius:150,padding:5}} size={25} color={'white'}/>
                </TouchableOpacity>
            </View>
            {
                (scan)?
                <View style={HomeStyleSheet.barCodeScanner}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={HomeStyleSheet.barCodeScanner.scan}
                    />
                </View>
                :
                (scanned)?"":
                <View style={HomeStyleSheet.scanView}>
                    <Image style={{width:'100%',height:300,objectFit:'cover'}} source={require('../../assets/Images/homeImage.jpg')} />
                    <Text style={HomeStyleSheet.scanView.title}>Scan Any <Text style={{color:Colors.mainColor}}>QR Code</Text></Text>
                    <TouchableOpacity style={HomeStyleSheet.scanBtn} onPress={()=>setScan(true)}>
                        <Text style={HomeStyleSheet.scanBtn.text}>Scan Now</Text>
                    </TouchableOpacity>
                </View>
            }
            {
                (scanned)?
                <View style={HomeStyleSheet.view}>
                    <View style={HomeStyleSheet.response}>
                        <Text style={HomeStyleSheet.response.title}>Result</Text>
                        <View style={HomeStyleSheet.response.result}>
                            <View style={HomeStyleSheet.response.data}>
                                <Text style={HomeStyleSheet.response.linkName}>Link Type</Text>
                                <Text style={HomeStyleSheet.response.linkValue}>{data.type}</Text>
                            </View>
                            <View style={HomeStyleSheet.response.data}>
                                <Text style={HomeStyleSheet.response.linkName}>Link</Text>
                                <Text style={HomeStyleSheet.response.linkValue}>{data.data}</Text>
                            </View>
                        </View>
                        <View style = {HomeStyleSheet.response.btns}>
                            <TouchableOpacity style={HomeStyleSheet.response.btn} onPress={handleConnect}><Text style={HomeStyleSheet.response.btn.text}>Connect</Text></TouchableOpacity>
                            <TouchableOpacity style={{...HomeStyleSheet.response.btn,backgroundColor:'transparent'}} onPress={handleSharing}><Text style={{...HomeStyleSheet.response.btn.text,color:Colors.secColor}}>Share</Text></TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={{backgroundColor:'black',padding:10,borderRadius:50,textAlign:'center',textAlignVertical:'center'}} onPress={()=>setScanned(false)}>
                        <Ionicons color={'white'} name='md-exit' size={30}/>
                    </TouchableOpacity>
                </View>
                :''
            }
            <TouchableOpacity style={HomeStyleSheet.lowerTab}>
                <Ionicons color={'white'} name = 'qr-code' size={20}/>
                <Text style={HomeStyleSheet.lowerTab.title} onPress={()=>setScreen(Screens.QR_SCREEN)}>QR Code</Text>
            </TouchableOpacity>        
        </View>
    )
}

export default Home