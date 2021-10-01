import React from "react";

import { render } from "@testing-library/react-native";
import { Profile } from "../../screens/Profile";

describe("Profile", () => {
  it("check if show correctly user input name placeholder ", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName.props.placeholder).toBeTruthy();
  });

  it("checks if user data has been loaded", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("Rodrigo");
    expect(inputSurname.props.value).toEqual("Gonçalves");
  });

  it("check if title render correctly", async () => {
    const { findByText } = render(<Profile />);

    const textTitle = await findByText("Perfil");

    expect(textTitle.props.children).toEqual("Perfil");
  });
});
