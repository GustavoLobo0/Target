import { Alert, View } from 'react-native'
import { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'

import { PageHeader } from '@/components/PageHeader';
import { CurrencyInput } from '@/components/CurrencyInput';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { TransactionType } from '@/components/TransactionType';
import { TransactionTypes } from '@/utils/TransactionTypes';

import { useTransactionsDatabase } from '@/database/useTransactionsDataBase';

export default function transaction() {
  const [type, setType] = useState(TransactionTypes.Input);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState(0);
  const [observation, setObservation] = useState('');
  const params = useLocalSearchParams<{ id?: string }>();

  const transactionsDatabase = useTransactionsDatabase();

  async function handleCreate() {
    try {
      if (!amount) {
        return Alert.alert("Meta", "Informe o valor da transação.");
      };

      setIsProcessing(true);
       
      await transactionsDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionTypes.Output ? amount * -1 : amount,
        observation
      });

      router.back();

    } catch (error) {
      Alert.alert("Meta", "Nao foi possivel criar a meta.");

      setIsProcessing(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader title="Nova transação" subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar." onPress={() => router.back()} />
      <View style={{ marginTop: 32, gap: 24 }}>

        <TransactionType selected={type} onChange={setType} />

        <CurrencyInput value={amount} onChangeValue={setAmount} label="Valor da transação (R$)" />
        <Input label="Descrição da transação (Opcional)" onChangeText={setObservation}/>
        <Button tittle="Salvar" onPress={handleCreate} isLoading={isProcessing} />
      </View>
    </View>
  )
}
