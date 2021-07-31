import React, { useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";

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
import { useAuth } from "../../hooks/auth";
import { Alert } from "react-native";

export const SignIn: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
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
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};