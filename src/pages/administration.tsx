import { order as wishList } from "../utils/Orders"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import { RequestBody } from "../components/administration/RequestBody"
import { OrderProps } from "../interfaces/OrderProps"
import { useEffect, useState } from "react"

export default function Administration() {
  const [list, setList] = useState(wishList)

  const orderDelivered = (indexItemDelivered: number) => {
    const listUpdated = list.map((order, index) => {
      if (indexItemDelivered == index) {
        list.splice(index, 1)
        return list
      }
    })
    setList(prevState => prevState = listUpdated)
  }

  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem("ListKey", JSON.stringify(list))
      
      console.log(localStorage.getItem("ListKey"))
    }


  },[])

  useEffect(() => {
    setList(list)

    // const dataList = JSON.parse(localStorage.getItem("ListKey"))
    // if (dataList !== null) setList(dataList)
  },[list])
  
  return (
    <>
      <button
        className="back-button fixed"
        onClick={() => history.back()}
      >
        <ArrowBackIosRoundedIcon fontSize="small" />
      </button>
      <h1
        className="mx-auto text-center block w-fit pt-10"
      >
        Administração de pedidos
      </h1>

      <div className="w-full flex flex-wrap gap-5 md:p-14">
        {
          wishList.length > 0 ? wishList.map((order: OrderProps, index) => (
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
