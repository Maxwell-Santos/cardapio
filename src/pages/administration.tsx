import { useEffect, useMemo, useState } from "react"
import { order as wishList } from "../utils/Orders"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import { RequestBody } from "../components/administration/RequestBody"
import { OrderProps } from "../interfaces/OrderProps"

export default function Administration() {
  const [list, setList] = useState(wishList)

  useEffect(() => {
    const localList = localStorage.getItem("listItems")

    if (localList) {
      const localListStorage = JSON.parse(localList)

      setList(localListStorage)

    } else {
      setList(wishList)
    }

    // console.log(localStorage.getItem("listItems"))
  }, [])
  
  function setItemToLocal(){
    localStorage.setItem("listItems", JSON.stringify(list))
  }

  useMemo(() => {
    if (wishList.length > 0) setItemToLocal()

    console.log("mudou",list)
  }, [wishList.length])


  const orderDelivered = (indexItemDelivered: number) => {
    const l = localStorage.getItem("listItems") 
    const lp = l && JSON.parse(l)

    lp.map((order: any, index: number) => {
      if (indexItemDelivered == index) {
        lp.splice(index, 1)
        setList(lp)
        if(list.length == 0) localStorage.removeItem("listItems")
      }
    })

  }

  return (
    <>
      <button
        className="back-button fixed"
        onClick={() => history.back()}
      >
        <ArrowBackIosRoundedIcon fontSize="small" />
      </button>
      <h1
        className="mx-auto text-xl text-center block w-fit pt-10"
      >
        Administração de pedidos
      </h1>

      <div className="w-full flex items-center sm:items-start flex-wrap gap-5 p-6">
        {
          list.length > 0 ? list.map((order: OrderProps, index) => (
            <RequestBody key={index} order={order} index={index} orderDelivered={orderDelivered} />

          )) : (

            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] opacity-25 text-lg w-full text-center">
              <span>Ainda não há pedidos</span>
            </div>
          )
        }
      </div>
    </>

  )
}
