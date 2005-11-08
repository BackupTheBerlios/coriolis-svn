/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.om;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.TemporalType;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
@Entity
public class Comment {

    //    public SimpleDateFormat COMMENT_DATE_FORMAT = new SimpleDateFormat("kk':'mm 'on' dd MMMM yyyy");

    private Integer id;

    private Post post;

    private Date date;

    private String author;

    private String comment;

    public Comment() {
        date = Calendar.getInstance().getTime();
    }

    /**
     * @return Returns the id.
     */
    @Id
    public Integer getId() {
        return id;
    }

    /**
     * @param id The id to set.
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return Returns the post.
     */
    @ManyToOne
    public Post getPost() {
        return post;
    }

    /**
     * @param post The post to set.
     */
    public void setPost(Post post) {
        this.post = post;
    }

    /**
     * @return Returns the author.
     */
    public String getAuthor() {
        return author;
    }

    /**
     * @param author The author to set.
     */
    public void setAuthor(String author) {
        this.author = author;
    }

    /**
     * @return Returns the comment.
     */
    public String getComment() {
        return comment;
    }

    /**
     * @param comment The comment to set.
     */
    public void setComment(String comment) {
        this.comment = comment;
    }

    /**
     * @return Returns the date.
     */
    @Basic(temporalType = TemporalType.TIME)
    public Date getDate() {
        return date;
    }

    /**
     * @param date The date to set.
     */
    public void setDate(Date date) {
        this.date = date;
    }
}
