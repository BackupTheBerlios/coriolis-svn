/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.om;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratorType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

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

    public Post() {
        comments = new ArrayList<Comment>();
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
    @OneToMany(cascade = { CascadeType.ALL }, mappedBy = "post")
    @OrderBy("date asc")
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

}
