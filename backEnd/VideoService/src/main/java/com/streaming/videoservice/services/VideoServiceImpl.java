package com.streaming.videoservice.services;

import com.streaming.videoservice.dto.VideoDTO;
import com.streaming.videoservice.entities.Category;
import com.streaming.videoservice.entities.Video;
import com.streaming.videoservice.mappers.VideoMapper;
import com.streaming.videoservice.repository.CategoryRepository;
import com.streaming.videoservice.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;
    private final VideoMapper videoMapper;
    private final CategoryRepository categoryRepository;



    @Override
    public List<VideoDTO> findAllVideos() {
        return videoRepository.findAll().stream()
                .map(videoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VideoDTO findVideoById(Long id) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found with id: " + id));
        return videoMapper.toDTO(video);
    }
    @Override
    public List<VideoDTO> findAllByIds(List<Long> ids) {

        return videoRepository.findAllById(ids).stream()
                .map(videoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VideoDTO updateVideo(Long id, VideoDTO videoDTO) {
        Video existingVideo = videoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Video not found"));

        existingVideo.setTitle(videoDTO.getTitle());
        existingVideo.setDescription(videoDTO.getDescription());
        existingVideo.setUrl(videoDTO.getUrl());


        return videoMapper.toDTO(videoRepository.save(existingVideo));
    }

    @Override
    public void removeVideo(Long id) {
        videoRepository.deleteById(id);
    }

    @Override
    public List<VideoDTO> findVideosByCategory(String categoryName) {

        Category category = categoryRepository.findByName(categoryName);

        if (category == null) return List.of();


        return videoRepository.findByCategoryId(category.getId()).stream()
                .map(videoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VideoDTO addVideo(VideoDTO videoDTO) {
        Video video = videoMapper.fromDTO(videoDTO);

        if (videoDTO.getCategoryName() != null) {
            Category category = categoryRepository.findByName(videoDTO.getCategoryName());
            if (category == null) {

                category = categoryRepository.save(Category.builder().name(videoDTO.getCategoryName()).build());
            }
            video.setCategory(category);
        }

        return videoMapper.toDTO(videoRepository.save(video));
    }
    @Override
    public boolean exists(Long id) {
        return videoRepository.existsById(id);
    }
}