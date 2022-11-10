import { useContext, useMemo } from "react"
import { ItemRequested } from "../components/Card/ItemRequested"
import { CartContext } from "../context/CartContext"
import { ItemProps } from "../interfaces/ItemProps"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { IconButton } from "@mui/material";
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';

export default function Requests() {

  const { cart, getTotal, total } = useContext(CartContext)

  useMemo(() => {
    getTotal()
  }, [total, cart])

  return (
    <div
      className="flex w-full justify-center flex-col mt-[40px]"
    >
      <IconButton
        className="back-button top-0 mr-0"
        onClick={() => history.back()}
      >
        <ArrowBackIosRoundedIcon fontSize="small" />
      </IconButton>
      <div
        className="w-full px-5 flex flex-col items-center justify-between min-h-[100vh]"
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
            <span className="block my-auto text-6xl icon text-center">
              <RemoveShoppingCartRoundedIcon fontSize="inherit"/>
              <span
              className="text-base block border"
              >Vazio</span>
              </span>
          )
        }
      </div>
    </div >
  )
}

