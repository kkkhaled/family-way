import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import CouponsView from '../components/couponsView'

const CouponsPage = () => {
  return (
    <BasePage pageTitle="صفحه عرض الكوبونات ">
      <Section>
        <CouponsView />
      </Section>
    </BasePage>
  );
};

export default CouponsPage;
