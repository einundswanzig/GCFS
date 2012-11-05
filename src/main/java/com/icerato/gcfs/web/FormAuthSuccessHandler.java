package com.icerato.gcfs.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

public class FormAuthSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth) 
			throws ServletException, IOException {
		
		this.setRedirectStrategy(new RedirectStrategy() {			
			@Override
			public void sendRedirect(HttpServletRequest req, HttpServletResponse res,
					String url) throws IOException {				
				res.setHeader("Location", url);
			}
		});
		
		super.onAuthenticationSuccess(req, res, auth);
				
		res.setStatus(HttpStatus.OK.value());
	}
}
