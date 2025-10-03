import { View } from "react-native"
import { useLocalSearchParams, router } from "expo-router"

import { PageHeader } from "@/components/PageHeader"
import { Progress } from "@/components/Progress"
import { List } from "@/components/List"
import { Transaction, TransactionProps } from "@/components/Transaction"
import { Button } from "@/components/Button"

import { TransactionTypes } from "@/utils/TransactionTypes"

const details ={
  current:"67,00",
  target: "100,00",
  percentage: 25

}

const transactions: TransactionProps[] = [
  {
    id: "1",
    type: TransactionTypes.Input,
    value: "R$400,00",
    description: "Salario",
    date: "01/01/2023"
  },
    {
    id: "2",
    type: TransactionTypes.Output,
    value: "R$200,00",
    date: "01/01/2023"
  }
]

export default function InProgress() {
  const params = useLocalSearchParams()

  return (
    <>
      <View style={{ flex: 1, padding: 24, gap: 32 }}>
        <PageHeader title="Apple Watch" rightButton={{ icon: "edit", onPress: () => {} }} />
          <Progress data={details} />

          <List
            title="Transações"
            data={transactions}
            renderItem={({ item }) => (<Transaction data={item} OnRemove={() => {}} />)}
            emptyText="Nenhuma transação cadastrada"
            />
            <Button tittle="Nova transação" onPress={() => router.navigate(`/transaction/${params.id}`)}/>
      </View>
    </>
  )
}