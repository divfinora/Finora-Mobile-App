import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import RootNavigator from "./src/navigation/RootNavigator";
import { store } from "./src/redux/store";  
import toastConfig from "./src/components/common/Toast/toastConfig.js";
import { debugStorage } from "./src/utils/storageDebugger";
const App = () => {
//  useEffect(() => {

//    const unsubscribe = store.subscribe(() => {

//       debugStorage();

//    });

//    return unsubscribe;

// }, []);
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigator />
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;