package com.example.socialapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import net.bytebuddy.implementation.bind.annotation.Empty;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "files")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @JsonIgnore
    @Lob
    private byte[] fileContent;

    private int size;

    private String name;

    private String type;

    @Nullable
    private long lastModified;

    @ManyToOne
    @JoinColumn(name = "message")
    @JsonIgnore
    private Message message;

    public File() {
    }

    public File(byte[] fileContent, int size, String name, Message message, String type) {
        this(fileContent, size, name, type);
        this.message = message;
    }

    public File(byte[] fileContent, int size, String name, String type) {
        this.fileContent = fileContent;
        this.size = size;
        this.name = name;
        this.type = type;
        this.lastModified = Instant.now().toEpochMilli();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public byte[] getFileContent() {
        return fileContent;
    }

    public void setFileContent(byte[] serialFile) {
        this.fileContent = serialFile;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWebkitRelativePath(){
        return "";
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getLastModified() {
        return lastModified;
    }

    public void setLastModified(long lastModified) {
        this.lastModified = lastModified;
    }

    public LocalDateTime getLastModifiedDate(){
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(lastModified), ZoneId.systemDefault());
    }
}

