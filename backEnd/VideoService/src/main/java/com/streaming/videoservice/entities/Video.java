package com.streaming.videoservice.entities;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 1000)
    private String description;
    private String url;
    private String thumbnailUrl;
    private String duration;
    private Integer releaseYear;
    private Double rating;
    private String director;
    @Column(name = "video_cast")
    private String cast;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}