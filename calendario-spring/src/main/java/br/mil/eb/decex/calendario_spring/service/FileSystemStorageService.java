package br.mil.eb.decex.calendario_spring.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;

@Service
public class FileSystemStorageService implements StorageService {

    @Value("${media.location}")
    private String mediaLocation;

    private Path rootLocation;

    @Override
    @PostConstruct
    public void init() throws IOException {
       rootLocation = Paths.get(mediaLocation);
       Files.createDirectories(rootLocation);
    }

    @Override
    public String store(MultipartFile file) {
        try {

            if (file.isEmpty()) {
                throw new RuntimeErrorException(null, "Falha ao armazenar, arquivo vazio");
            }
            String filename = file.getOriginalFilename();
            Path destinationFile = rootLocation.resolve(Paths.get(filename))
                .normalize().toAbsolutePath();
    
                try (InputStream inputStream = file.getInputStream()) {
                    Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
                }
                return filename;

        } catch (IOException e) {
            throw new RuntimeException("Falha ao armazenar arquivo.", e);
        }
    }

        @Override
        public Resource loadAsResource(String filename) {
            try {

                Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource((file.toUri()));

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Não foi possível ler o arquivo: " + filename);
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Não foi possível ler o arquivo: " + filename);
        }
    }

}
