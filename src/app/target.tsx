import { Text, View, TouchableOpacity } from "react-native";
import { colors } from '@/theme/colors'

import { router } from "expo-router";

export default function Target() {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:colors.blue[100]}}>
            <Text style={{color:colors.white, fontSize:30}}>Target</Text>

            <TouchableOpacity style={{marginTop:20, padding:10, backgroundColor:colors.blue[500], borderRadius:5}} 
            onPress={() => router.back()}>
                <Text style={{color:colors.white}}>Voltar</Text>
            </TouchableOpacity>
        </View>
    )
}