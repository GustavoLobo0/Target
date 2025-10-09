import { View, Text, TouchableOpacity, } from "react-native";

import { colors } from "@/theme";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

import { TransactionTypes } from "@/utils/TransactionTypes";

export type TransactionProps = {
  id: string;
  value: string;
  date: string;
  description?: string;
  type: TransactionTypes;
}

type Props = {
  data: TransactionProps;
  OnRemove: () => void;
}

export function Transaction({ data, OnRemove }: Props) {
  return (
    <>
      <View style={styles.container}>
        <MaterialIcons
          name={data.type === TransactionTypes.Input ? "arrow-upward" : "arrow-downward"}
          size={20}
          color={data.type === TransactionTypes.Input ? colors.blue[500] : colors.red[400]} />

        <View style={styles.info}>
          <Text style={styles.value}>{data.value}</Text>
          <Text style={styles.description} numberOfLines={1}> {data.date} {data.description && `• ${data.description}`} </Text>
        </View>

        <TouchableOpacity onPress={OnRemove}>
          <MaterialIcons name="close" size={20} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>
    </>
  )
}