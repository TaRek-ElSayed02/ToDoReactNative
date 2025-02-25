import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Router from "./Router"; 
import CompletedToDos from "./CompletedToDos";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeStack" component={Router} options={{ title: "Home", headerShown: false }} />
            <Tab.Screen name="CompletedToDos" component={CompletedToDos} options={{ title: "Completed Tasks" }} />
        </Tab.Navigator>
    );
};

export default TabNavigation;
