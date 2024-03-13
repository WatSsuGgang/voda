import React from "react";
import useStore from "../../store/store";
const Pet = () => {
  const store = useStore();
  console.log("Pet", store.isLoggedIn);
  return <div>Pet</div>;
};

export default Pet;
