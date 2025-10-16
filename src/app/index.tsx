import { useCallback, useState } from 'react'
import { View, StatusBar, Alert } from 'react-native'
import { useRouter, useFocusEffect } from 'expo-router'

import { HomeHeader, HomeHeaderProps } from '@/components/HomeHeader'
import { Target, TargetProps } from '@/components/Target'
import { List } from '@/components/List'
import { Button } from '@/components/Button'

import { useTargetDatabase } from '@/database/useTargetDatabase'
import { Loading } from '@/components/Loading'
import { colors } from '@/theme'
import { numberToCurrency } from '@/utils/numberToCurrency'
import { useTransactionsDatabase } from '@/database/useTransactionsDataBase'

export default function Index() {
  const [summary, setSummary] = useState<HomeHeaderProps>()
  const [isFetching, setIsFetching] = useState(true);
  const [targets, setTargets] = useState([]);

  const targetDatabase = useTargetDatabase();
  const summaryDatabase = useTransactionsDatabase();

  const router = useRouter();

async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listBySavedValue()
      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + '%',
        target: numberToCurrency(item.amount),
      }))
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as metas.')
      console.log(error)
    }
  }

  async function fetchSummary(): Promise<HomeHeaderProps> {
    try {
      const response = await summaryDatabase.summary()

      return {
        total: numberToCurrency(response.input + response.output),
        input: {
          label: 'Entradas',
          value: numberToCurrency(response.input),
        },
        output: {
          label: 'Saídas',
          value: numberToCurrency(response.output),
        },
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o resumo.')
      console.log(error)
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets()
    const dataSummaryPromise = fetchSummary()

    const [targetData, dataSummary] = await Promise.all([
      targetDataPromise,
      dataSummaryPromise,
    ])

    setTargets(targetData)
    setSummary(dataSummary)

    setIsFetching(false)
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
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />
        <HomeHeader data={summary} />

        <List
          title="Metas"
          data={targets}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Target data={item} onPress={() => router.navigate(`/inProgress/${item.id}`)} />}
          emptyText="Nenhuma meta cadastrada"
          containerStyle={{ paddingHorizontal: 24 }}
        />

        <View style={{ padding: 24 }}>

          <Button tittle='Criar nova meta' onPress={() => router.navigate("/target")} />
        </View>
      </View>
    </>
  )
}