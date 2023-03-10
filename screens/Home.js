import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { useDB } from "../context";
import { FlatList, LayoutAnimation, TouchableOpacity } from "react-native";

const View = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding-top: 100px;
  padding-left: 30px;
  padding-right: 30px;
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 36px;
  margin-bottom: 100px;
  margin-left: 20px;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  right: 50px;
  bottom: 50px;
  background-color: ${colors.btnColor};
  width: 70px;
  height: 70px;
  border-radius: 35px;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
`;

const Record = styled.View`
  background-color: ${colors.cardColor};
  align-items: center;
  flex-direction: row;
  padding: 10px 20px;
  border-radius: 10px;
`;

const Emotion = styled.Text`
  font-size: 24px;
  margin-right: 15px;
`;

const Message = styled.Text`
  font-size: 18px;
`;
const Separator = styled.View`
  height: 10px;
`;

const Home = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState([]);

  const onPress = (id) => {
    realm.write(() => {
      const feeling = realm.objectForPrimaryKey("Feeling", id);
      realm.delete(feeling);
    });
  };

  useEffect(() => {
    const feeling = realm.objects("Feeling");

    //addListener 하면 해당 변수에 새로운 이벤트가 발생하면 호출됨
    feeling.addListener((feelingValue, changes) => {
      //스테이트 변화가 있으면 애니메이션을 줌
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      //true면 내림차순
      //id는 date라서 최근일수록 큰 수임
      setFeelings(feelingValue.sorted("_id", true));
    });

    //useEffect는 함수를 리턴할 수 있음
    return () => feeling.removeAllListeners();
  }, []);

  return (
    <View>
      <Title>My Journal</Title>
      <FlatList
        data={feelings.map((feeling) => feeling).flat()}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 30 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={(feelings) => feelings._id + ""}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item._id)}>
            <Record>
              <Emotion>{item.emotion}</Emotion>
              <Message>{item.message}</Message>
            </Record>
          </TouchableOpacity>
        )}
      />
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="add" size={35} color="white" />
      </Btn>
    </View>
  );
};

export default Home;
