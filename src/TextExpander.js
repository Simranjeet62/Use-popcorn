import { useState } from "react";

export default function TextExpander({ textLength, children }) {
  const [show, setShow] = useState(false);

  function handleClick() {
    setShow(!show);
  }
  return (
    <div>
      <p>
        {show
          ? children
          : children.split(" ").slice(0, textLength).join(" ") + "..."}
        <button className={show ? "btn more" : "btn"} onClick={handleClick}>
          {show ? "Show Less" : " Show More"}
        </button>
      </p>
    </div>
  );
}
