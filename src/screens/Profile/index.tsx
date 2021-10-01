import React from "react";
import { Text, View, TextInput, Button } from "react-native";

export const Profile: React.FC = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Perfil</Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Rodrigo"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Gonçalves"
      />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
};
