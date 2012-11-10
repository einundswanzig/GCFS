package com.icerato.gcfs.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AuthController {
	
	@RequestMapping(value = "/api/auth", method = RequestMethod.HEAD)
	public ResponseEntity<String> head() {
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		if (authentication != null && !authentication.getName().equals("anonymousUser")) {
			status = HttpStatus.OK;
		}
		
		return new ResponseEntity<>(status);
	}
	
	@ResponseBody
	@RequestMapping(value = "/api/user/info", method = RequestMethod.GET)
	public ResponseEntity<String> getUserInfo() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		if (authentication != null) {
			return new ResponseEntity<String>(authentication.getName(), HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("sexo", HttpStatus.UNAUTHORIZED);
	}
	
}
