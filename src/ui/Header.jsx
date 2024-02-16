import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header>
            <Link to='/'>
                Fast React Pizza Company
            </Link>
            <p>by Tihomir</p>
        </header>
    );
}