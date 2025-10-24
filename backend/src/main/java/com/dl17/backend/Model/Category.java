package com.dl17.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "categories")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Category {

    @Id
    private String categoryId;

    private String userId;
    private String name;
}
