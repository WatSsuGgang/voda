package io.watssuggang.voda.member.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlConfig;
import org.springframework.test.context.jdbc.SqlConfig.TransactionMode;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
@TestPropertySource(locations = "classpath:application-test.yml")
class MyPageControllerTest {

    @Autowired
    private WebApplicationContext wc;

    private MockMvc mockMvc;

    @BeforeEach
    public void initMock() {
        mockMvc = MockMvcBuilders.webAppContextSetup(wc).build();
    }

    @Test
    @Sql(scripts = {
        "/test_data.sql"}, config = @SqlConfig(encoding = "utf-8", transactionMode = TransactionMode.ISOLATED))
    @DisplayName("감정 리포트 가져오기 성공")
    void getEmotionReport() throws Exception {
        mockMvc.perform(get("/user/report")).andExpect(status().isOk());

    }
}