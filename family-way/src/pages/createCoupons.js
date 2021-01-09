import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import CreateCoupon from "../components/createCoupon";

const CreateCoupons = () => {
  return (
    <BasePage pageTitle=" انشاء الكوبانات">
      <Section>
        <CreateCoupon />
      </Section>
    </BasePage>
  );
};

export default CreateCoupons;
