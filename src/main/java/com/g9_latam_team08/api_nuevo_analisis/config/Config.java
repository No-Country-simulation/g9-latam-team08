package com.g9_latam_team08.api_nuevo_analisis.config;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

import java.time.Duration;

@Configuration
public class Config {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Bean
    public RestClient restClient() {
        return RestClient.create();
    }

    @Bean
    public ChatLanguageModel geminiChatModel() {
        return GoogleAiGeminiChatModel.builder()
                .apiKey(apiKey)
                .temperature(0.7)
                .modelName("gemini-3.5-flash-lite")
                .timeout(Duration.ofMinutes(3))
                .logRequestsAndResponses(true)
                .build();
    }
}