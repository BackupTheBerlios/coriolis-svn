package org.mikejones.coriolis.om;

import javax.persistence.Entity;
import javax.persistence.GeneratorType;
import javax.persistence.Id;

/**
 * A class that represents the blog and contains the specific settings
 * TODO get this class cached
 * @author mike
 * 
 */
@Entity
public class Blog {

	private Long id;

	private String title;

	@Id(generate = GeneratorType.AUTO)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
