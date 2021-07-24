import React from "react";
import { View } from "react-native";

import { Container, Title, Amount } from "./styles";

interface Props {
  color: string;
  title: string;
  amount: string;
}

export const HistoryCard: React.FC<Props> = ({ color, title, amount }) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};
