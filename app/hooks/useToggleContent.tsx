import { useEffect, useState } from "react";

export function useToggleContent(isExpanded: boolean) {
  const [showContent, setShowContent] = useState(isExpanded);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isExpanded) {
      setShowContent(true);
    } else {
      timeout = setTimeout(() => {
        setShowContent(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [isExpanded]);

  return showContent;
}
