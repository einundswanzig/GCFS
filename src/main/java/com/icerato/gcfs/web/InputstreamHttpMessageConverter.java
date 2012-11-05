package com.icerato.gcfs.web;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.stereotype.Component;

@Component
public class InputstreamHttpMessageConverter implements HttpMessageConverter<InputStream> {

	@Override
	public boolean canRead(Class<?> clazz, MediaType mediaType) {
		return false;
	}

	@Override
	public boolean canWrite(Class<?> clazz, MediaType mediaType) {
		return InputStream.class.isAssignableFrom(clazz) ? true : false;
	}

	@Override
	public List<MediaType> getSupportedMediaTypes() {
		List<MediaType> result = new ArrayList<>();
		result.add(MediaType.parseMediaType("*/*"));
		return result;
	}

	@Override
	public InputStream read(Class<? extends InputStream> clazz, HttpInputMessage inputMessage) 
			throws IOException, HttpMessageNotReadableException {
		return null;
	}

	@Override
	public void write(InputStream t, MediaType contentType, HttpOutputMessage outputMessage) 
			throws IOException, HttpMessageNotWritableException {
		IOUtils.copy(t, outputMessage.getBody());
	}

}
