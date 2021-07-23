import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled(BorderlessButton)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  padding: 18px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shapes};
  font-size: ${RFValue(14)}px;
`;
