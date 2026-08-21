package com.g9_latam_team08.api_nuevo_analisis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestConfig {

    @Bean
    public RestClient restClient() {
        return RestClient.create();
    }
}