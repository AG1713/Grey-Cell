package com.project.grey_cell.controllers;

import com.project.grey_cell.models.Discussion;
import com.project.grey_cell.services.DiscussionService;
import com.project.grey_cell.services.MessageService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/frontend")
public class FrontendController {
    private final DiscussionService discussionService;
    private final MessageService messageService;

    public FrontendController(DiscussionService discussionService, MessageService messageService) {
        this.discussionService = discussionService;
        this.messageService = messageService;
    }

    // Default view: first discussion or empty
    @GetMapping({"/", "/chat"})
    public String defaultChat(Model model) {
        List<Discussion> discussions = discussionService.getAllDiscussions();
        Long firstId = discussions.isEmpty() ? null : discussions.get(0).getId();
        model.addAttribute("discussions", discussions);
        model.addAttribute("currentDiscussionId", firstId);
        model.addAttribute("messages", firstId != null ? messageService.getAllMessagesForChat(firstId) : List.of());
        return "chat";
    }

    // View for a specific discussion
    @GetMapping("/chat/{discussionId}")
    public String chatPage(@PathVariable Long discussionId, Model model) {
        List<Discussion> discussions = discussionService.getAllDiscussions();
        model.addAttribute("discussions", discussions);
        model.addAttribute("currentDiscussionId", discussionId);
        model.addAttribute("messages", messageService.getAllMessagesForChat(discussionId));
        return "chat";
    }
}