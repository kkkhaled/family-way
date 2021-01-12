import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import AddSlider from "../components/addslider";

const AddSliders = () => {
  return (
    <BasePage pageTitle=" اضافه السلايدر">
      <Section>
        <AddSlider />
      </Section>
    </BasePage>
  );
};

export default AddSliders;