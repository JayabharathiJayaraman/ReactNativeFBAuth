import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { AuthContext, AuthContextProvider } from "./src/components/contexts/AuthContext";
import { StackScreens } from "./src/components/helpers/types";
import HomeScreen from "./src/components/screens/HomeScreen";
import LoginScreen from "./src/components/screens/LoginScreen";
import RegisterScreen from "./src/components/screens/RegisterScreen";

export default function App() {
  return (
    <AuthContextProvider>
      <MainNavigator />
    </AuthContextProvider>
  );
}

export const MainNavigator = () => {
  const StackNavigator = createNativeStackNavigator<StackScreens>();
  const authContext = useContext(AuthContext);
  return (
    <NavigationContainer>
      <StackNavigator.Navigator>
        {!authContext?.isUserSignedIn && (
          <>
            <StackNavigator.Screen name="LoginScreen" component={LoginScreen} />
            <StackNavigator.Screen
              name="RegisterScreen"
              component={RegisterScreen}
            />
          </>
        )}
        {authContext?.isUserSignedIn && (
          <StackNavigator.Screen name="HomeScreen" component={HomeScreen} />
        )}
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};