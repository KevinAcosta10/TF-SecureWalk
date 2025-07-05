package pe.edu.upc.backend.securities;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.Serializable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

    private static final long serialVersionUID = -7858869558953243875L;
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);


    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        logger.error("Unauthorized error: {}", authException.getMessage());
        logger.error("Request URI: {}", request.getRequestURI());
        logger.error("Request Method: {}", request.getMethod());
        logger.error("Exception cause: ", authException.getCause()); // Log the root cause if any

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }
}