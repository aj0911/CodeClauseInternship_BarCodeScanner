import { StyleSheet } from "react-native";
import Colors from "../../assets/Colors";

const qrStyle = StyleSheet.create({
    qrScreen:{
        gap:30,
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    textInput:{
        backgroundColor:Colors.boxColor,
        padding:10,
        width:'100%',
        fontFamily:'Regular',
        fontSize:15,
        borderRadius:10
    }
});

export default qrStyle;