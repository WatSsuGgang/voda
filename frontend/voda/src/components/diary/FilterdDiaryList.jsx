import React from "react";

const FilterdDiaryList = () => {
  const diaries = [
    {
      id: 1,
      title: "힘들어서 한 잔 했습니다",
      date: "2020-01-01",
      emotion: "sad",
      picture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fhitejinro6%2F&psig=AOvVaw09u2uOOAHvWQz91mZPih3T&ust=1710390171460000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIC-34iy8IQDFQAAAAAdAAAAABAD",
    },
    {
      id: 2,
      title: "힘들어서 한 잔 했습니다",
      date: "2020-01-01",
      emotion: "sad",
      picture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fhitejinro6%2F&psig=AOvVaw09u2uOOAHvWQz91mZPih3T&ust=1710390171460000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIC-34iy8IQDFQAAAAAdAAAAABAD",
    },
    {
      id: 3,
      title: "힘들어서 한 잔 했습니다",
      date: "2020-01-01",
      emotion: "sad",
      picture:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fhitejinro6%2F&psig=AOvVaw09u2uOOAHvWQz91mZPih3T&ust=1710390171460000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIC-34iy8IQDFQAAAAAdAAAAABAD",
    },
  ];
  const diaryList = diaries.map((diary) => (
    <div key={diary.id}>
      <img src={diary.picture}></img>
      <div>{diary.date}</div>
      <div>{diary.emotion}</div>
      <div>{diary.title}</div>
    </div>
  ));
  return <div>{diaryList}</div>;
};

export default FilterdDiaryList;
