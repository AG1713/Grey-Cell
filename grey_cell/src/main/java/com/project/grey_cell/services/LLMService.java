package com.project.grey_cell.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.grey_cell.config.LLMConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class LLMService {

    private final LLMConfig llmConfig;
    private final RestTemplate restTemplate;

    public LLMService(LLMConfig llmConfig, RestTemplate restTemplate){
        this.llmConfig = llmConfig;
        this.restTemplate = restTemplate;
    }

    public String getResponse(String providerName, String prompt){

        LLMConfig.LLMProvider provider = llmConfig.getProvider(providerName);

        if (provider == null) {
            return "Unsupported provider: " + providerName;
        }

        String apiKey = provider.getApiKey();
        String apiUrl = provider.getApiUrl();

        HttpHeaders headers = new HttpHeaders();
        Map<String, Object> body;

        switch (providerName.toLowerCase()){
            case "gemini":{

                apiUrl += "?key=" + apiKey;
                body = Map.of(
                        "contents", List.of(
                                Map.of(
                                        "parts", List.of(
                                                Map.of("text", prompt)
                                        )
                                )
                        )
                );
                break;
            }
            default:{
                return "Provider logic not implemented";
            }
        }

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);
            return extractText(providerName, response.getBody());
        }
        catch (Exception e) {
            e.printStackTrace();
            return "Error calling " + providerName + ": " + e.getMessage();
        }

    }


    private String extractText(String providerName, String responseJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseJson);

            switch (providerName.toLowerCase()) {
                case "gemini":
                    return root.path("candidates").get(0)
                            .path("content").path("parts").get(0)
                            .path("text").asText();

                case "openai":
                    return root.path("choices").get(0)
                            .path("message").path("content").asText();

                default:
                    return "✅ Response received but parser not implemented.";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "⚠️ Error parsing response.";
        }
    }



}
