package com.project.grey_cell.services;

import exceptions.RecallBayUnavailableException;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.nio.channels.ClosedChannelException;
import java.util.HashMap;
import java.util.Map;

@Service
public class RecallBayService {
    RestClient restClient;

    RecallBayService(RestClient restClient) {
        this.restClient = restClient;
    }

    public void storeEmbeddings(String text, Long discussionId) {
        Map<String, Object> body = Map.of(
                "discussion_id",discussionId,
                "texts", new String[]{text}
        );

        restClient.post()
                .uri("/store")
                .body(body)
                .retrieve()
                .toBodilessEntity();
    }

    public String searchSimilar(String text, Long discussionId, Integer topK) throws RecallBayUnavailableException {
        Map<String, Object> body = Map.of(
                "discussion_id", discussionId,
                "query", text,
                "top_k", topK
        );

        StoreResponse response;
        try {
            response = restClient.post()
                    .uri("/search")
                    .body(body)
                    .retrieve()
                    .body(StoreResponse.class);
        }
        catch (RestClientException ex) {
            throw new RecallBayUnavailableException("Recall bay is not accessible", ex);
        }
        if (response == null || response.result == null) {
            throw new RecallBayUnavailableException(
                    "Recall bay returned empty or invalid response"
            );
        }

        return response.result;
    }

}

@Data
class StoreResponse {
    String result;
}
