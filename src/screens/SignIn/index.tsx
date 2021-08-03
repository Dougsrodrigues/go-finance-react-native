import React, { useContext, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { ActivityIndicator, Alert, Platform } from "react-native";

import { useAuth } from "../../hooks/auth";
import { useTheme } from "styled-components";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

import AppleSvg from "../../assets/icons/apple.svg";
import GoogleSvg from "../../assets/icons/google.svg";
import LogoSvg from "../../assets/icons/logo.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";

export const SignIn: React.FC = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      return;
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
      setIsLoading(false);
    }
  };

  const handleSignInWithApple = async () => {
    try {
      setIsLoading(true);
      await signInWithApple();
      return;
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple");
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {"\n"} finanças de forma {"\n"} muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={() => handleSignInWithGoogle()}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={() => handleSignInWithApple()}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shapes}
            size="large"
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
};
