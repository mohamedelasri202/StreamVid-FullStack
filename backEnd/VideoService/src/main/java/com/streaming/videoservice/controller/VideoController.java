package com.streaming.videoservice.controller;

import com.streaming.videoservice.dto.VideoDTO;
import com.streaming.videoservice.services.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor

public class VideoController {

    private final VideoService videoService;



    @GetMapping("/all")
    public List<VideoDTO> getAll() {
        return videoService.findAllVideos();
    }

    @GetMapping("/find/{id}")
    public VideoDTO getById(@PathVariable Long id) {
        return videoService.findVideoById(id);
    }


    @GetMapping("/category/{name}")
    public List<VideoDTO> getByCategory(@PathVariable String name) {
        return videoService.findVideosByCategory(name);
    }

    @GetMapping("/exists/{id}")
    public boolean exists(@PathVariable Long id) {
        return videoService.exists(id);
    }


    @PostMapping("/add")
    public VideoDTO add(@RequestBody VideoDTO videoDTO) {
        return videoService.addVideo(videoDTO);
    }

    @PutMapping("/update/{id}")
    public VideoDTO update(@PathVariable Long id, @RequestBody VideoDTO videoDTO) {
        return videoService.updateVideo(id, videoDTO);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        videoService.removeVideo(id);
    }
    @PostMapping("/batch")
    public List<VideoDTO> getVideosByIds(@RequestBody List<Long> ids) {
        return videoService.findAllByIds(ids);
    }
}