package com.financeai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class CreateTransactionDTO {
    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Amount is required")
    private Double amount;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Transaction date is required")
    private LocalDateTime transactionDate;

    @NotBlank(message = "Type is required")
    private String type; // INCOME or EXPENSE

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public LocalDateTime getTransactionDate() { return transactionDate; }
    public void setTransactionDate(LocalDateTime transactionDate) { this.transactionDate = transactionDate; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}