package com.project.grey_cell.controllers;

import com.project.grey_cell.models.Discussion;
import com.project.grey_cell.models.Message;
import com.project.grey_cell.models.SendMessageRequest;
import com.project.grey_cell.services.*;
import exceptions.RecallBayUnavailableException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grey_cell/")
@CrossOrigin(origins = "http://localhost:5173") // Allows React
public class FirstController {
    private final DiscussionService discussionService;
    private final MessageService messageService;

    public FirstController(DiscussionService discussionService, MessageService messageService){
        this.discussionService = discussionService;
        this.messageService = messageService;
    }


    @GetMapping("/create_discussion/{name}")
    public String test(@PathVariable String name){
        discussionService.createDiscussion(name);

        return "test page";
    }

    @GetMapping("/messages/{id}")
    public List<Message> getMessages(@PathVariable Long id){
        return messageService.getAllMessagesForChat(id);
    }

    @PostMapping("/send_message")
    public void sendMessageToChat(@RequestBody SendMessageRequest request){
        messageService.handleUserMessage(request);
    }

    @GetMapping("/discussions")
    public List<Discussion> getDiscussions(){
        return discussionService.getAllDiscussions();
    }


}
