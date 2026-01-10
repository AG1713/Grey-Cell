package com.project.grey_cell.config;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

@SpringBootApplication
@EnableTransactionManagement
public class Config {
    @Value("${apis.recall-bay}")
    String BASE_URL;

    @Bean
    public RestClient restClient(){
        return RestClient.create(BASE_URL);
    }

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

}
