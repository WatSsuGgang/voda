package io.watssuggang.voda.common.redis;

import java.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Slf4j
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    public <T> List<T> getData(String redisKey, String hashKey, Class<T> type) {
        HashOperations<String, String, List<T>> operations = redisTemplate.opsForHash();
        List<T> ts = operations.get(redisKey, hashKey);
        return Optional.ofNullable(ts)
                .map(o -> o.stream().map(type::cast).toList())
                .orElse(List.of());
    }

    public <T> void addData(String redisKey, String hashKey, T data) {
        HashOperations<String, String, List<Object>> hash = redisTemplate.opsForHash();
        List<Object> ts = hash.get(redisKey, hashKey);
        if (ts == null) {
            ts = new ArrayList<>();
        }
        ts.add(data);
        hash.put(redisKey, hashKey, ts);
    }

    public void deleteData(String redisKey){
        redisTemplate.delete(redisKey);
        log.info("deleted " + redisKey + " ----------------------------");
    }
}
