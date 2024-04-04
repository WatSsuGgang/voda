package io.watssuggang.voda.diary.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import io.watssuggang.voda.diary.domain.DiaryFile;
import io.watssuggang.voda.diary.repository.DiaryFileRepository;
import jakarta.transaction.Transactional;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.extern.slf4j.XSlf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class FileUpdateService {

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final DiaryFileRepository diaryFileRepository;

    public String fileUpload(Integer userId, String contentType, String folder, String fileType,
            MultipartFile multipartFile)
            throws IOException {
        return fileUpload(userId, contentType, folder, fileType, multipartFile.getBytes());
    }

    public String fileUpload(Integer userId, String contentType, String folder, String fileType,
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
        amazonS3Client.putObject(bucket, filePath, new ByteArrayInputStream(byteArray),
                metadata);
        return amazonS3Client.getUrl(bucket, filePath).toString();
    }

    public void fileDelete(Integer diaryId){
        List<DiaryFile> files = diaryFileRepository.findFilesByDiaryId(diaryId);
        for(DiaryFile f : files){
            System.out.println(f.getFileUrl());
        }
        for(DiaryFile f : files){
            amazonS3Client.deleteObject("voda-bucket", extractKey(f.getFileUrl()));
        }
    }
    private static String extractKey(String url) {
        // 정규식 패턴
        String pattern = ".+?/.+?/(.+)";

        // 정규식을 사용하여 파일 이름 추출
        Pattern r = Pattern.compile(pattern);
        Matcher m = r.matcher(url);
        if (m.find()) {
            String fileName = m.group(1);
            log.info(fileName + " s3에서 삭제");
            return fileName;
        }
        return null;
    }
}
