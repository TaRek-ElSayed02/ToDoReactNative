import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./Router"; 
// import DetailsScreen from "./DetailsScreen"; 
import CompletedToDos from "./CompletedToDos";
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Router" component={Router} options={{ title: "Home" , headerShown: false }} />
                <Tab.Screen name="CompletedToDos" component={CompletedToDos} options={{ title: "CompletedToDos"  }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default TabNavigation;
