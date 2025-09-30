import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    listContent: {
        gap: 16,
        paddingBottom: 72,
        paddingTop: 16
    },
    title:{
        marginTop: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        fontSize: 18,
        fontFamily: fontFamily.medium,
        borderBottomColor:colors.gray[200],
        color: colors.black
    },
    empty:{
        fontSize: 14,
        fontFamily: fontFamily.regular,
        color: colors.gray[600],
    }
})