package com.example.student_management_system.Service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenDenylistService {
    private final ConcurrentHashMap<String,Long> concurrentHashMap = new ConcurrentHashMap<>();
    public void revokeToken(String tokenHash,long expirationTime){
        concurrentHashMap.put(tokenHash,expirationTime);
    }

    public boolean isTokenRevoked(String tokenHash){
        if(concurrentHashMap.containsKey(tokenHash)){
            return true;
        }
        else {
            return false;
        }
    }

    @Scheduled(fixedRate = 60000)
    public void removeExpiredTokens(){
        long currentTime = System.currentTimeMillis();
        concurrentHashMap.entrySet().removeIf(time->time.getValue()<=currentTime);
    }

    public String hashToken(String token) throws NoSuchAlgorithmException{
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] t = token.getBytes(StandardCharsets.UTF_8);
        byte[] m = md.digest(t);
        return HexFormat.of().formatHex(m);
    }
}
