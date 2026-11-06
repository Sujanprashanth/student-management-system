package com.example.student_management_system.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.JwtException;
import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secretKey;

    public SecretKey generateKey(){
        byte [] keybytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keybytes);
    }

    public String generateToken(String username){
        long currentTime = System.currentTimeMillis();
        return Jwts.builder()
                .signWith(generateKey())
                .issuedAt(new Date(currentTime))
                .expiration(new Date(currentTime+1000*60*15))
                .subject(username)
                .compact();
    }

    public boolean isTokenValid(UserDetails userDetails, String token){
        String name = userDetails.getUsername();

        try {
            String username = extractUsername(token);
            if(username.equals(name) && !isTokenExpired(token)){
                return true;
            }
        }
        catch(JwtException e) {
            return false;
        }
        return false;
    }

    public Date extractExpiration(String token){
        return Jwts.parser()
                .verifyWith(generateKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();
    }

    public boolean isTokenExpired(String token){
        Date d1 = extractExpiration(token);
        long cTime = System.currentTimeMillis();
        Date d2 = new Date(cTime);
        if(d1.before(d2)){
            return true;
        }
        else{
            return false;
        }
    }

    public String extractUsername(String token){
        return Jwts.parser()
                .verifyWith(generateKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}