package com.project.grey_cell.controllers;

import com.project.grey_cell.models.Message;
import com.project.grey_cell.models.SendMessageRequest;
import com.project.grey_cell.services.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages/")
@CrossOrigin(origins = "http://localhost:5173") // Allows React
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/discussion/{discussionId}")
    public List<Message> getMessages(@PathVariable Long discussionId){
        return messageService.getAllMessagesForChat(discussionId);
    }

    @PostMapping
    public List<Message> sendMessageToChat(@RequestBody SendMessageRequest request){
        return messageService.handleUserMessage(request);
    }

}
