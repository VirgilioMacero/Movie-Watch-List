import React, { useRef, useEffect } from "react";

const ClickOutsideComponent = ({ onOutsideClick, children }) => {
  const divRef = useRef(null);

  useEffect(() => {
    // Función para manejar el clic fuera del div
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    // Añadir el event listener al montar el componente
    document.addEventListener("click", handleClickOutside);

    // Eliminar el event listener al desmontar el componente
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={divRef}>{children}</div>;
};

export default ClickOutsideComponent;
