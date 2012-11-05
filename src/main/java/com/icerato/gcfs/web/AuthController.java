package com.icerato.gcfs.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/auth")
public class AuthController {
	
	@RequestMapping
	public ResponseEntity<String> head() {
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		if (authentication != null && !authentication.getName().equals("anonymousUser")) {
			status = HttpStatus.OK;
		}
		
		return new ResponseEntity<>(status);
	}
	
}
