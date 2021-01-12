import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import GetSlider from '../components/getslider'

const SliderPage = () => {
  return (
    <BasePage pageTitle="صفحه عرض السلايدرات ">
      <Section>
        <GetSlider />
      </Section>
    </BasePage>
  );
};

export default SliderPage;