import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefaut();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search order #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm placeholder:text-stone-400 sm:focus:w-72 sm:w-64 transiton-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 "
        />
      </form>
    </div>
  );
}
