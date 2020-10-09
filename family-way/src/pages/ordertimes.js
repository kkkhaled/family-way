import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import OrderTimes from "../components/orderTimes";

const Ordertimes = () => {
  return (
    <BasePage pageTitle="صفحه اوقات الطلبات">
      <Section>
        <OrderTimes />
      </Section>
    </BasePage>
  );
};

export default Ordertimes;
