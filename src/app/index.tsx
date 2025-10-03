import { View, StatusBar } from 'react-native'
import { useRouter } from 'expo-router'

import { HomeHeader } from '@/components/HomeHeader'
import { Target } from '@/components/Target'
import { List } from '@/components/List'
import { Button } from '@/components/Button'

const summary = {
  total: "R$ 1.000,00",
  output: { label: "Saídas", value: "R$ 1.000,00" },
  input: { label: "Entradas", value: "R$ 2.000,00" },
}

const targets = [
  {
    id: "1",
    name: "Viagem para o Rio de Janeiro",
    current: "R$ 500,00",
    percentage: "50%",
    target: "R$ 1.000,00"
  },
  {
    id: "2",
    name: "puteiro",
    current: "R$ 500,00",
    percentage: "50%",
    target: "R$ 1.000,00"
  }
]

export default function Index() {
  const router = useRouter();

  return (
    <>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content'/>
        <HomeHeader data={summary} />

        <List
          title="Metas"
          data={targets}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Target data={item} onPress={() => router.navigate(`/inProgress/${item.id}`)} />}
          emptyText="Nenhuma meta cadastrada"
          containerStyle={{ paddingHorizontal: 24 }}
        />

        <View style={{ padding: 24, paddingBottom: 36 }}>
          
          <Button tittle='Criar nova meta' onPress={() => router.navigate("/target")} />
        </View>
      </View>
    </>
  )
}