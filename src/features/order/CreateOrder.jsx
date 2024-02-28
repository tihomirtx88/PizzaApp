import { Form,
  redirect,
  //  redirect, 
   useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "./../../services/apiRestaurant";
import Button from "../../ui/Button";
import { formatCurrency } from "./../../utilites/helpers";
import { useDispatch, useSelector } from "react-redux";
import { 
  clearCart,
   getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "./../cart/EmptyCart";
import store from "./../../store";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
import {v4 as uuidv4} from 'uuid';


// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\d{10}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

export default function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const formErros = useActionData();
  // const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {formErros?.phone && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErros.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (<span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px] z-50">
            <Button disabled={isLoadingAddress || isSubmitting} type="small" onClick={(e) =>{
               e.preventDefault();
               dispatch(fetchAddress());
            }}>
              Get Position
            </Button>
          </span>)}

        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />

          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude},${position.longitude}` : ''}/>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order..."
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const uniqueId = uuidv4();

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    id: uniqueId,
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  console.log(order);

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We miight need it to do contact you";

  // if (Object.keys(errors.length > 0)) return errors;

 
  // If everthing is ok, create new order and redirect
  const newOrder = await createOrder(order);
  // console.log(newOrder);



  //if case i need dsipatch action but is in regular function not Component
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
