import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { RectButton } from "react-native-gesture-handler";
interface IconsProps {
  type: "positive" | "negative";
}

interface ContainerProps {
  isActive: boolean;
  type: "positive" | "negative";
}

export const Container = styled.View<ContainerProps>`
  width: 48%;

  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ isActive, type }) =>
    isActive &&
    type === "negative" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === "positive" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const Icon = styled(Feather)<IconsProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === "positive" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
