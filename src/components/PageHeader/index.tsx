import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { styles } from "./styles";
import { colors } from "@/theme";

type Props = {
  title: string;
  subtitle?: string;
  onPress?: () => void
  
  rightButton?: {
    onPress: () => void;
    icon: keyof typeof MaterialIcons.glyphMap;
  }
}

export function PageHeader({ title, subtitle, rightButton }: Props) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={32} color={colors.black} />
        </TouchableOpacity>

        {
          rightButton && (
            <TouchableOpacity onPress={rightButton.onPress}>
              <MaterialIcons name={rightButton.icon} size={24} color={colors.gray[500]} />
            </TouchableOpacity>
          )
        }
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  )
}