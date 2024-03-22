package io.watssuggang.voda.diary.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileUploadService {

    private final AmazonS3Client amazonS3Client;

    String voiceUpload(Integer userId, String contentType, String folder, String fileType,
        MultipartFile multipartFile)
        throws IOException {
        return voiceUpload(userId, contentType, folder, fileType, multipartFile.getBytes());
    }

    String voiceUpload(Integer userId, String contentType, String folder, String fileType,
        byte[] byteArray) {
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        String filePath = folder + "/" + uuid + "." + fileType;
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("userId", String.valueOf(userId));
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(contentType);
        metadata.setContentLength(byteArray.length);
        metadata.setLastModified(Date.from(ZonedDateTime.now().toInstant()));
        metadata.setUserMetadata(userInfo);
        amazonS3Client.putObject("voda-bucket", filePath, new ByteArrayInputStream(byteArray),
            metadata);
        return amazonS3Client.getUrl("voda-bucket", filePath).toString();
    }

}
