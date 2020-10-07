import React from "react";
import BasePage from "./basePage";
import Section from "../components/section";
import UsersTable from "../components/usersTable";

const Userstable = () => {
  return (
    <BasePage pageTitle="صفحه المستخدمين">
      <Section>
        <UsersTable />
      </Section>
    </BasePage>
  );
};

export default Userstable;
