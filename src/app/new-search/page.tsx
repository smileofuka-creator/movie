"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("name");
  const [value, setValue] = useState();

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleClick = () => {
    router.push(`/new-search?name=${value}`);
  };
  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button className="border p-3 bg-gray-500" onClick={handleClick}>
        Search
      </button>
      Search: {search}
    </div>
  );
};

export default page;
