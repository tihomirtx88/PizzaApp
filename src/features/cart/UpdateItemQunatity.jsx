import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

export default function UpdateItemQunatity({ pizzaId, currentQunatity }) {
    const dispatch = useDispatch();
  return (
    <div className="flex gap-1 items-center gap-2 md:gap-3">
      <Button type="round" onClick={()=> dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
      <span className="text-sm font-medium">{currentQunatity}</span>
      <Button type="round" onClick={()=> dispatch(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  );
}
