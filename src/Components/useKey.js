import { useEffect } from "react";

export default function useKey(key, handleCloseMovie) {
  useEffect(
    function () {
      function closeEsc(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          handleCloseMovie();
        }
      }
      document.addEventListener("keydown", closeEsc);
      return function () {
        document.removeEventListener("keydown", closeEsc);
      };
    },
    [handleCloseMovie, key]
  );
}
