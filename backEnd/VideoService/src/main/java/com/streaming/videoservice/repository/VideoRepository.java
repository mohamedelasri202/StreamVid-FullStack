package com.streaming.videoservice.repository;

import com.streaming.videoservice.entities.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video,Long> {
    List<Video> findByCategoryId(Long categoryId);
    boolean existsById(Long id);
}
