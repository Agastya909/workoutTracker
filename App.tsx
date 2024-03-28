import React from "react";
import RootStackNavigator from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store/index";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RootStackNavigator />
    </Provider>
  );
};

export default App;
