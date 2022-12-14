import { useContext, useEffect, useMemo, useState } from "react"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import { RequestBody } from "../components/administration/RequestBody"
import { OrderProps } from "../interfaces/OrderProps"
import { Skeleton } from "@mui/material"
import { admContext } from "../context/admContext"
import { AdmContextProps } from "../interfaces/AdmContextProps"
import Head from "next/head"

export default function Administration() {
  const [list, setList] = useState([])
  const { handleNewOrder, handleNotNewOrder, order } = useContext<AdmContextProps>(admContext)

  useEffect(() => {
    const localList = localStorage.getItem("localList")

    //se o valor de order for false ou não existir um localstorage da lista de pedidos
    if (!order || !localList) {
      fetch('/api/fRequest')
        .then(response => response.json())
        .then(data => {
          setList(data.data)
          localStorage.setItem("localList", JSON.stringify(data.data))
          console.log("mostrando do banco de dados")
          handleNewOrder()
          
        })
        .catch(error => console.log(error))
    }
    else {
      setList(JSON.parse(localList))
      console.log("mostrando do local")
      handleNotNewOrder()
    }

  }, [])

  return (
    <>
    <Head>
      <title>Administração de pedidos</title>
    </Head>
    
      <button
        className="back-button fixed"
        onClick={() => history.back()}
      >
        <ArrowBackIosRoundedIcon fontSize="small" />
      </button>
      <h1
        className="mx-auto text-2xl text-center block w-fit pt-10"
      >
        Administração de pedidos
      </h1>

      <div className="w-full flex items-center flex-col p-6">
        {
          list.length > 0 ? (
            <ul className="mx-auto max-w-[800px] flex flex-col-reverse">
              {
                list.reverse().map((order: OrderProps, index: number) => (
                  <li><RequestBody key={index} order={order} /></li>
                ))
              }
            </ul>
            
          ) : (

              <div
                className="flex gap-3 justify-center p-5 w-screen min-h-screen"
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