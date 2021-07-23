import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Icon, Title, Button } from "./styles";

const icons = {
  positive: "arrow-up-circle",
  negative: "arrow-down-circle",
};

interface Props extends RectButtonProps {
  title: string;
  type: "positive" | "negative";
  isActive: boolean;
}
export const TransactionTypeButton: React.FC<Props> = ({
  title,
  type,
  isActive,
  ...rest
}) => {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
};
