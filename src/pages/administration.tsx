import { useEffect, useState } from "react"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import { RequestBody } from "../components/administration/RequestBody"
import { OrderProps } from "../interfaces/OrderProps"
import { Skeleton } from "@mui/material"

export default function Administration() {
  const [list, setList] = useState([])

  useEffect(() => {
    const localList = localStorage.getItem("localList")
    
    if (!localList) {
      fetch('/api/fRequest')
        .then(response => response.json())
        .then(data => {
          setList(data.data)
          localStorage.setItem("localList", JSON.stringify(data.data))
          console.log("mostrando do banco de dados")
        })
        .catch(error => console.log(error))
      }
      else {
        setList(JSON.parse(localList))
        console.log("mostrando do local")
    }

  }, [])

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
          list.length > 0 ?
            list.map((order: OrderProps, index) => (
              <RequestBody key={index} order={order} index={index} />

            )) : (

              <div
                className="flex flex-wrap gap-3 justify-center p-5 w-screen"
              >
                <Skeleton className="skeleton-adm" variant="rectangular" animation="wave" />
                <Skeleton className="skeleton-adm" variant="rectangular" animation="wave" />
                <Skeleton className="skeleton-adm" variant="rectangular" animation="wave" />
                <Skeleton className="skeleton-adm" variant="rectangular" animation="wave" />
                <Skeleton className="skeleton-adm" variant="rectangular" animation="wave" />
                <Skeleton className="skeleton-adm" variant="rectangular" animation="wave" />
              </div>
            )
        }
      </div>
    </>
  )
}