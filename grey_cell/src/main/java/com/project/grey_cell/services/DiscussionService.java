package com.project.grey_cell.services;

import com.project.grey_cell.models.Discussion;
import com.project.grey_cell.repositories.DiscussionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscussionService {
    private final DiscussionRepository discussionRepository;

    public DiscussionService(DiscussionRepository discussionRepository){
        this.discussionRepository = discussionRepository;
    }

    public void createDiscussion(String name){
        Discussion discussion = new Discussion();
        discussion.setName(name);
        discussionRepository.save(discussion);
    }

    public Discussion getDiscussionById(Long id){
        Discussion discussion = discussionRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid task Id"));
        return discussion;
    }

    public List<Discussion> getAllDiscussions(){
        // TODO: Add a user later here when adding authentication
        return discussionRepository.findAll();
    }

}
