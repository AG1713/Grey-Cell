package com.project.grey_cell.config;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@ConfigurationProperties(prefix = "llm")
@Data
public class LLMConfig {

    private Map<String, LLMProvider> providers = new HashMap<>();

    public LLMProvider getProvider(String name) {
        return providers.get(name.toLowerCase());
    }

    @Data
    public static class LLMProvider {
        private String apiKey;
        private String apiUrl;
    }

}
