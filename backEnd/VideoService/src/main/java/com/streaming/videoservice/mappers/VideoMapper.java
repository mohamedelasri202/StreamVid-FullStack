package com.streaming.videoservice.mappers;

import com.streaming.videoservice.entities.Video;
import com.streaming.videoservice.dto.VideoDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VideoMapper {

    @Mapping(source = "category.name", target = "categoryName")

    VideoDTO toDTO(Video video);

    @Mapping(source = "categoryName", target = "category.name")

    Video fromDTO(VideoDTO videoDTO);
}