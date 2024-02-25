import { formatCurrency } from "../../utilites/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQunatity from "./UpdateItemQunatity";
import { useSelector  } from "react-redux";
import { getCurrentQuantityById } from "./../cart/cartSlice";

export default function CartItem({ item }) {
  const { name, quantity, totalPrice, pizzaId } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQunatity pizzaId={pizzaId} currentQunatity={currentQuantity}/>
        <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}
