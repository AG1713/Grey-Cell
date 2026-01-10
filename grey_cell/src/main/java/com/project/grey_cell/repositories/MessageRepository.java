package com.project.grey_cell.repositories;

import com.project.grey_cell.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("""
            SELECT m FROM messages m
            WHERE m.discussion.id=:discussionId
            ORDER BY m.timestamp DESC
            """)
    public List<Message> findByDiscussionId(Long discussionId);

}
