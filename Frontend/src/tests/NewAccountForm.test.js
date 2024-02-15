import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import NewAccountForm from "../components/NewAccountForm";

describe("NewAccountForm", () => {
  beforeEach(() => jest.clearAllMocks());

  const onChangeMock = jest.fn()
  const onSubmitMock = jest.fn()
  const onBlurMock = jest.fn()

  const formMock = {
        name: 'name',
        lastname: 'lastname',
        email: 'name@gmail.com',
        password: 'test',
        confirmPassword: 'test'
    }
  const errorMock={}

  test("Verifico que se renderice correctamente", () => {
    render(
      <NewAccountForm 
      onChange={onChangeMock}
      form={formMock}
      onSubmit={onSubmitMock}
      errors={errorMock}
      onBlur={onBlurMock}
      />
    );

    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Apellido")).toBeInTheDocument();
    expect(screen.getByText("Contraseña")).toBeInTheDocument();
    expect(screen.getByText("Confirmar contraseña")).toBeInTheDocument();
  });

  test("Verifico que se ejecute correctamente el onSubmit para crear nueva cuenta",  () => {

    onSubmitMock.mockImplementation(event => {
        event.preventDefault();
      });
    render(
        <NewAccountForm 
        onChange={onChangeMock}
        form={formMock}
        onSubmit={onSubmitMock}
        errors={errorMock}
        onBlur={onBlurMock}
        />
    );

    const btn = screen.getByTestId('btnSubmit')
    if (btn) {
        fireEvent.click(btn);
      }
       waitFor(() => expect(onSubmitMock).toHaveBeenCalled());
    
  });
});
