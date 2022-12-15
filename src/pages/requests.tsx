import { useContext } from "react"
import { ItemRequested } from "../components/Card/ItemRequested"
import { CartContext } from "../context/CartContext"
import { ItemProps } from "../interfaces/ItemProps"
import { Total } from "../components/Total"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';

export default function Requests() {
  const { cart } = useContext(CartContext)

  return (
    <div
      className="flex w-full min-h-[90vh] items-center flex-col mt-[40px]"
    >
      <div
      className="w-full h-full max-w-[500px]"
      >
        <button
          className="back-button top-0 mr-0"
          onClick={() => history.back()}
        >
          <ArrowBackIosRoundedIcon fontSize="small" />
        </button>
        <div
          className="w-full px-5 flex flex-col items-center justify-between min-h-[90%]"
        >
          {
            cart.length != 0 ? (
              <>
                <ul className="max-w-[500px] w-full mb-[80px]">
                  {
                    cart.map((item: ItemProps) => (
                      <ItemRequested key={item.id} item={item} />
                    ))
                  }
                </ul>

                <div
                  className="w-full"
                >
                  <Total inRequests/>
                </div>
              </>

            ) : (
              <span className="block my-auto text-6xl icon text-center">
                <RemoveShoppingCartRoundedIcon fontSize="inherit" />
                <span
                  className="text-base block border"
                >Vazio</span>
              </span>
            )
          }
        </div>
      </div>
    </div >
  )
}

