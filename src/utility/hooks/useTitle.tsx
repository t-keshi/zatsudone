import { useEffect, useRef } from "react";

export const useTitle = (title: string): void => {
  const prevTitleRef = useRef(document.title);

  document.title = title;
  useEffect(() => {
    document.title = prevTitleRef.current;
  }, []);
};
