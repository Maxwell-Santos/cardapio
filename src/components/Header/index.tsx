import { Badge } from "@mui/material";
import Link from "next/link";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
export function Header() {

  const { cart } = useContext(CartContext)

  return (
    <header
      className="w-full p-5 pb-0
      flex items-center justify-between"
    >
      <h1
        className="text-icon opacity-50"
      >
        <Link
        href="/administration"
        >
          Panificadora
        </Link>
      </h1>

      <Link 
      href={"/requests"}
      >
        <Badge
          badgeContent={cart.length}
          color="primary"
        >
          <ShoppingCartIcon
            className="icon"
          />
        </Badge>
      </Link>
    </header>
  )
}
