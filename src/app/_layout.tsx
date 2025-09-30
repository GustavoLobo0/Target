import { Stack } from "expo-router";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold} from "@expo-google-fonts/inter";

import { colors } from "@/theme/colors";
import { Loading } from "@/components/Loading";

export default function Layout() {
  const [fontsloaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });

  if(!fontsloaded) {
    return <Loading color={colors.white} size="large" />;
  }

  return <Stack screenOptions={{headerShown:false, contentStyle:{backgroundColor:colors.white}}} />;
}