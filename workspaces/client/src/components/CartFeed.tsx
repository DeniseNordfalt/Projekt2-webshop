import { CartItem, ProductItem } from '@project-webbshop/shared'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { deleteCartItem, getCart, purchase } from '../api'

import CartCard from './CartCard'

type Props = {}

const StyledList = styled.div`

display: flex;
flex-direction:center;
justify-content:center;
flex-wrap: wrap;
overflow-y:scroll;
`


const CartFeed =() => {
  const [cartList, setCartList] = useState<CartItem[]>([])

  const totalCost = cartList.reduce((total: number, item: CartItem): number => {
     return total + parseInt(item.price.replace(/\D+/g, ""))
  }, 0)

  const createPurchase = () => {
      purchase()
      fetchData()
  }
  

  const fetchData = async () => {
    const data = await getCart()
    
    setCartList(data)
 
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <StyledList>
        {cartList.map((cartList) => {
          return <CartCard fetchData={fetchData} data={cartList} key={cartList._id}/>;
        })}

      </StyledList>
      <div>
        <h3>Total: { `${totalCost} kr`}  </h3>

        <button onClick={(e) => createPurchase()}>SPEND THAT MOOONEEEEEEEEEYYY</button>
      </div>
    </div>
  )
}

export default CartFeed