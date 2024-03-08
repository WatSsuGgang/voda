import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #fffae1;
  height: 50px;
  width: 100%;
`;
const NavBar = (props) => {
  return (
    <div>
      <Nav>
        <div>하이</div>
      </Nav>
    </div>
  );
};

export default NavBar;
