import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import EmailDetails from "../components/emailDetails";

const EmailDetail = () => {
  return (
    <BasePage pageTitle="تفاصيل البريد">
      <Section>
        <EmailDetails />
      </Section>
    </BasePage>
  );
};

export default EmailDetail;