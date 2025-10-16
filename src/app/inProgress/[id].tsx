import { useCallback, useState } from "react"
import { StatusBar, View } from "react-native"
import { useLocalSearchParams, router, useFocusEffect } from "expo-router"

import { PageHeader } from "@/components/PageHeader"
import { Progress } from "@/components/Progress"
import { List } from "@/components/List"
import { Transaction, TransactionProps } from "@/components/Transaction"
import { Button } from "@/components/Button"
import { Loading } from "@/components/Loading"

import { TransactionTypes } from "@/utils/TransactionTypes"
import { useTargetDatabase } from "@/database/useTargetDatabase"
import { numberToCurrency } from "@/utils/numberToCurrency"

import { colors } from "@/theme"
import { useTransactionsDatabase } from "@/database/useTransactionsDataBase"
import dayjs from "dayjs"

export default function InProgress() {
  <StatusBar barStyle="dark-content" />
  const [transactions, setTransactions] = useState<TransactionProps[]>([])
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "R$0,00",
    target: "R$0,00",
    percentage: 0
  })
  const params = useLocalSearchParams()
  const targetDataBase = useTargetDatabase()
  const transactionsDatabase = useTransactionsDatabase()

  async function fetchTargetDetails() {
    try {
      const response = await targetDataBase.show(Number(params.id))
      
      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage
      })

    } catch (error) {
      alert(error)
    }
  }

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.listByTargetId(Number(params.id))
     setTransactions(
      response.map( (item) => ({
        id: String(item.id),
        value: numberToCurrency(item.amount),
        date: dayjs(item.created_at).format("DD/MM/YYYY [Às] HH:mm"),
        description: item.observation,
        type: item.amount > 0 ? TransactionTypes.Input : TransactionTypes.Output
      })))
    } catch (error) {
      alert(error)
    }
  }

  async function fetchData() {
    const fetchDetailsPromisse = fetchTargetDetails()
    const fetchTransactionsPromisse = fetchTransactions()
    await Promise.all([fetchDetailsPromisse, fetchTransactionsPromisse])
    setIsFetching(false)
  }

async function handleRemoveTransaction(id: number) {
 await transactionsDatabase.remove(Number(id))
  fetchData()
}

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, []),
  )

  if (isFetching) {
    return <Loading color={colors.blue[500]} size="large" />
  }

  return (
    <>
      <View style={{ flex: 1, padding: 24, gap: 32 }}>
        <PageHeader title={details.name} rightButton={{ icon: "edit", onPress: () => router.navigate(`/target?id=${params.id}`) }} />
        <Progress data={details} />

        <List
          title="Transações"
          data={transactions}
          renderItem={({ item }) => (<Transaction data={item} OnRemove={() => { handleRemoveTransaction(Number(item.id))}} />)}
          emptyText="Nenhuma transação cadastrada"
        />
        <Button tittle="Nova transação" onPress={() => router.navigate(`/transaction/${params.id}`)} />
      </View>
    </>
  )
}