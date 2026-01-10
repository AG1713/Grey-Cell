package com.project.grey_cell.controllers;

import com.project.grey_cell.models.Discussion;
import com.project.grey_cell.models.DiscussionRequest;
import com.project.grey_cell.services.DiscussionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discussions/")
@CrossOrigin(origins = "http://localhost:5173") // Allows React
public class DiscussionController {
    private final DiscussionService discussionService;

    public DiscussionController(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @PostMapping
    public void createDiscussion(@RequestBody DiscussionRequest request){
        discussionService.createDiscussion(request.getDiscussionName());
    }

    @GetMapping
    public List<Discussion> getDiscussions(){
        return discussionService.getAllDiscussions();
    }

}
