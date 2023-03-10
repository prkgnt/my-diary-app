import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import DBContext from "../context";

const View = styled.View`
  background-color: ${colors.bgColor};
  flex: 1;
  padding: 0px 20px;
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 28px;
  margin-top: 50px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 10px;
`;
const TextInput = styled.TextInput`
  background-color: white;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 15px;
`;
const Btn = styled.TouchableOpacity`
  background-color: ${colors.btnColor};
  align-items: center;
  padding: 10px 20px;
  border-radius: 15px;
  margin-top: 30px;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 18px;
`;
const Emotions = styled.View`
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 10px;
`;
const Emoji = styled.TouchableOpacity`
  padding: 8px;
  background-color: white;
  border-width: ${(props) => (props.selected ? "1px" : "0px")};
  border-radius: 10px;
  overflow: hidden;
`;
const EmojiText = styled.Text`
  font-size: 24px;
`;

const emojis = ["😄", "😍", "😭", "😤", "🫠", "🥳", "🤧"];

const Write = ({ navigation: { goBack } }) => {
  const realm = useContext(DBContext);

  const [selectedEmotion, setEmotion] = useState(null);
  const [feelings, setFeelings] = useState("");
  const onChangeText = (text) => setFeelings(text);
  const onEmojiPress = (face) => setEmotion(face);
  const onSubmit = async () => {
    if (selectedEmotion == null || feelings == "") {
      return alert("Please complete form.");
    }

    //realm.write(()=>{realm.create("스키마 이름", {property})})
    realm.write(() => {
      const feeling = realm.create("Feeling", {
        _id: Date.now(),
        emotion: selectedEmotion,
        message: feelings,
      });
      console.log(feeling);
    });
    goBack();
  };
  return (
    <View>
      <Title>How do you feel today?</Title>
      <Emotions>
        {emojis.map((emoji, index) => (
          <Emoji
            selected={emoji == selectedEmotion}
            onPress={() => {
              onEmojiPress(emoji);
            }}
            key={index}
          >
            <EmojiText>{emoji}</EmojiText>
          </Emoji>
        ))}
      </Emotions>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        value={feelings}
        placeholder="Type about your feeling,,"
      ></TextInput>

      <Btn onPress={onSubmit}>
        <BtnText>Save</BtnText>
      </Btn>
    </View>
  );
};

export default Write;
