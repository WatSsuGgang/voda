import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Box = styled.div`
  margin: 0 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditDiary = styled(Typography)({
  color: "gray",
});

const editAllow = () => {
  return (
    <Box>
      <EditDiary>일기 수정</EditDiary>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Off</Typography>
        <Switch defaultChecked />
        <Typography>On</Typography>
      </Stack>
    </Box>
  );
};

export default editAllow;
