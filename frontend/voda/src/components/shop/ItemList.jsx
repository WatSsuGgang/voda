import React, { useEffect, useState } from "react";
import styled from "styled-components";
import usePetShopStore from "../../store/petStore";

const ItemWrapper = styled.div({
  display: "grid",
  width: "85%",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "1rem",
});

const ItemNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 2rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: #fff7b2;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff7b2;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  height: 5rem;
  text-align: center;
`;

const ItemCostContainer = styled.div`
  display: flex;
  height: 2rem;
  justify-content: center;
  align-items: center;
`;

const food = [
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Candy.png",
    name: "사탕",
    own: true,
    applied: true,
    cost: 10,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Avocado.png",
    name: "아보카도",
    own: true,
    applied: false,
    cost: 20,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Pizza.png",
    name: "피자",
    own: false,
    applied: false,
    cost: 30,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Blueberries.png",
    name: "블루베리",
    own: false,
    applied: false,
    cost: 40,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cherries.png",
    name: "체리",
    own: false,
    applied: false,
    cost: 50,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Doughnut.png",
    name: "도넛",
    own: false,
    applied: false,
    cost: 60,
  },
];

const effect = [
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png",
    name: "별",
    own: false,
    applied: false,
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
    applied: false,
    cost: 90,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png",
    name: "불",
    own: false,
    applied: false,
    cost: 100,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Helicopter.png",
    name: "헬리콥터",
    own: false,
    applied: false,
    cost: 110,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
  },
  {
    url: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Maracas.png",
    name: "마르카스",
    own: false,
    applied: false,
    cost: 120,
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
        <div key={index} style={{ zIndex: -1 }}>
          <ItemNameContainer
            style={
              item.own
                ? { opacity: 1 }
                : {
                    opacity: 0.5,
                    filter: "grayscale(75%)",
                  }
            }
          >
            <p style={{ margin: "0", fontWeight: "bold" }}>{item.name}</p>
          </ItemNameContainer>
          <ItemContainer
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
          </ItemContainer>
          <ItemCostContainer>
            {item.own ? (
              <>
                {item.applied ? (
                  <>
                    <img
                      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Check%20Mark.png"
                      alt="Check Mark"
                      width="20rem"
                      height="20rem"
                    />
                  </>
                ) : (
                  <>
                    <p style={{ margin: "0", overflow: "hidden" }}>
                      {"보유중"}
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                <img
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Coin.png"
                  alt="Coin"
                  width="20rem"
                  height="20rem"
                />
                <p style={{ margin: "0", overflow: "hidden" }}>{item.cost}</p>
              </>
            )}
          </ItemCostContainer>
        </div>
      ))}
    </ItemWrapper>
  );
}
