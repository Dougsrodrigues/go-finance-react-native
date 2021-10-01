import React from "react";
import { render } from "@testing-library/react-native";

import { Input } from ".";
import { ThemeProvider } from "styled-components/native";
import theme from "../../../global/styles/theme";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Input component", () => {
  it("must have specific border when active", () => {
    const { getByTestId } = render(
      <Input testID="input-email" active={true} />,
      {
        wrapper: Providers,
      }
    );

    const inputComponent = getByTestId("input-email");

    expect(inputComponent.props.style[0].borderColor).toEqual("#E83F5B");
    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
