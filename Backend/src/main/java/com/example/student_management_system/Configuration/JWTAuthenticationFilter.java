package com.example.student_management_system.Configuration;

import com.example.student_management_system.Service.CustomUserDetailService;
import com.example.student_management_system.Service.JwtService;
import com.example.student_management_system.Service.TokenDenylistService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailService userDetailService;
    private final TokenDenylistService tokenDenylistService;

    public JWTAuthenticationFilter(JwtService jwtService,CustomUserDetailService userDetailService,TokenDenylistService tokenDenylistService){
        this.jwtService=jwtService;
        this.tokenDenylistService=tokenDenylistService;
        this.userDetailService=userDetailService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        System.out.println("Path: " + request.getRequestURI()
                + " | Bearer token received: "
                + (authHeader != null && authHeader.startsWith("Bearer ")));
        if(authHeader==null||!authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }
        String token = authHeader.substring(7);
        try {
            String htoken = tokenDenylistService.hashToken(token);
            if(tokenDenylistService.isTokenRevoked(htoken)){
                SecurityContextHolder.clearContext();
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        try{
            String username = jwtService.extractUsername(token);
            if(username!=null&& SecurityContextHolder.getContext().getAuthentication()==null){
                UserDetails userDetails = userDetailService.loadUserByUsername(username);
                if(jwtService.isTokenValid(userDetails,token)){
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    System.out.println("Authenticated username: "
                            + SecurityContextHolder.getContext()
                            .getAuthentication().getName()
                            + " | Authorities: "
                            + SecurityContextHolder.getContext()
                            .getAuthentication().getAuthorities());
                }
            }
        }
        catch(io.jsonwebtoken.JwtException | IllegalArgumentException | UsernameNotFoundException ex){
            SecurityContextHolder.clearContext();
        }
        filterChain.doFilter(request, response);
    }
}
