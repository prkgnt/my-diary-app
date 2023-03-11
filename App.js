import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
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

  useEffect(() => {
    const startLoading = async () => {
      const connection = await Realm.open({
        path: "diaryDB",
        schema: [FeelingSchema],
      });
      setRealm(connection);
      setReady(true);
    };
    startLoading();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <DBContext.Provider value={realm} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
