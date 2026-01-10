package com.project.grey_cell.repositories;

import com.project.grey_cell.models.Discussion;
import com.project.grey_cell.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {

}
