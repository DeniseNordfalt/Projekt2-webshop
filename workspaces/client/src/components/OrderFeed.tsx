import { CartItem } from '@project-webbshop/shared'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {getOrders } from '../api'


import OrderCard from './OrderCard'

type Props = {}

const StyledList = styled.div`

display: flex;
flex-direction:center;
justify-content:center;
flex-wrap: wrap;
overflow-y:scroll;
`


const OrderFeed =() => {
  const [orderList, setOrderList] = useState<CartItem[]>([])





  const fetchData = async () => {
    const data = await getOrders()
    
    setOrderList(data)
 
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <StyledList>
        {orderList.map((orderList) => {
          return <OrderCard data={orderList} key={orderList._id}/>;
        })}

      </StyledList>
      <div>
       

        
      </div>
    </div>
  )
}

export default OrderFeed