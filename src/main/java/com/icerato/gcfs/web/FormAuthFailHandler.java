package com.icerato.gcfs.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class FormAuthFailHandler implements AuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest req,
			HttpServletResponse res, AuthenticationException e)
			throws IOException, ServletException {
		
		res.setStatus(HttpStatus.UNAUTHORIZED.value());
	}

}
