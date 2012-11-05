package com.icerato.gcfs.web;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Folder {
	private String name;
	private List<Folder> children = new ArrayList<Folder>();
	private String id = UUID.randomUUID().toString().replace("-", "");

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Folder> getChildren() {
		return children;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public Folder() {
		
	}

	public Folder(String id, String name) {
		if (id != null && id.length() > 0) {
			this.id = id;
		}

		this.name = name;
	}
}
