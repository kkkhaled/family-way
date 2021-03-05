import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import Emails from '../components/emails'

const Email = () => {
  return (
    <BasePage pageTitle="رسائل البريد">
      <Section>
        <Emails />
      </Section>
    </BasePage>
  );
};

export default Email;
