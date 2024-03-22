package io.watssuggang.voda.diary.config;

import java.net.http.HttpClient;
import java.net.http.HttpClient.Redirect;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ClientHttpConnector;
import org.springframework.http.client.reactive.JdkClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
 
@Configuration
public class WebClientConfig {

    @Value("${Claude.x-api-key}")
    private String xApiKey;
    @Value("${Claude.anthropic-version}")
    private String anthropicVersion;
    @Value("${Clova.X-NCP-APIGW-API-KEY-ID}")
    private String apiKeyId;
    @Value("${Clova.X-NCP-APIGW-API-KEY}")
    private String apiKey;
    @Value("${Karlo.client-id}")
    private String clientId;

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

    private HttpHeaders clovaHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-NCP-APIGW-API-KEY-ID", apiKeyId);
        headers.add("X-NCP-APIGW-API-KEY", apiKey);
        return headers;
    }

    private HttpHeaders karloHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.AUTHORIZATION, clientId);
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    @Bean("chatClient")
    public WebClient chatClient() {
        return WebClient.builder()
            .clientConnector(connector)
            .baseUrl("https://api.anthropic.com/v1/messages")
            .defaultHeaders(httpHeaders -> httpHeaders.addAll(chatHeaders()))
            .build();
    }

    @Bean("sttClient")
    public WebClient sttClient() {
        return WebClient.builder()
            .clientConnector(connector)
            .baseUrl("https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor")
            .defaultHeaders(httpHeaders -> httpHeaders.addAll(clovaHeaders()))
            .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/octet-stream")
            .build();
    }

    @Bean("ttsClient")
    public WebClient ttsClient() {
        return WebClient.builder()
            .clientConnector(connector)
            .baseUrl("https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts")
            .defaultHeaders(httpHeaders -> httpHeaders.addAll(clovaHeaders()))
            .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded")
            .build();
    }

    @Bean("karloClient")
    public WebClient karloClient() {
        return WebClient.builder()
            .clientConnector(connector)
            .baseUrl("https://api.kakaobrain.com/v2/inference/karlo/t2i")
            .defaultHeaders(httpHeaders -> httpHeaders.addAll(karloHeader()))
            .build();
    }

}
