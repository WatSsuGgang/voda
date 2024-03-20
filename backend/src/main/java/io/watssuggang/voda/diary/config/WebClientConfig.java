package io.watssuggang.voda.diary.config;

import java.net.http.*;
import java.net.http.HttpClient.*;
import java.time.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.*;
import org.springframework.http.client.reactive.*;
import org.springframework.web.reactive.function.client.*;

@Configuration
public class WebClientConfig {

    @Value("${Claude.x-api-key}")
    private String xApiKey;
    @Value("${Claude.anthropic-version}")
    private String anthropicVersion;

    private static final HttpClient httpClient = HttpClient.newBuilder()
        .followRedirects(Redirect.NORMAL)
        .connectTimeout(Duration.ofSeconds(20))
        .build();

    private static final ClientHttpConnector connector = new JdkClientHttpConnector(httpClient);

    private HttpHeaders chatHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("x-api-key", xApiKey);
        headers.add("anthropic-version", anthropicVersion);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    @Bean
    public WebClient chatClient() {
        return WebClient.builder()
            .clientConnector(connector)
            .baseUrl("https://api.anthropic.com/v1/messages")
            .defaultHeaders(httpHeaders -> httpHeaders.addAll(chatHeaders()))
            .build();
    }

}
