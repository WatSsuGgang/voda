import React from "react";
import styled from "styled-components";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { usePersistStore } from "../../store/store";

const ScrollPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  border-radius: 20px;
  margin-top: 3.5rem;
`;

export default function ScrollPrompt() {
  const persistStore = usePersistStore();
  return (
    <ScrollPromptContainer>
      <KeyboardDoubleArrowDownIcon style={{ fill: "currentColor" }} />
    </ScrollPromptContainer>
  );
}
