import { useEffect, useState } from "react";

export default function UseLocalStorageState(initialState, key) {
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(watched));
    },
    [watched, key]
  );
  return [watched, setWatched];
}
