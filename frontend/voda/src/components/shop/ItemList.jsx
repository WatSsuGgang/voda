import React from "react";
import styled from "styled-components";

const ItemWrapper = styled.div({
  display: "grid",
  width: "85%",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "1rem",
});

const ItemContainer = styled.div({
  backgroundColor: "#FFF7B2",
  height: "5rem",
  borderRadius: "1rem",
});

const Food = [
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Candy.png",
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Avocado.png",
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Pizza.png",
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Blueberries.png",
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cherries.png",
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
  },
];

const Effect = [
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png",
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Cloud%20with%20Rain.png",
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Hourglass%20Done.png",
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png",
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Helicopter.png",
  },
];

export default function ItemList() {
  return (
    <ItemWrapper>
      <ItemContainer />
      <ItemContainer />
    </ItemWrapper>
  );
}
