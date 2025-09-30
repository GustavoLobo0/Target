import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native";

import { Loading } from "../Loading";
import { styles } from "./styles";
import { colors } from "@/theme";

type Props = TouchableOpacityProps & {
    tittle: string;
    isLoading?: boolean;
}

export function Button({ tittle, isLoading = false, ...rest }: Props) {
    return <TouchableOpacity
        style={styles.container}
        {...rest}
        activeOpacity={0.7}
        disabled={isLoading}
    >
        <Text style={styles.title}>
            {isLoading ? <Loading color={colors.white} size="small" /> : tittle}
        </Text>
    </TouchableOpacity>;
}