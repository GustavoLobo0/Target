import { StyleSheet } from "react-native";

import { colors, fontFamily } from "@/theme";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 280,
        paddingHorizontal: 24,
        justifyContent: "flex-end",
        paddingBottom: 18,
        gap: 24
    },
    label: {
        fontSize: 12,
        color: colors.white,
        fontFamily: fontFamily.regular,
    },
    total:{
        color: colors.white,
        fontSize: 32,
        fontFamily: fontFamily.medium,
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        gap: 12,
    }
})