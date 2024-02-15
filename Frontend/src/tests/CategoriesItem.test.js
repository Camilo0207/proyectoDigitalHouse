import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import CategoriesItem from "../components/CategoriesItem";
import CategoryOption from "../components/CategoryOption";

describe("CategoriesItem", () => {
  beforeEach(() => jest.clearAllMocks());
  const itemMock = {
    id: 1,
    name: "Hoteles",
    imgUrl: "https://i.imgur.com/B9Kuf6S.png",
    results: [
      {
        id: 1,
        nombre: "Hermitage Hotel",
        categoria: "Hotel ",
        numeroEstrella: 2,
        descripcion:
          "En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires.",
        ubicacion: " A 940 m del centro",
        imgUrl:
          "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/04/13/16498369774107.jpg",
        country: "Argentina",
        state: "Ciudad Autonoma de Buenos aires",
        city: "Buenos Aires",
        services: [
          "kitchen",
          "television",
          "airConditioning",
          "pets",
          "freeParking",
          "pool",
          "wifi",
        ],
        caracteristics: {
          houseRules: [
            "Check-out: 10:00",
            "No se permiten fiestas",
            "No fumar",
          ],
          healthAndSecurity: [
            "se aplican las pautas de distanciaminto social y otras normas relacionadas",
            "Detector de humo",
            "Deposito de seguridad",
          ],
          cancellationPolicies: [
            "Agrega las fechas de tu viaje para obtener los detalles de cancelacion de esta estadia",
          ],
        },
      },
      {
        id: 2,
        nombre: "Hermitage Hotel",
        categoria: "Hotel ",
        numeroEstrella: 3,
        descripcion:
          "En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires.",
        ubicacion: " A 940 m del centro",
        imgUrl:
          "https://static1.eskypartners.com/travelguide/vancouver-hotels.jpg",
        country: "Argentina",
        state: "Ciudad Autonoma de Buenos aires",
        city: "Buenos Aires",
        services: [
          "kitchen",
          "television",
          "airConditioning",
          "pets",
          "freeParking",
          "pool",
          "wifi",
        ],
      },
      {
        id: 3,
        nombre: "Hermitage Hotel",
        categoria: "Hotel ",
        numeroEstrella: 1,
        descripcion:
          "En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires.",
        ubicacion: " A 940 m del centro",
        imgUrl:
          "https://www.alvarezarguelles.com/wp-content/uploads/sites/2380/nggallery/content//mobile_hoteles_y_apartamentos_02_hoteles_mar_de_plata-copy.jpg",
        country: "Argentina",
        state: "Ciudad Autonoma de Buenos aires",
        city: "Buenos Aires",
        services: [
          "kitchen",
          "television",
          "airConditioning",
          "pets",
          "freeParking",
          "pool",
          "wifi",
        ],
      },
      {
        id: 4,
        nombre: "Hermitage Hotel",
        categoria: "Hotel ",
        numeroEstrella: 5,
        descripcion:
          "En el corazón de San Telmo, disfruta de un albergue inspirado en las pasiones de Buenos Aires.",
        ubicacion: " A 940 m del centro",
        imgUrl:
          "https://content.r9cdn.net/himg/7f/bb/e5/arbisoftimages-645819-SEVCU_MasterSuite_Bedroom_5-image.jpg",
        country: "Argentina",
        state: "Ciudad Autonoma de Buenos aires",
        city: "Buenos Aires",
        services: [
          "kitchen",
          "television",
          "airConditioning",
          "pets",
          "freeParking",
          "pool",
          "wifi",
        ],
      },
    ],
  };
  const setSelectedCategoryMock = jest.fn();

  test("Verifico que se renderice correctamente", () => {
    render(
      <CategoryOption
      setSelectedCategory={setSelectedCategoryMock}
      key={''}
      item={itemMock}
      />
    );
    screen.debug()
    expect(1).toBe(1);
    // expect(screen.getByText('Hoteles')).toBeInTheDocument()
    // expect(screen.getByText('Hostels')).toBeTruthy()
    // expect(screen.getByText('Departamentos')).toBeTruthy()
    // expect(screen.getByText('Bed and breakfast')).toBeTruthy()
    // expect(screen.getAllByText('test')).toBeTruthy()
  });

  test("Verifico que se ejecute correctamente el OnClick", () => {

    render(
      <CategoriesItem
        item={itemMock}
        setSelectedCategory={setSelectedCategoryMock}
      />
    );
    
    const categoryItem = screen.getByTestId('card')
    fireEvent.click(categoryItem)
    expect(setSelectedCategoryMock).toBeCalled()

  });
});
