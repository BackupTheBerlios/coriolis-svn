/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.om;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public class Comment {
    
    public SimpleDateFormat COMMENT_DATE_FORMAT = new SimpleDateFormat("kk':'mm 'on' dd MMMM yyyy");
    
    private Integer id;
    
    private Date date;
    
    private String author;
    
    private String comment;  
    
    public Comment() {
        date = Calendar.getInstance().getTime();
    }
    
    public String formattedDate() {
        return COMMENT_DATE_FORMAT.format(date);        
    }
    
    /**
     * @return Returns the id.
     */
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
