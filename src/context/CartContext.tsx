import dataItems from '../../public/data.json'
import React, { createContext, useState } from "react"
import { ItemProps } from '../interfaces/ItemProps';
import { SectionProps } from '../interfaces/SectionProps';

export const CartContext = createContext<any>([])

export function CartProvider({ children }: any) {
  const data = dataItems

  const [cart, setCart] = useState<ItemProps[]>([])

  const findSection = (sectionId: number): SectionProps => {
    let SECTION: SectionProps = {
      id: 0,
      name: '',
      content: []
    }

    data.map(section => {
      try {
        if (section.id == sectionId) {
          SECTION.id = section.id
          SECTION.name = section.name
          SECTION.content = section.content

          console.log("achou", section)
        }
      } catch (error) {
        console.log("item não encontrado", error)
      }

    })

    return SECTION
  }

  const findItem = (products: any, productId: string): ItemProps[] => {
    const itemFounded = products.find((item: ItemProps) => item.id == productId)

    return itemFounded
  }

  const AddToCart = (sectionId: number, productId: string) => {
    const section = findSection(sectionId) //procurar a seção

    //checando se o produto ja existe no carrinho
    //true: se o id não existir dentro do cart
    //false: se o id existir dentro do cart
    const check = cart.every(item => {
      return item.id !== productId
    })

    if (check) {
      const data = section.content.filter(product =>{
        return product.id === productId
    })
      setCart(prev => [...prev, ...data])

    } else {
      alert("O Produto já foi adicionado ao carrinho.")
    }
  }
  console.log("meu carrinho",cart)

  const RemoveFromCart = (id: string) => {
    cart.map((product: ItemProps, index) => {
      if (product.id == id) {
        cart.splice(index, 1)
      }
    })
  }

  // const GetTotal = () => {
  //   const total = cart.reduce((prev, item) => prev.price + (item.price * item.count))
  //   return total
  // }

  return (
    <CartContext.Provider value={{
      data,
      cart,
      setCart,
      AddToCart,
      RemoveFromCart,

      findSection,
      findItem,
    }}>

      {children}
    </CartContext.Provider>
  )
}
