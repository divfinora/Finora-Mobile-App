import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const BottomTabHeightContext = createContext({
  height: 0,
  setHeight: () => {},
});

export const BottomTabHeightProvider = ({ children }) => {
  const [height, setHeight] = useState(0);

  const value = useMemo(
    () => ({
      height,
      setHeight,
    }),
    [height],
  );

  return (
    <BottomTabHeightContext.Provider value={value}>
      {children}
    </BottomTabHeightContext.Provider>
  );
};

export const useBottomTabHeight = () => {
  return useContext(BottomTabHeightContext);
};