import { render, screen } from "@testing-library/react";
import App from "./App";

test("Verificar que renderice correctamente", () => {
  render(<App />);
  expect(screen.getByText("Sentite como en tu hogar")).toBeInTheDocument();
  expect(screen.getByText("Crear cuenta")).toBeInTheDocument();
  expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  expect(screen.getByText("Busca ofertas en hoteles,")).toBeInTheDocument();
  expect(screen.getByText("casas y mucho más")).toBeInTheDocument();
  // expect(screen.getByText("¿A dónde vamos?")).toBeInTheDocument();
  expect(screen.getByText("Check in - Check out")).toBeInTheDocument();
 
});
