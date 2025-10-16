import { useState, useEffect, use } from "react";
import { Alert, StatusBar, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useTargetDatabase } from "@/database/useTargetDatabase";

export default function Target() {
  <StatusBar barStyle="dark-content" />
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  const params = useLocalSearchParams<{ id?: string }>();
  const targetDataBase = useTargetDatabase()

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert("Meta", "Informe o nome da meta e o valor.");
    };

    setIsProcessing(true)

    if (params.id) {
      update();
    } else {
      create();
    }

    async function update() {
      try {
        await targetDataBase.update({ name, amount, id: Number(params.id) });

        Alert.alert("Meta", "Meta atualizada com sucesso!", [
          { text: "OK", onPress: () => router.back() }
        ])
      } catch (error) {
        Alert.alert("Meta", "Nao foi possivel atualizar a meta.");
        setIsProcessing(false);
      }
    }

    async function create() {
      try {
        await targetDataBase.create({ name, amount });
        router.back();
      } catch (error) {
        Alert.alert("Meta", "Nao foi possivel criar a meta.");
        setIsProcessing(false);
      }
    }
  }

async function fetchDetails(id:number) {
  try {
    const response = await targetDataBase.show(id)
    setName(response.name)
    setAmount(response.amount)

  } catch (error) {
    Alert.alert("error", "Nao foi possivel carregar a meta.");
  }
}
async function handleDelete() {
  try {
    await targetDataBase.remove(Number(params.id))
   router.replace("/")
  } catch (error) {
    Alert.alert("Meta", "Nao foi possivel excluir a meta.");
  }
}

useEffect(() => {
  if (params.id) {
    fetchDetails(Number(params.id))
  }
}, [params.id])

  return (
    <View style={{ flex: 1, padding: 24, }}>
      <PageHeader title="Meta" subtitle="Economize para alcançar sua meta financeira." rightButton={
        params.id ?{icon: "delete", onPress:()=>{handleDelete()}}: undefined
      } />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Nome da meta" onChangeText={setName} value={name} />

        <CurrencyInput label="Valor alvo" value={amount} onChangeValue={setAmount} />

        <Button tittle="Salvar" onPress={handleSave} isLoading={isProcessing} />
      </View>
    </View>
  )
}