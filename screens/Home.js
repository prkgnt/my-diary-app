import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";

const View = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding-top: 100px;
  padding-left: 50px;
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 36px;
  margin-bottom: 100px;
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
const BtnText = styled.Text``;

const Home = ({ navigation: { navigate } }) => (
  <View>
    <Title>My Journal</Title>
    <Btn onPress={() => navigate("Write")}>
      <Ionicons name="add" size={35} color="white" />
    </Btn>
  </View>
);

export default Home;
