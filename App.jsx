import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigator from "./src/navigation/RootNavigator";
import { store } from "./src/redux/store";
import toastConfig from "./src/components/common/Toast/toastConfig.js";
import { getTokens } from "./src/utils/keychain.js";
// import { debugStorage } from "./src/utils/storageDebugger";

const App = () => {
   useEffect  ( async () => {

  //  const unsubscribe = store.subscribe(() => {

  //     debugStorage();

  //  });

  //  return unsubscribe;
  const tokens = await getTokens();
   console.log(tokens ,"token")
}, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <RootNavigator />
          <Toast config={toastConfig} />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;