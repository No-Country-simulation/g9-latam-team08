package com.financeai.dto;

public class RecommendationDTO {
    private Integer id;
    private String title;
    private String description;
    private String priority; // HIGH, MEDIUM, LOW

    public RecommendationDTO() {
    }

    public RecommendationDTO(Integer id, String title, String description, String priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}