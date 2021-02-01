import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import GetSlider from '../components/getSliderCatagories'

const SliderCatagoriesPage = () => {
  return (
    <BasePage pageTitle="صفحه عرض السلايدرات الاصناف الثالثه">
      <Section>
        <GetSlider />
      </Section>
    </BasePage>
  );
};

export default SliderCatagoriesPage;