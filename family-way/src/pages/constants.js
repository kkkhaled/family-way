import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import Constants from "../components/constants";

const ContantsPage = () => {
  return (
    <BasePage pageTitle="صفحه الثوابت ">
      <Section>
        <Constants />
      </Section>
    </BasePage>
  );
};

export default ContantsPage;
