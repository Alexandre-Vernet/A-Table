package com.a_table.controller;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/upload")
public class UploadController {

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("demo[]") MultipartFile file) throws IOException {
        String primeFacesUrl = "https://www.primefaces.org/cdn/api/upload.php";
        RestTemplate restTemplate = new RestTemplate();

        LinkedMultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("demo[]", new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        });

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(primeFacesUrl, requestEntity, String.class);

        return ResponseEntity.ok(response.getBody());
    }
}
