import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

export default function Header(){
    return(
        <header>
            <Link to='/'>
                Fast React Pizza Company
            </Link>
            <SearchOrder/>
            <p>by Tihomir</p>
        </header>
    );
}