
import { ItemProps } from "../../interfaces/ItemProps";
import { RequestOnAdmProps } from "../../interfaces/RequestOnAdmProps";

export function RequestBody({ order, index, orderDelivered}: RequestOnAdmProps) {

  return (
    <div
      className="w-full max-w-[500px] p-5
          flex flex-col items-start justify-between 
          border-b bg-item-card rounded-lg shadow-lg"
    >
      <span
        className="mb-3"
      >Mesa: {index}</span>
      {
        order.pedido.map((singleItem: ItemProps) => (
          <div className="">
            <h3
              className="text-2xl text-subtitle mt-3"
            >
              {singleItem.name}
            </h3>

            <span>Quantidade: {singleItem.count}</span>

          </div>
        ))
      }
      <span>{order.day}</span>
      <button
        className="block ml-auto bg-button-primary p-3 text-button-primary rounded-md"
        onClick={() => orderDelivered(index)}
      >
        Pedido Entregue
      </button>
    </div>
  )
}
