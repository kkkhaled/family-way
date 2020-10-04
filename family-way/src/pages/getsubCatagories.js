import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import GetSubCatagories from "../components/getSubCatagoris";

const Getsubcatagiories = () => {
  return (
    <BasePage pageTitle="صفحه الاصناف الفرعيه">
      <Section>
        <GetSubCatagories />
      </Section>
    </BasePage>
  );
};

export default Getsubcatagiories;
