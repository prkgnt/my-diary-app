import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { useDB } from "../context";
import { FlatList } from "react-native";

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

  useEffect(() => {
    const feeling = realm.objects("Feeling");
    setFeelings(feeling);

    //addListener 하면 해당 변수에 새로운 이벤트가 발생하면 호출됨
    feeling.addListener(() => {
      const feeling = realm.objects("Feeling");
      setFeelings(feeling);
    });

    //useEffect는 함수를 리턴할 수 있음
    return () => feeling.removeAllListeners();
  }, []);

  return (
    <View>
      <Title>My Journal</Title>
      <FlatList
        data={feelings.map((feeling) => feeling).flat()}
        contentContainerStyle={{ paddingBottom: 30 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={(feelings) => feelings._id + ""}
        renderItem={({ item }) => (
          <Record>
            <Emotion>{item.emotion}</Emotion>
            <Message>{item.message}</Message>
          </Record>
        )}
      />
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="add" size={35} color="white" />
      </Btn>
    </View>
  );
};

export default Home;
