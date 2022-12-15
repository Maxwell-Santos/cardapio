import dataItems from '../../public/data.json'
import React, { createContext, useEffect, useMemo, useState } from "react"
import { ItemProps } from '../interfaces/ItemProps'
import { SectionProps } from '../interfaces/SectionProps'

export const CartContext = createContext<any>([])

export function CartProvider({ children }: any) {
  const data = dataItems
  const [cart, setCart] = useState<ItemProps[]>([])
  const [total, setTotal] = useState<string | number>(0)

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

  const addToCart = (sectionId: number, productId: string) => {
    const section = findSection(sectionId) //procurar a seção

    //checando se o produto ja existe no carrinho
    //true: se o id não existir dentro do cart
    //false: se o id existir dentro do cart
    const check = cart.every((item: ItemProps) => {
      return item.id !== productId
    })

    if (check) {
      const data = section.content.filter(product => {
        return product.id === productId
      })
      setCart((prev: ItemProps[]) => [...prev, ...data])
    }
  }

  const cleanCart = () => {

    cart.forEach((item: any) => {
      item.count = 1
    })

    setCart((prevStateCart: ItemProps[]) => prevStateCart = [])
  }

  const removeFromCart = (id?: string) => {
    cart.map((product: ItemProps, index: number) => {
      if (product.id == id) {
        const response = confirm("Deseja remover esse item da sua lista?")
        if (response) {
          product.count = 1
          cart.splice(index, 1)
          console.log("de dentro da fn remover", cart)
        }
      }
    })
    getTotal()
  }

  const increase = (id: string) => {
    let quantityItem = 1

    cart.forEach((item: ItemProps) => {
      if (item.id === id) {
        item.count += 1
        quantityItem = item.count
      }
    })
    getTotal()
    return quantityItem
  }

  const reduction = (id: string) => {
    let quantityItem = 1

    cart.forEach((item: ItemProps) => {

      if (item.id == id) {
        if (item.count == 1) {
          removeFromCart(item.id)

        } else {
          item.count -= 1
        }
        quantityItem = item.count
      }
    })
    getTotal()

    return quantityItem
  }

  const getTotal = () => {
    const res = cart.reduce((prev: any, item: ItemProps) => {
      return prev + (item.price * item.count)
    }, 0)

    setTotal(res)
  }

  useMemo(() => {
    if(total > 0){
      localStorage.setItem('dataCart', JSON.stringify(cart))
      localStorage.setItem('dataTotal', JSON.stringify(total))

      // console.log(localStorage.getItem("dataCart"))
      // console.log(localStorage.getItem("dataTotal"))
    }
  }, [cart, total])
  
  useEffect(() => {
    const dataCart = localStorage.getItem('dataCart')
    if (dataCart) {
      const dataParse: ItemProps[] = JSON.parse(dataCart)
      setCart(dataParse)
    }

    const dataTotal = localStorage.getItem('dataTotal')
    if (dataTotal) {
      JSON.parse(dataTotal)
      setTotal(dataTotal)
    }
  }, [])

  return (
    <CartContext.Provider value={{
      data,
      cart,
      setCart,
      addToCart,
      cleanCart,
      removeFromCart,
      getTotal,
      setTotal,
      total,

      findSection,
      findItem,
      reduction,
      increase
    }}>

      {children}
    </CartContext.Provider>
  )
}
