import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";
import { observeAuthState } from "./redux/thunk/userAuth";
function App() {
  
  
  useEffect(() =>{
    const unsubscribe = store.dispatch(observeAuthState());

    return () =>{
      unsubscribe()
    }
  },[])

  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </div>
  );
}

export default App;
