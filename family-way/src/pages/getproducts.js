import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import GetProducts from "../components/getProducts";

const Getproducts = () => {
  return (
    <BasePage pageTitle="صفحه عرض المنجات">
      <Section>
        <GetProducts />
      </Section>
    </BasePage>
  );
};

export default Getproducts;
