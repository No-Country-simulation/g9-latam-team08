package com.financeai.dto;

import java.time.LocalDateTime;

public class TransactionDTO {
    private Long id;
    private String description;
    private Double amount;
    private String category;
    private Integer confidence;
    private LocalDateTime transactionDate;
    private String type; // INCOME, EXPENSE

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Integer getConfidence() { return confidence; }
    public void setConfidence(Integer confidence) { this.confidence = confidence; }
    public LocalDateTime getTransactionDate() { return transactionDate; }
    public void setTransactionDate(LocalDateTime transactionDate) { this.transactionDate = transactionDate; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
