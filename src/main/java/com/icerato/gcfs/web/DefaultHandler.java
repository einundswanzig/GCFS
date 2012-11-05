package com.icerato.gcfs.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

public class DefaultHandler implements Controller {

	@Override
	public ModelAndView handleRequest(HttpServletRequest req,
			HttpServletResponse res) throws Exception {
		String url = req.getRequestURI();
		
		System.out.println("Default handler: " + url);
		
		if (url.equals("/favicon.ico")) {
			return null;
		}
		
		res.sendRedirect("/#" + url);
		
		return null;
	}
	
}
