import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import UserDetails from "../components/userDetails";


const Userdetails = () => {
  return (
    <BasePage pageTitle="بيانات المستخدم ">
      <Section>
        <UserDetails />
      </Section>
    </BasePage>
  );
};

export default Userdetails;
