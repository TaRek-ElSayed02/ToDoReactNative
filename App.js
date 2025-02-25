import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./src/redux/store";
import TabNavigation from "./src/TabNavigation";
import { setTasks } from "./src/redux/taskSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

const LoadData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("@tasks");
        dispatch(setTasks(storedTasks ? JSON.parse(storedTasks) : []));
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    fetchTasks();
  }, [dispatch]);

  return null;
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <LoadData />
        <TabNavigation />
      </NavigationContainer>
    </Provider>
  );
}
