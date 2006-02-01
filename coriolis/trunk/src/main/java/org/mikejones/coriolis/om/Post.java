/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.om;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * A class to respresent a post.
 * This is a POJO and is part of the domain model.
 * 
 * 
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike </a>
 */
@Entity
public class Post {

    private Integer id;

    private String title = "";

    private String text = "";

    private List<Comment> comments;

    private Date postDate;
    
    private List<Category> categories;

    public Post() {
        comments = new ArrayList<Comment>();
        categories = new ArrayList<Category>();
    }

    /**
     * @return Returns the id.
     */
    @Id(generate = GeneratorType.AUTO)
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     *            The id to set.
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return Returns the comments.
     */
    @OneToMany(cascade = { javax.persistence.CascadeType.ALL }, mappedBy = "post")
    @OrderBy("date desc")
    public List<Comment> getComments() {
        return comments;
    }

    /**
     * @param comments
     *            The comments to set.
     */
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    /**
     * @param comment
     *          A comment to add to the List
     */
    public void addComment(Comment comment) {
        getComments().add(comment);
        comment.setPost(this);
    }

    /**
     * @return Returns the text.
     */
    @Column(columnDefinition="text")
    public String getText() {
        return text;
    }

    /**
     * @param text
     *            The text to set.
     */
    public void setText(String text) {
        this.text = text;
    }

    /**
     * @return Returns the title.
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title
     *            The title to set.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return Returns the date.
     */
    public Date getPostDate() {
        return postDate;
    }

    /**
     * @param date The date to set.
     */
    public void setPostDate(Date date) {
        this.postDate = date;
    }
    
    @ManyToMany(mappedBy="posts", cascade = CascadeType.ALL )
    public List<Category> getCategories() {
    		return categories;
    }
    
    public void setCategories(List<Category> categories) {
    		this.categories = categories;
    }
    
    public void addCategory(Category category) {
    		this.getCategories().add(category);
    		category.getPosts().add(this);
    }
    
    public void removeCategory(Category category) {
    		this.getCategories().remove(category);
    		category.getPosts().remove(this);
    }
    
    public boolean containsCategory(String title) {
    		for (Category c : this.getCategories()) {
    			if (title.equals(c.getTitle()))
    				return true;
    		}
    		return false;
    }
    
    public String categoriesAsString() {
    		String result = "";
		for (int i = 0; i < getCategories().size(); i++) {
			result += getCategories().get(i).getTitle();
			if (i < getCategories().size() - 1)
				result += ", ";
		}
		return result;
    }

}
