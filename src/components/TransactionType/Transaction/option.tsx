import { Text, ColorValue, Pressable, PressableProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/theme";
import { styles } from "./styles";

type Props = PressableProps & {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  selectedColor: ColorValue;
  isSelected: boolean;
}

export function Option({ title, icon, selectedColor, isSelected, ...rest }: Props) {
  return (
    <>
      <Pressable
        style={[styles.option, isSelected && { backgroundColor: selectedColor }]}
        {...rest}
      >
        <MaterialIcons name={icon} size={24} color={isSelected ? colors.white : colors.gray[500]} />

        <Text style={[styles.title, isSelected && { color: colors.white }]}>{title}</Text>
      </Pressable>
    </>
  )
}