import { FlatList, FlatListProps, StyleProp, Text, View, ViewStyle } from "react-native";

import { Separator } from "../Separator";

import { styles } from "./styles";
import { colors } from "@/theme";

type Props<T> = FlatListProps<T> & {
    title: string;
    emptyText?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

export function List<T>({ title, emptyText, containerStyle, data, renderItem, ...rest}: Props<T>) {

    return(
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.title}>{title}</Text>

            <FlatList
            data={data}
            renderItem={renderItem}
            ItemSeparatorComponent={()=><Separator color={colors.gray[200]}/>}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={()=><Text style={styles.empty}>{emptyText}</Text>}
            {...rest} />
        </View>
    )
}