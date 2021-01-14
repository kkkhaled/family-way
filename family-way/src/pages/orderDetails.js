import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import OrdersDetails from "../components/ordersDetails";

const OrdersDetail = () => {
  return (
    <BasePage pageTitle="تفاصيل الطلب ">
      <Section>
        <OrdersDetails />
      </Section>
    </BasePage>
  );
};

export default OrdersDetail;
