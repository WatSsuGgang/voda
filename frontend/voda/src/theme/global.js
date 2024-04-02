import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.backgroundColor};
        color : ${({ theme }) => theme.textColor}
    }
`;
