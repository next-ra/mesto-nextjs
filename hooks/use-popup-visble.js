import { useState, useEffect, useRef } from 'react';

export default function usePopupVisible(initialIsVisible) {
  const [showPopup, setShowPopup] = useState(initialIsVisible);
  const ref = useRef(null);

  const hideOnEscapeHandler = (event) => {
    if (event.key === 'Escape') {
      setShowPopup(false);
    }
  };

  const clickOutsideHandler = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowPopup(false);
      console.log('click outside');
    }
  };

  const toggleHandler = () => {
    setShowPopup((showPopup) => !showPopup);
  };

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler, true);
    document.addEventListener('keydown', hideOnEscapeHandler, true);
    return () => {
      document.removeEventListener('keydown', hideOnEscapeHandler, true);
      document.removeEventListener('click', clickOutsideHandler, true);
    };
  });

  return { ref, showPopup, setShowPopup, toggleHandler };
}
