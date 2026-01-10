package com.project.grey_cell.services;

import com.project.grey_cell.models.Discussion;
import com.project.grey_cell.models.Message;
import com.project.grey_cell.models.SendMessageRequest;
import com.project.grey_cell.repositories.MessageRepository;
import exceptions.RecallBayUnavailableException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final DiscussionService discussionService;
    private final LLMService llmService;
    private final RecallBayService recallBayService;

    public MessageService(MessageRepository messageRepository, DiscussionService discussionService, LLMService llmService, RecallBayService recallBayService) {
        this.messageRepository = messageRepository;
        this.discussionService = discussionService;
        this.llmService = llmService;
        this.recallBayService = recallBayService;
    }

    public List<Message> getAllMessagesForChat(Long id) {
        return messageRepository.findByDiscussionId(id);
    }

    private Message sendMessage(String content, String author, Long discussionId){
        Discussion discussion = discussionService.getDiscussionById(discussionId);
        Message message = new Message();
        message.setAuthor(author);
        message.setContent(content);
        message.setTimestamp(new Timestamp(System.currentTimeMillis()));
        message.setDiscussion(discussion);
        messageRepository.save(message);
        return message;
    }

    public List<Message> handleUserMessage(SendMessageRequest request) {
        Long id = request.getDiscussionId();
        String prompt = request.getPrompt();
        String provider = request.getProvider();

        String memory = "None";
        try {
            memory = recallBayService.searchSimilar(prompt, id, 3);
            recallBayService.storeEmbeddings(prompt, id);
        }
        catch (RecallBayUnavailableException ex) {
            System.out.println("Calling recall bay failed " + ex.getMessage());
        }
        List<Message> update = new ArrayList<>();
        Message userMessage = sendMessage(prompt, "user", id);
        Message reply = sendMessage(llmService.getResponse(provider, "Memory: " + memory + "\n\nPrompt:\n" + prompt), provider, id);
        update.add(reply);
        update.add(userMessage);
        return update;
    }


}
