import dataItems from '../../public/data.json'
import React, { createContext, useEffect, useMemo, useState } from "react"
import { ItemProps } from '../interfaces/ItemProps'
import { SectionProps } from '../interfaces/SectionProps'
import Swal from 'sweetalert2'

export const CartContext = createContext<any>([])

export function CartProvider({ children }: any) {
  const data = dataItems
  const [cart, setCart] = useState<ItemProps[]>([])
  const [total, setTotal] = useState<string | number>(0)
  const [comments, setComment] = useState<string>("")

  const handleComment = (comment: string) => {
    setComment(comment)
  }

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

    console.log(cart)
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

  const removeFromCart = (id?: string, withoutRequestsPage?: boolean) => {

    cart.map((product: ItemProps, index: number) => {
      if (product.id == id) {

        //criei essa condição para não chamar o alert quando for um decremento da lista, porque estava dando um erro de lógica então criei esse stopin para fazer a mesma coisa que normalmente faria, porém sem chamar o alert.

        if(withoutRequestsPage){
          product.count = 1
          cart.splice(index, 1)
          console.log("de dentro da fn remover", cart)

          const item = localStorage.getItem("dataCart")
          if (item) {
            const cartParsed = JSON.parse(item)
            cartParsed.map((locaItem: ItemProps, index: number) => {
              if (locaItem.id == id)
                cartParsed.splice(index, 1)
            })
          }
          getTotal()
      
        } else{
          Swal.fire({
            title: 'Quer mesmo remover esse item da lista?',
            text: `Você está prestes a remover ${product.count} ${product.name} da sua lista de pedido`,
            showCancelButton: true,
            showConfirmButton: true,
            focusDeny: true,
            cancelButtonText: `Manter na lista`,
            cancelButtonColor: '#8E3200',
            confirmButtonText: `Sim remover`,
            confirmButtonColor: '#2e46969d',
            background: '#fae5b9',
            color: '#8E3200',
            
          }).then((result) => {
            if (result.isConfirmed) {
              product.count = 1
              cart.splice(index, 1)
              console.log("de dentro da fn remover", cart)

              const item = localStorage.getItem("dataCart")
              if (item) {
                const cartParsed = JSON.parse(item)
                cartParsed.map((locaItem: ItemProps, index: number) => {
                  if (locaItem.id == id)
                    cartParsed.splice(index, 1)
                })
              }
            }
            getTotal()
          })
        }
      }
    })
  }

  const increase = (id: string) => {
    let quantityItem = 1

    cart.forEach((item: any) => {
      if (item.id === id) {
        item.count += 1
        quantityItem = item.count

        console.log("do carrinho", item)
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
    if (total > 0) {
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
      increase,

      handleComment,
      comments,
    }}>

      {children}
    </CartContext.Provider>
  )
}
