import { View, TextInput, TextInputProps, Text } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";

type Props = TextInputProps & {
  label: string;
}

export function Input({ label, ...rest }: Props) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>

        <TextInput style={styles.input} {...rest} placeholderTextColor={colors.gray[400]} placeholder="Ex: Viagem para praia, Apple Watch"></TextInput>
      </View>
    </>
  )
}