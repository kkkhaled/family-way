import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import Ads from "../components/ads";

const Adss = () => {
  return (
    <BasePage pageTitle="صفحه الاعلانات">
      <Section>
        <Ads />
      </Section>
    </BasePage>
  );
};

export default Adss;