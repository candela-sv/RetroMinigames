import React, { createContext, useState, useContext } from 'react';

// Crea el contexto
const UserContext = createContext();

// Proveedor del contexto
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // user será `null` si no hay sesión activa

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para usar el contexto
export function useUser() {
  return useContext(UserContext);
}
