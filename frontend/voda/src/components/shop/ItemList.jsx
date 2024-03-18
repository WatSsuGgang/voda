import React, { useEffect, useState } from "react";
import styled from "styled-components";
import usePetShopStore from "../../store/petStore";

const ItemWrapper = styled.div({
  display: "grid",
  width: "85%",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "1rem",
});

const ItemContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFF7B2",
  height: "7rem",
  borderRadius: "1rem",
  textAlign: "center",
  gap: "0.25rem",
});

const food = [
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Candy.png",
    name: "사탕",
    own: true,
    cost: 10,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Avocado.png",
    name: "아보카도",
    own: false,
    cost: 20,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Pizza.png",
    name: "피자",
    own: false,
    cost: 30,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Blueberries.png",
    name: "블루베리",
    own: false,
    cost: 40,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cherries.png",
    name: "체리",
    own: false,
    cost: 50,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    cost: 60,
  },
];

const effect = [
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png",
    name: "별",
    own: false,
    cost: 70,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Cloud%20with%20Rain.png",
    name: "비구름",
    own: false,
    cost: 80,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Hourglass%20Done.png",
    name: "모래시계",
    own: false,
    cost: 90,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png",
    name: "불",
    own: false,
    cost: 100,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Helicopter.png",
    name: "헬리콥터",
    own: false,
    cost: 110,
  },
];

const Items = {
  food,
  effect,
};

export default function ItemList() {
  const { currentCategory } = usePetShopStore();
  const [items, setItems] = useState(Items.food);
  useEffect(() => {
    setItems(Items[currentCategory]);
  }, [currentCategory]);

  return (
    <ItemWrapper>
      {items.map((item, index) => (
        <ItemContainer
          key={index}
          style={
            item.own
              ? { opacity: 1 }
              : {
                  opacity: 0.5,
                  filter: "grayscale(75%)",
                }
          }
        >
          <img
            src={item.url}
            style={{
              width: "2.5rem",
              height: "2.5rem",
            }}
          />
          <p style={{ margin: "0", overflow: "hidden" }}>{item.name}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png"
              alt="Coin"
              width="20rem"
              height="20rem"
            />
            <p style={{ margin: "0", overflow: "hidden" }}>{item.cost}</p>
          </div>
        </ItemContainer>
      ))}
    </ItemWrapper>
  );
}
