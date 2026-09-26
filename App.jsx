import React from "react";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import RootNavigator from "./src/navigation/RootNavigator";
import { store } from "./src/redux/store";
import toastConfig from "./src/components/common/Toast/toastConfig.js";

const App = () => {
  return (
    <Provider store={store}>

      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >

        <SafeAreaProvider>

          <BottomSheetModalProvider>

            <RootNavigator />

          </BottomSheetModalProvider>

          <Toast
            config={toastConfig}
          />

        </SafeAreaProvider>

      </GestureHandlerRootView>

    </Provider>
  );
};

export default App;