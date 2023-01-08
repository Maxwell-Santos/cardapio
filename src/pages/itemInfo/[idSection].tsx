import Head from 'next/head'
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { CartContext } from "../../context/CartContext";
import { CartContextProps } from "../../interfaces/CartContextProps";
import { ItemProps } from '../../interfaces/ItemProps';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';


export default function ItemInfo() {
  const { query } = useRouter()
  const { idSection, id } = query
  const [foundedItem, setFoundedItem] = useState<ItemProps>()
  const [hasOrdered, setHasOrdered] = useState(false)

  const {
    findSection,
    findItem,
    addToCart,
    cart,
    increase,
    reduction,
    removeFromCart
  } = useContext<CartContextProps>(CartContext)


  const findItemOutOfCart = () => {
    const section = findSection(Number(idSection))
    const ItemOutOfCart = findItem(section.content, String(id))
    setFoundedItem(ItemOutOfCart)
  }

  useEffect(() => {
    const itemInCart = cart.some((item: any) => item.id === id) //true ou false

    if (itemInCart) {
      cart.find((item: any) => item.id == id && setFoundedItem(item))
      setHasOrdered(true)

    } else {
      setHasOrdered(false)
      findItemOutOfCart()
    }

  }, [])

  return (
    <>
      <Head>
        <title>{`${foundedItem?.name} ${foundedItem?.count}x`}</title>
      </Head>

      <div className="w-screen min-h-screen flex justify-center">
        <div
          className="w-full max-w-[500px] 
          flex-1 pb-5
          flex flex-col relative
      ">
          <button
            className="back-button absolute"
            onClick={() => history.back()}
          >
            <ArrowBackIosRoundedIcon fontSize="small" />
          </button>

          {
            foundedItem ? (
              <>
                <div
                  className="aspect-square w-full h-[50%] max-h-[400px] object-cover rounded-b-3xl overflow-hidden"
                >
                  <img
                    src={foundedItem.img || foundedItem.name}
                    alt={`imagem ${foundedItem.name}`}
                  />
                </div>

                <div className="mt-10 px-3">
                  <h1>
                    {foundedItem.name}
                  </h1>
                  <p>
                    {foundedItem.info}
                  </p>
                  <span
                    className="text-item-price font-Fraunces text-xl">
                    R${foundedItem.price},00
                  </span>
                </div>

                {/*button actions  */}
                <div className="flex justify-between gap-5 w-full mt-auto px-3">

                  {
                    !hasOrdered ? (
                      <>
                        <button
                          className="button"
                          onClick={() => {
                            addToCart(Number(idSection), String(id))
                            setHasOrdered(true)
                          }}
                        >
                          Adicionar
                          <AddShoppingCartRoundedIcon />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-center gap-2 text-lg">

                          <button
                            className={`${foundedItem && foundedItem.count <= 1 ?
                              "bg-button-primary-disable pointer-events-none " :
                              "bg-button-primary"}
                              p-2 rounded-full text-button-primary`}

                            onClick={() => { reduction(foundedItem.id) }}
                          >-</button>

                          <div className="w-5 text-center">
                            <span>{foundedItem.count}</span>
                          </div>

                          <button
                            className="p-2 bg-button-primary rounded-full text-button-primary"
                            onClick={() => { increase(foundedItem.id) }}
                          >+</button>
                        </div>
                        <button
                          className="text-icon p-2 rounded-full hover:bg-[#b61010fd] hover:text-white transition-all"
                          onClick={() => {
                            removeFromCart(String(id))
                            history.back()
                          }}
                        >
                          <DeleteOutlineRoundedIcon fontSize='medium'/>
                        </button>
                      </>

                    )
                  }
                </div>
              </>
            ) : (

              <h1>Carregando...</h1>
            )
          }
        </div>
      </div>
    </>

  )
}