import { View, Text, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'

export default function transaction() {
    const params = useLocalSearchParams<{ id: string }>();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>ID: {params.id}</Text>

            <TouchableOpacity style={{ marginTop: 20, padding: 10, borderRadius: 5 }} onPress={() => router.back()}>
                <Text>voltar</Text>
            </TouchableOpacity>
        </View>
    )
}
