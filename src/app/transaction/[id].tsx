import { View } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'

import { PageHeader } from '@/components/PageHeader';
import { CurrencyInput } from '@/components/CurrencyInput';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { TransactionType } from '@/components/TransactionType';
import { TransactionTypes } from '@/utils/TransactionTypes';

export default function transaction() {
  const [type, setType] = useState(TransactionTypes.Input);


  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader title="Nova transação" subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar." onPress={() => router.back()} />
      <View style={{ marginTop: 32, gap: 24 }}>

        <TransactionType selected={type} onChange={setType} />

        <CurrencyInput value={0} label="Valor da transação (R$)" />
        <Input label="Descrição da transação" />
        <Button tittle="Salvar" />
      </View>
    </View>
  )
}
