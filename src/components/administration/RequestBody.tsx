
import { ItemProps } from "../../interfaces/ItemProps";
import { RequestOnAdmProps } from "../../interfaces/RequestOnAdmProps";

export function RequestBody({ order, index, orderDelivered }: RequestOnAdmProps) {
  
  return (
    <div
      className="w-full max-w-[500px] p-5
          flex flex-col items-start justify-between 
          border-b bg-item-card rounded-lg shadow-md"
    >
      {
        order.DATA.pedido.map((singleItem: ItemProps) => (
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
        <span
        className="my-3 text-xl text-item-price ml-auto"
        >Total: R${order.TOTAL},00
        </span>
      <div
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 py-2"
      >
        <span
          className="p-1 px-3 rounded-full bg-date mt-2 text-white tracking-wide font-light"
        >{order.DATA.day}</span>
        <button
          className="bg-button-primary hover:bg-button-primary-onclick focus:bg-button-primary-onclick p-3 text-button-primary rounded-md"
          onClick={() => orderDelivered(index)}
        >
          Pedido Entregue
        </button>
      </div>
    </div>
  )
}
