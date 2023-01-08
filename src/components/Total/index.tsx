import Link from "next/link"
import { CircularProgress } from "@mui/material"
import { useContext, useMemo, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { useRouter } from "next/router"
import { admContext } from "../../context/admContext"
import { AdmContextProps } from "../../interfaces/AdmContextProps"

interface TotalProps {
  inRequests?: boolean
}

export function Total({ inRequests }: TotalProps) {
  const router = useRouter()
  const { cart, total, getTotal, cleanCart, comments } = useContext(CartContext)
  const { handleNewOrder } = useContext<AdmContextProps>(admContext)

  const [enableLink, setEnableLink] = useState(false)
  const [loading, setLoading] = useState(false)

  useMemo(() => {
    getTotal()
  }, [total, cart])


  useMemo(() => {
    total > 0 ? setEnableLink(true) : setEnableLink(false)
  }, [total])

  function postRequest() {

    const bodyOfRequest = {cart, total, comments}

    fetch('/api/fRequest', {
      method: 'POST',
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify(bodyOfRequest)
    })
      .then(data => {
        alert("Pedido feito com sucesso")
        /**
         * para evitar muitas requisições ao banco, na regra de negócio da página administration.tsx, existe uma regra que consome o banco de dados para listar os pedidos...
         * a regra precisa desse "localList", se ele não existir, fará a requisição ao banco, se ele existir, vai listar na tela os dados do localStorage (que é a lista da ultima requisição ao banco)
         * 
         * sempre que tiver um novo pedido, vai remover essa âncora "localList" do localStorage 
        */
      //  localStorage.removeItem("localList")
      //  localStorage.removeItem("dataCart")
      //  localStorage.removeItem("dataTotal")
       localStorage.clear()

        handleNewOrder()
        cleanCart()
        router.push('/')
      })
      .catch(error => console.error(error))
  }

  return (
    <footer
      className="flex justify-around px-4 py-3 fixed bottom-0 left-0 right-0 w-full bg-primary items-center max-w-[900px] mx-auto z-50"
    >
      <span
        className="text-total flex-1 md:text-lg"
      >
        Total: R$ {total},00
      </span>

      {
        inRequests ? (
          <button
            className={`button max-w-sm select-none font-light
          ${enableLink ? "pointer-events-auto" : "pointer-events-none opacity-50"}`}
            onClick={() => {
              setLoading(true)
              postRequest()
            }}
          >
            {
              loading ? <CircularProgress color="inherit" size={20} /> : "Realizar Pedido"
            }
          </button>
        ) : (
          <Link
            href="/requests"
            className={`button max-w-sm select-none font-light
          ${enableLink ? "pointer-events-auto" : "pointer-events-none opacity-50"}`}
            onClick={() => setLoading(true)}
          >
            {
              loading ? <CircularProgress color="inherit" size={20} /> : "Ver o carrinho"
            }
          </Link>
        )
      }
    </footer>
  )
}
