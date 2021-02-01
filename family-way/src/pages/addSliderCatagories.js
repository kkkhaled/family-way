import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import AddSlider from "../components/addSlidersCatagories";

const AddSliderCatagories = () => {
  return (
    <BasePage pageTitle=" اضافه السلايدرالاصناف الثالثه">
      <Section>
        <AddSlider />
      </Section>
    </BasePage>
  );
};

export default AddSliderCatagories;