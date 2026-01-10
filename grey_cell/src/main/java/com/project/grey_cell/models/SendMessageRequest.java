package com.project.grey_cell.models;

import lombok.Data;

@Data
public class SendMessageRequest {
    Long discussionId;
    String prompt;
    String provider;

    public SendMessageRequest(Long discussionId, String prompt, String provider) {
        this.discussionId = discussionId;
        this.prompt = prompt;
        this.provider = provider;
    }
}
