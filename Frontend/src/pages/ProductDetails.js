import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductDetailsInfo from "../components/ProductDetailsInfo";

export default function ProductDetails() {
  const { infoItem } = useParams();
  return (
    <div>
      <Header />
      <ProductDetailsInfo infoItem={infoItem} />
      <Footer />
    </div>
  );
}
