import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import GetCompanies from "../components/getCompanies";

const Companies = () => {
  return (
    <BasePage pageTitle="عرض الشركات">
      <Section>
        <GetCompanies />
      </Section>
    </BasePage>
  );
};

export default Companies;