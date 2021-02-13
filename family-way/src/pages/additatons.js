import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import Additatons from "../components/additatons";

const Additaton = () => {
  return (
    <BasePage pageTitle="صفحه الاضافات ">
      <Section>
        <Additatons />
      </Section>
    </BasePage>
  );
};

export default Additaton;