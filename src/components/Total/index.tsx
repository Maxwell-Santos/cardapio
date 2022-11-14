import Link from "next/link"
import { CircularProgress } from "@mui/material"
import { useContext, useMemo, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { useRouter } from "next/router"
import { order } from "../../utils/Orders"

interface TotalProps{
  inRequests?: boolean
}

export function Total({inRequests}: TotalProps) {
  const router = useRouter()
  const { cart, total, getTotal, cleanCart } = useContext(CartContext)

  const [enableLink, setEnableLink] = useState(false)
  const [loading, setLoading] = useState(false)
  
  useMemo(() => {
    getTotal()
  }, [total, cart])

  useMemo(() => {
    total > 0 ? setEnableLink(true) : setEnableLink(false)
  },[total])

  function postRequest(){

    fetch('/api/foodRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart)
    })
    .then(response => response.json())
    .then(data => {
      
      order.push(data.data)

      alert("Pedido feito com sucesso")
      
      cleanCart()
      router.push('/')
    })
    .catch(error => console.error(error))
  }

  return (
    <div
      className="flex justify-around px-4 py-3 fixed bottom-0 left-0 right-0 w-full bg-primary/50 backdrop-blur-md items-center max-w-[900px] mx-auto"
    >
      <span
        className="text-total flex-1 md:text-lg"
      >
        Total: R$ {total},00
      </span>

      {
        inRequests ? (
          <button
          className={`button max-w-sm select-none
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
          className={`button max-w-sm select-none
          ${enableLink ? "pointer-events-auto" : "pointer-events-none opacity-50"}`}
          onClick={() => setLoading(true)}
        >
          {
            loading ? <CircularProgress color="inherit" size={20} /> : "Ver o carrinho"
          }
        </Link>
        )
      }
    
    </div>
  )
}
