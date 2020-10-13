import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import Orders from "../components/orders";

const OrdersPage = () => {
  return (
    <BasePage pageTitle=" عرض الطلبات">
      <Section>
        <Orders />
      </Section>
    </BasePage>
  );
};

export default OrdersPage;
