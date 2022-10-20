import { ProductItem } from '@project-webbshop/shared'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getProducts } from './api'
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
  const [cartList, setCartList] = useState<ProductItem[]>([])

 const totalPrice = cartList.reduce((total: number, item: ProductItem): number=> {
    return total +  parseInt(item?.price?.replace(/\D+/g, ""))
 }, 0)

  async function fetchData() {
    const data = await getProducts()
    setCartList(data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <StyledList>
        {cartList.map((cartList) => {
          return <CartCard data={cartList} key={cartList._id}/>;
        })}

      </StyledList>
      <div>
        <h3>Total: {`${totalPrice} kr`}</h3>
       
      </div>
    </div>
  )
}

export default CartFeed