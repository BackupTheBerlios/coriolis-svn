package org.mikejones.coriolis.om;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratorType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import org.hibernate.annotations.Cascade;

/***
 * Represents a category that a Post can belong to.
 * A Post can have multiple categories, and a category can 
 * contain many posts.
 * 
 * @author Gareth Jones
 *
 */
@Entity
public class Category {

	private Integer id;
	private String title;
	private String description;
	private List<Post> posts;
	
	public Category() {
		posts = new ArrayList<Post>();
	}
	
	@Id(generate = GeneratorType.AUTO)
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	@ManyToMany(cascade = CascadeType.ALL )
	public List<Post> getPosts() {
		return posts;
	}
	
	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}
	
	public void addPost(Post post) {
		this.getPosts().add(post);
		post.getCategories().add(this);
	}
	
	public void removePost(Post post) {
		this.getPosts().remove(post);
		post.getCategories().remove(this);
	}
}
