import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import LoginForm from "../components/LoginForm";

describe("LoginForm", () => {
  beforeEach(() => jest.clearAllMocks());

  const formMock = {
    email: "",
    password: "",
  };

  const errorsMock = {};

  const handleChangeMock = jest.fn();
  const handleSubmitMock = jest.fn()

  test("Verifico que se renderice correctamente", () => {
    render(
      <LoginForm
        onChange={handleChangeMock}
        onSubmit={handleSubmitMock}
        form={formMock}
        errors={errorsMock}
      />
    );
    expect(screen.getByText('Correo electrónico')).toBeTruthy()
    expect(screen.getByText('Contraseña')).toBeTruthy()
  });

  test("Verifico que se ejecute correctamente el OnChange", () => {
    render(
      <LoginForm
      onChange={handleChangeMock}
      onSubmit={handleSubmitMock}
      form={formMock}
      errors={errorsMock}
      />
    );

    const emailInput = screen.getByTestId('emailInput')
    fireEvent.change(emailInput, {target: { value: 'test@gmail.com'}})
    expect(handleChangeMock).toBeCalled()
  });

  test("Verifico que se ejecute correctamente el OnClick del boton Ingresar", () => {

    handleSubmitMock.mockImplementation(event => {
        event.preventDefault();
      });
    render(
      <LoginForm
      onChange={handleChangeMock}
      onSubmit={handleSubmitMock}
      form={formMock}
      errors={errorsMock}
      />
    );

    const btnSubmit = screen.getByTestId('btnSubmit')
    fireEvent.click(btnSubmit)
    expect(handleSubmitMock).toBeCalled()
  });
});
