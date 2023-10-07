import { View, Text, TouchableOpacity, TextInput,CameraRoll, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import qrStyle from './QR.Style'
import HomeStyleSheet from '../HomeScreen/Home.Style'
import { Ionicons } from '@expo/vector-icons'
import Screens from '../../assets/Screen'
import QRCode from 'react-native-qrcode-svg'
import Toast from 'react-native-toast-message'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

const QR = ({setScreen}) => {

    const [link,setLink] = useState('default');
    let svg = useRef();
    let dataUrl = '';
    const image_source = 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';

    const saveQrToDisk = () => {
        svg?.toDataURL(dataURL=>dataUrl=dataURL);
        FileSystem.downloadAsync(
            image_source,
            FileSystem.documentDirectory + '.png'
        )
            .then(({ uri }) => {
                FileSystem.writeAsStringAsync(
                    uri,
                    dataUrl,
                    { 'encoding': FileSystem.EncodingType.Base64 }
                )
                    .then(() => {
                        Sharing.shareAsync(uri);
                    })

            })
            .catch(err => {
                Toast.show({
                    text1:'Failed',
                    text2: `${err}`,
                    visibilityTime:3000,
                    autoHide:true,
                    type:'error'
                })
            });
   }

  return (
    <View style={qrStyle.qrScreen}>
      <View style={HomeStyleSheet.header}>
            <TouchableOpacity>
                <Ionicons onPress={()=>setScreen(Screens.HOME_SCREEN)} name='exit-outline' size={25}/>
            </TouchableOpacity>
            <Text style={HomeStyleSheet.header.title}>Scanny</Text>
            <Ionicons name='scan-outline' size={25}/>
        </View>
        <TextInput style={qrStyle.textInput} placeholder='Type Any Link...' onChangeText={text=>setLink((text)?text:'default')}/>
        <QRCode size={Dimensions.get('screen').width/1.5} value={link} getRef={c=>svg=c}/>
        {
            (link==='default')?'':
            <TouchableOpacity onPress={saveQrToDisk} style={{...HomeStyleSheet.response.btn,width:'100%'}}>
                <Text style={HomeStyleSheet.response.btn.text}>Share QR Code</Text>
            </TouchableOpacity>
        }
    </View>
  )
}

export default QR