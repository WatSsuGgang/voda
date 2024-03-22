import React from "react";
import styled from "styled-components";
import useUserStore from "../../store/userStore";

const Title = styled.div`
  font-weight: bold;
  font-size: 2rem;
`;
export default function UserReport() {
  return <Title>유저 리포트</Title>;
}
