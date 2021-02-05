import React from 'react'
import BasePage from './basePage'
import Section from '../components/section'
import OrdersTable from '../components/orders-all'

const OrderArchived = () => {
  return (
    <BasePage pageTitle='الطلبات المأرشفة'>
      <Section>
        <OrdersTable isArchived={true} />
      </Section>
    </BasePage>
  )
}

export default OrderArchived
