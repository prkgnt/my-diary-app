import { NavigationContainer } from "@react-navigation/native";
import React, { createContext, useContext, useEffect, useState } from "react";
import Navigator from "./navigator";
import Realm from "realm";
import * as SplashScreen from "expo-splash-screen";
import DBContext from "./context";

//저장할 데이터 타입 설정
const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
  primaryKey: "_id",
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);

  const startLoading = async () => {
    const connection = await Realm.open({
      path: "diaryDB",
      schema: [FeelingSchema],
    });
    setRealm(connection);
  };

  useEffect(() => {
    startLoading();
    setReady(true);
  }, []);

  if (ready) {
    SplashScreen.hideAsync();
  }

  return (
    <DBContext.Provider value={realm}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
