import { View, Text, TouchableOpacity } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { colors } from "@/theme/colors"

export default function InProgress() {
    const params = useLocalSearchParams()

    return(
        <>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>In Progress: {params.id}</Text>
            <TouchableOpacity style={{backgroundColor:colors.gray[500], padding:30, marginTop:30}} onPress={() => router.back()}>
                <Text>Go Home</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}