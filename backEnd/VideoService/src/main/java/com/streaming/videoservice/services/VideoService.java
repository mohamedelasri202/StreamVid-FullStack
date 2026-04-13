package com.streaming.videoservice.services;

import com.streaming.videoservice.dto.VideoDTO;
import java.util.List;

public interface VideoService {
    VideoDTO addVideo(VideoDTO videoDTO);
    List<VideoDTO> findAllVideos();
    VideoDTO findVideoById(Long id);
    VideoDTO updateVideo(Long id, VideoDTO videoDTO);
    void removeVideo(Long id);
    List<VideoDTO> findVideosByCategory(String categoryName);
    boolean exists(Long id);
    List<VideoDTO> findAllByIds(List<Long> ids);
}