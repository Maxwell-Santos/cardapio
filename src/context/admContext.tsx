import { createContext, useState } from "react";

export const admContext = createContext<any>({})

//A função desse provider é evitar ficar fazendo requisições ao banco sem necessidade
// Pois sempre que carrega a lista de Pedidos, é uma nova requisição ao banco para pegar os pedidos, porém com a regra dessa função, ele vai persistir nos dados que ja foram uma vez buscados do banco, enquanto não houver um novo pedido
//Porque pensa comigo, para que ficar buscando do banco toda hora os dados, sendo que não mudou nada
export function AdmProvider({children}: any){

  const [order, setOrder] = useState(false)

  function handleNewOrder(){
    setOrder(true)
  }
  function handleNotNewOrder(){
    setOrder(false)
  }

  return(
  <admContext.Provider value={{
    handleNewOrder,
    handleNotNewOrder,
    order
  }}>
    {children}
  </admContext.Provider>
  )
}