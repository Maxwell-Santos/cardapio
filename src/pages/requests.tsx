import { useContext, useEffect, useState, useMemo } from "react"
import { ItemRequested } from "../components/Card/ItemRequested"
import { CartContext } from "../context/CartContext"
import { ItemProps } from "../interfaces/ItemProps"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { IconButton } from "@mui/material";
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';

export default function Requests() {

  const { cart, getTotal, total } = useContext(CartContext)

  /**
   * life cycle of component: Sempre que um estado é mudado o componente é re-renderizado
   * logo, quando o cart.length mudar, o componente irá fazer outro map por ele
   * */

  useMemo(() => {
    getTotal()
  }, [total, cart])
  return (
    <div
      className="flex w-full justify-center flex-col"
    >
      <IconButton
        className="m-5 block w-fit aspect-square cursor-pointer p-0"
        onClick={() => history.back()}
      >
        <ArrowBackIosRoundedIcon fontSize="small" />
      </IconButton>
      <div
        className="w-full px-5 flex flex-col items-center justify-between min-h-[80vh]"
      >
        {
          cart.length != 0 ? (
            <>
              <ul className="max-w-[500px] w-full">
                {
                  cart.map((item: ItemProps) => (
                    <ItemRequested key={item.id} item={item} />
                  ))
                }
              </ul>
              <span>Total: R$ {total},00</span>
            </>
          ) : (
            <h1 className="inline-block my-auto text-6xl opacity-50">
              <RemoveShoppingCartRoundedIcon fontSize="inherit" /></h1>
          )
        }
      </div>
    </div >
  )
}

