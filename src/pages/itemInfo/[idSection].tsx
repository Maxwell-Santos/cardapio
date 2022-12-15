import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { CartContext } from "../../context/CartContext";
import { CartContextProps } from "../../interfaces/CartContextProps";
import { ItemProps } from '../../interfaces/ItemProps';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export default function ItemInfo() {
  const { query } = useRouter()
  const { idSection, id } = query
  const [foundedItem, setFoundedItem] = useState<ItemProps>()
  const [quantity, setQuantity] = useState(foundedItem?.count)

  const {
    findSection,
    findItem,
    addToCart,
    getTotal,
    cart,
  } = useContext<CartContextProps>(CartContext)


  const findItemOutOfCart = () => {
    const section = findSection(Number(idSection))
    const ItemOutOfCart = findItem(section.content, String(id))
    setFoundedItem(ItemOutOfCart)
  }

  useEffect(() => {
    const itemInCart = cart.some((item: any) => item.id === id) //true ou false

    if(itemInCart){
      cart.find((item:any) => item.id == id && setFoundedItem(item))
      // console.log("de dentro do carrinho", cart)
      
    } else {
      // console.log("de fora do carrinho", cart)
      findItemOutOfCart()
    }

  }, [])

  function moreOne() {
    foundedItem && setQuantity(foundedItem.count++)
    // console.log(quantity)
    // console.log(foundedItem)

  }

  function lessOne() {
    if (quantity && quantity > 0) {
      foundedItem && setQuantity(foundedItem.count--)
      getTotal()

    } else {
      if(foundedItem){
        setQuantity(foundedItem.count = 1)
      } 

      alert("a seleção mínima é 1")
    }
    // console.log(quantity)
    // console.log(foundedItem)
  }

  return (
    <div className="w-screen h-screen flex justify-center">
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

                <div className="flex items-center justify-center gap-2 text-lg">

                  <button
                    onClick={lessOne}
                    className={`${quantity && quantity <= 0 ?
                      "bg-button-primary-disable pointer-events-none " :
                      "bg-button-primary"}
                      p-2 rounded-full text-button-primary`}
                  >-</button>

                  <div className="w-5 text-center">
                    <span>{foundedItem.count}</span>
                  </div>

                  <button
                    onClick={moreOne}
                    className="p-2 bg-button-primary rounded-full text-button-primary"
                  >+</button>
                </div>

                <button
                  className="button"
                  onClick={() => {
                    addToCart(Number(idSection), String(id))
                    history.back()
                  }}
                >
                  Adicionar
                  <AddShoppingCartRoundedIcon />
                </button>
              </div>
            </>
          ) : (

            <h1>Carregando...</h1>
          )
        }
      </div>
    </div>
  )
}


// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps = async () => {
//   return {
//     props: {
//       b: 'bom dia'
//     },
//     revalidate: false
//   }
// }