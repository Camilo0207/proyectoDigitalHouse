import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import Searcher from "../components/Searcher";
import { LanguageProvider } from "../context/LanguageContext";

describe("Searcher", () => {
  beforeEach(() => jest.clearAllMocks());
  
  const dataMock= {
    texts: '',
    handleLanguage: jest.fn(),
}

  test("Verifico que se renderice correctamente", () => {
    render(
      <LanguageProvider value={dataMock}>
        <Searcher />
      </LanguageProvider>
    );

    expect(screen.getByText("Busca ofertas en hoteles,")).toBeInTheDocument();
    expect(screen.getByText("casas y mucho más")).toBeInTheDocument();
    // expect(screen.getByText("¿A dónde vamos?")).toBeInTheDocument();
    expect(screen.getByText("Check in - Check out")).toBeInTheDocument();
  });

  // test("Verifico que se renderice el listado de ciudades al hacer click en el selector - onClick = {handleOption}", async () => {
    
  //   //ver
  //   const handleOptionsMock = jest.fn()
  //   const dbMock = [
  //       {
  //           id:1,
  //           departamento: 'Bs As',
  //           pais: 'Arg'
  //       }
  //   ] 
  //   render(
  //     <LanguageProvider value={dataMock}>
  //       <Searcher
  //       onClick={handleOptionsMock}
  //       openOptions={true}
  //       db = {dbMock}
  //       />
  //     </LanguageProvider>
  //   );

  //   // eslint-disable-next-line testing-library/no-debugging-utils
  //   screen.debug();
  //   const selectOption = screen.getByTestId('selectOption')
  //   fireEvent.click(selectOption)
  //   await waitFor(() => {
  //     expect(handleOptionsMock).toBeTruthy()
  //   })
  //   expect(dbMock).toBeTruthy() 

  // });


});
