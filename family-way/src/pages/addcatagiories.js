import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import AddCatagiories from "../components/addCatagoris";

const Addcatagiories = () => {
  return (
    <BasePage pageTitle="صفحه اضافه الاصناف">
      <Section>
        <AddCatagiories />
      </Section>
    </BasePage>
  );
};

export default Addcatagiories;
