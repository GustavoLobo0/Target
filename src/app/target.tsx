import { useState } from "react";
import { Alert, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useTargetDatabase } from "@/database/useTargetDatabase";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  const params = useLocalSearchParams<{ id?: string }>();
  const targetDataBase = useTargetDatabase()

  function handleSave() {
    if (!name.trim() || amount < 0) {
      return Alert.alert("Meta", "Informe o nome da meta e o valor.");
    };

    setIsProcessing(true)

    if (params.id) {
      // update
    } else {
      create();
    }

    async function create() {
      try {
        await targetDataBase.create({ name, amount });
        
        Alert.alert("Nova Meta", "Meta criada com sucesso!", [
          { text: "OK", onPress: () => router.back() }
        ]);
      } catch (error) {
        Alert.alert("Meta", "Nao foi possivel criar a meta.");
        setIsProcessing(false);
      }
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, }}>
      <PageHeader title="Meta" subtitle="Economize para alcançar sua meta financeira." rightButton={{ icon: "edit", onPress: () => { } }} />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Nome da meta" onChangeText={setName} value={name} />

        <CurrencyInput label="Valor alvo" value={amount} onChangeValue={setAmount} />

        <Button tittle="Salvar" onPress={handleSave} isLoading={isProcessing} />
      </View>
    </View>
  )
}