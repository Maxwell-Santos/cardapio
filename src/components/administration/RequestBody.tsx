import { format } from "date-fns";
import { ItemProps } from "../../interfaces/ItemProps";
import { OrderProps } from "../../interfaces/OrderProps";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface RequestBodyProps {
  order: OrderProps
}
export function RequestBody({ order }: RequestBodyProps) {

  const {
    cart,
    comments,
    createdAt,
    total
  } = order

  const dateFormatted = format(new Date(createdAt), "HH':'mm 'de' dd/MM/yyyy")

  return (

    <Accordion
      className="w-full mb-3 p-2 sm:p-5 flex flex-col justify-between bg-item-card rounded-lg shadow-sm before:hidden min-[430px]:p-0"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        className="w-full"
      >
        <div className="flex flex-col items-center justify-between gap-2 w-full min-[430px]:flex-row">
          <span
            className="p-1 px-3 rounded-full bg-date text-white tracking-wide font-light"
          >
            {dateFormatted}
          </span>

          <span
            className="text-base text-item-price"
          >
            Total: R${total},00
          </span>

        </div>
      </AccordionSummary>

      <AccordionDetails className="flex-1 flex flex-col w-full">
      
      <div className="w-full grid sm:grid-cols-2 gap-2 mb-3">
        {
          cart.map((singleItem: ItemProps) => (
            <div
              key={singleItem.id}
              className="rounded-lg shadow-sm bg-item-card w-full flex-1 p-3"
            >
              <h3
                className="text-2xl text-subtitle mb-2"
              >
                {singleItem.name}
              </h3>
              <span
                className="block text-black/50"
              >
                Preço: R${singleItem.price},00
              </span>
              <span className="text-black/50">Quantidade: {singleItem.count}</span>

            </div>
          ))
        }          
        </div>
        <p
          className={!comments ? "hidden" : "opacity-80 leading-snug bg-box-comments/10 w-full rounded-md p-2 px-3 text-comment max-h-[120px] overflow-auto"}
        >
          {comments}
        </p>

        <div
          className="w-full flex items-center justify-between gap-2 py-2"
        >

          <button
            className="bg-button-primary hover:bg-button-primary-onclick focus:bg-button-primary-onclick p-3 text-button-primary rounded-md mt-3 flex-1"
          >
            Pedido Entregue
          </button>
        </div>
    </AccordionDetails>
    </Accordion >
  )
}
