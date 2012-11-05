package com.icerato.gcfs.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;


@Controller
public class ExplorerController {

	@ResponseBody
	@RequestMapping(value = "/content", method = RequestMethod.GET)
	public Folder handle() {
		Folder root = new Folder("0", "/");
		Folder formar = new Folder(null, "formar");
		Folder interclass = new Folder(null, "interclass");
		
		root.getChildren().add(formar);
		root.getChildren().add(interclass);
		
		Folder ensenada = new Folder(null, "ensenada");
		Folder mexicali = new Folder(null, "mexicali");
		
		formar.getChildren().add(ensenada);
		formar.getChildren().add(mexicali);
		
		Folder archivos = new Folder(null, "archivos");
		
		interclass.getChildren().add(archivos);
		
		return root;
	}
	
	@RequestMapping(value = "/form", method = RequestMethod.POST)
	public ResponseEntity<String> handleFormUpload(@RequestParam("id") String id, @RequestParam("file") MultipartFile file) {
		System.out.println(id + " " + file.getOriginalFilename() + ": " + file.getSize() + " " + file.getContentType());
		
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
}
