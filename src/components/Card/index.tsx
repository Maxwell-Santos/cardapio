import Link from "next/link"
import { useContext, useMemo, useState, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import { CardProps } from "../../interfaces/CardProps"
import { ItemProps } from "../../interfaces/ItemProps"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { CartContextProps } from "../../interfaces/CartContextProps"

export function Card({ sectionId, item }: CardProps) {

  const [existsItem, setExistsItem] = useState(false)
  const {
    cart,
    addToCart,
    increase,
    reduction,
    removeFromCart,
   } = useContext<CartContextProps>(CartContext)

  const findInCart = () => {
    const c = cart.map((itemInCart: ItemProps) => {
      if (item.id === itemInCart.id) {
        setExistsItem(true)
        return true
      }
      return false
    })

    return c
  }

  useMemo(() => {
    findInCart()
  }, [item])

  return (

    <div className={`w-full flex-1 rounded-md flex my-2 transition-all border-black h-32 overflow-hidden ease-out
    ${existsItem ? "bg-disable" : "bg-item-card shadow-sm md:hover:shadow-md hover:-translate-y-1"}`}>

      <Link href={`/itemInfo/${sectionId}?id=${item.id}`} className="flex-1">

        <div className="flex h-full gap-5">

          <div className="w-[7rem] md:w-[12rem] h-full">
            <img
              src={item.img || item.name}
              alt={`imagem ${item.name}`}
            />
          </div>

          <div className="flex flex-col flex-1 justify-center p-1">
            <h2
              className="text-subtitle leading-5 text-md line-clamp-2"
            >
              {item.name}
            </h2>

            <p className={`${existsItem ? "hidden" : "block opacity-80 line-clamp-2 leading-snug"}`}>
              {item.info}
            </p>

            <span className="text-item-price">
              R${item.price},00
            </span>
          </div>
        </div>

      </Link>

      <div className="flex items-center px-3 mr-3 text-icon z-10">
        {
          !existsItem ? (
            <div
              className="cursor-pointer group relative"
              onClick={() => {
                addToCart(Number(sectionId), String(item.id))
                setExistsItem(true)
              }}
            >
              <AddRoundedIcon />

              <span
                className="hidden absolute z-50 -top-4 right-0 text-sm whitespace-nowrap p-1 px-2 rounded-md shadow-md opacity-0 group-hover:-top-7 group-hover:opacity-100 transition-all md:inline-block "
              >
                Adicionar ao carrinho
              </span>
            </div>

          ) : (
            <div className="flex items-center justify-center gap-2 text-lg">

              <button
                className="p-2 text-icon text-2xl cursor-pointer"
                onClick={() => {
                  const target = item.count + 1
                  const withoutCart = findInCart()

                  if (target == 2 || withoutCart == false) {
                    setExistsItem(false)
                    removeFromCart(item.id, true)

                  } else {
                    reduction(item.id)
                  }

                  if (item.count == 1){
                    setExistsItem(false)
                  }
                  console.log(target)
                  console.log(item.count)
                }}

              >-</button>

              <div className="text-center">
                <span>{item.count}</span>
              </div>

              <button
                className={`p-2 text-icon text-2xl cursor-pointer`}
                onClick={() => { increase(item.id) }}
              >+</button>
            </div>
          )
        }
      </div>
    </div>

  )
}
