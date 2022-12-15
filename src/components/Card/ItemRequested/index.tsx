import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { ItemProps } from "../../../interfaces/ItemProps";

interface Item {
  item: ItemProps
}

export function ItemRequested({
  item: {
    id,
    name,
    price,
    info,
    count,
  } }: Item) {

  const { reduction, increase, removeFromCart } = useContext(CartContext)

  //precisei criar este estado, porque não estava atualizando a quantidade de item na tela, apesar de realmente atualizar, não refletia na tela, apenas quando saísse e voltasse para o carrinho(requests.tsx), ele mostrava o valor certo  
  const [mirror, setMirror] = useState(count)

  function handleQuantity(quantity: number) {
    console.log("quantidade do item", quantity)
    console.log("meu espelho", mirror)

    setMirror(quantity)
  }

  return (
    <li
      className="w-full max-w-[500px] py-4
     flex items-center justify-between flex-wrap
     border-b border-request-list"
    >

      <div className="flex-1">
        <h2
          className="text-2xl leading-tight"
        >
          {name}
        </h2>
        <span
          className="font-Fraunces"
        >R${price},00</span>
      </div>

      <div className="flex items-center justify-center gap-2 text-lg ml-auto mr-2 sm:mr-5">

        <button
          onClick={() => handleQuantity(reduction(id))}
          className="p-2 bg-button-primary rounded-full text-button-primary"
        >-</button>

        <div className="w-2 sm:w-5 text-center">
          <span>
            {count}
          </span>
        </div>

        <button
          onClick={() => handleQuantity(increase(id))}
          className="p-2 bg-button-primary rounded-full text-button-primary"
        >+</button>
      </div>
      <IconButton
        className="cursor-pointer"
        title="remover item do carrinho"
        aria-label="remover item do carrinho"
        onClick={() => removeFromCart(id)}
      >
        <CloseRounded />
      </IconButton>
    </li>
  )
}
