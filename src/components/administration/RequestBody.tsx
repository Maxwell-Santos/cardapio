
import { format } from "date-fns";
import { ItemProps } from "../../interfaces/ItemProps";
import { OrderProps } from "../../interfaces/OrderProps";

interface RequestBodyProps{
  order: OrderProps
}
export function RequestBody({order}: RequestBodyProps) {

  const {
    cart,
    comments,
    createdAt,
    total
  } = order

  const dateFormatted = format(new Date(createdAt), "HH':'mm 'de' dd/MM/yyyy")

  return (
    <div
      className="w-full max-w-[500px] p-5
          flex flex-col items-start justify-between 
          border-b bg-item-card rounded-lg shadow-sm"
    >
      {
        cart.map((singleItem: ItemProps) => (
          <div 
          key={singleItem.id}
          className="rounded-lg shadow-sm bg-item-card w-full mb-3 p-3"
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
      
      <p 
        className={!comments ? "hidden" : "opacity-80 leading-snug bg-box-comments/10 w-full rounded-md p-2 px-3 text-comment max-h-[120px] overflow-auto"}
        >
          {comments}
        </p>

        <span
        className="my-3 text-xl text-item-price ml-auto"
        >Total: R${total},00
        </span>
      <div
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 py-2"
      >
        <span
          className="p-1 px-3 rounded-full bg-date mt-2 text-white tracking-wide font-light"
        >
          {dateFormatted}
        </span>

        <button
          className="bg-button-primary hover:bg-button-primary-onclick focus:bg-button-primary-onclick p-3 text-button-primary rounded-md"
        >
          Pedido Entregue
        </button>
      </div>
    </div>
  )
}
