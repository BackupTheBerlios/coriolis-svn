/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.om;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike </a>
 */
public class Post {

    private SimpleDateFormat DATE_TIME_FORMAT = new SimpleDateFormat("kk':'mm 'on' dd MMMM yyyy");    

    private Integer id;

    private String title;

    private String text;

    private List comments;

    private Date date;

    public Post() {
        comments = new ArrayList();
        date = Calendar.getInstance().getTime();
    }

    public String formatedDateTime() {
        return DATE_TIME_FORMAT.format(date);
    }

    /**
     * @return Returns the id.
     */
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
    public List getComments() {
        return comments;
    }

    /**
     * @param comments
     *            The comments to set.
     */
    public void setComments(List comments) {
        this.comments = comments;
    }
    
    /**
     * @param comment
     *          A comment to add to the List
     */
    public void addComment(Comment comment) {
        comments.add(comment);
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
