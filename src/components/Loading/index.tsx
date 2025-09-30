import { ActivityIndicator, ColorValue } from "react-native";

import { styles } from "./style";

type Props = {
    color: ColorValue;
    size?: "small" | "large";
};

export function Loading({ color, size }: Props) {
    return <ActivityIndicator color={color} size={size} style={styles.container} />;
}