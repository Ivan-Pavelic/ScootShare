package com.scootshare.base.services;

import com.scootshare.base.entities.FileDB;
import com.scootshare.base.repositories.FileDBRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class FileDBService {

    private final FileDBRepository fileRepository;

    @Autowired
    public FileDBService(FileDBRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public FileDB store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileDB fileDB = new FileDB(fileName, file.getContentType(), file.getBytes());

        return fileRepository.save(fileDB);
    }

    public FileDB getFile(String id) {
        Optional<FileDB> file = fileRepository.findById(id);
        if(file.isPresent()) {
            return file.get();
        }
        return null;
    }
}
