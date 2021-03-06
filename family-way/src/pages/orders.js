import React from 'react'
import BasePage from './basePage'
import Section from '../components/section'
import OrdersTable from '../components/orders-all'

const OrdersPage = () => {
  return (
    <BasePage pageTitle=' عرض الطلبات'>
      <Section>
        <OrdersTable isArchived={false} />
      </Section>
    </BasePage>
  )
}

export default OrdersPage
