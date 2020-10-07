import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import AddProducts from "../components/addProducts";

const Addproducts = () => {
  return (
    <BasePage pageTitle="صفحه اضافه المنتجات">
      <Section>
        <AddProducts />
      </Section>
    </BasePage>
  );
};

export default Addproducts;
