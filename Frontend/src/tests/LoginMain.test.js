import { render, screen } from "@testing-library/react";
import React from "react";
import LoginMain from "../components/LoginMain";
import { BrowserRouter } from "react-router-dom";

describe("LoginMain", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Verifico que se renderice correctamente", () => {
    render(
      <BrowserRouter>
        <LoginMain />
      </BrowserRouter>
    );
   
    expect(1).toBe(1);
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByText("Contraseña")).toBeInTheDocument();
    expect(screen.getByText("¿Aún no tenes cuenta?")).toBeInTheDocument();
    expect(screen.getByText("Registrate")).toBeInTheDocument();
  });
});