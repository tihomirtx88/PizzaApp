import { Link, useNavigate } from "react-router-dom";

export default function LinkButton({ children, to }) {
    const navigate = useNavigate();
    const classname = 'text-sm text-blue-500 hover:text-blue-600 hover:underlin';
    if(to === "-1") return  <button className={classname} onClick={() => navigate(-1)}>{children}</button>
  return (
    <div>
      <Link
        className={classname}
        to={to}
      >
        {children}
      </Link>
    </div>
  );
}
