/*
 * Created on 25-Feb-2005
 */
package org.mikejones.coriolis.managers.api;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.mikejones.coriolis.om.Post;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public interface PostManager {
    
    /**
     * get a post from a specific id
     * @param id
     * @return
     */
    public Post getPost(Integer id);
    
    /**
     * Get the list of post in the db sorted by date posted
     * @return list of posts
     */
    public List<Post> getPosts();
    
    /**
     * Get the list of post in the db sorted by date posted for the month
     * @return list of posts
     */
    public List<Post> getPostsForMonth(Calendar calendar);
    
    /**
     * Get all the posts for a given date
     * @param date
     * @return
     */
    public List<Post> getPostForDate(Date date);
    
    /**
     * Delete a post
     * @param post
     */
    public void deletePost(Post post);    
    
    /**
     * Delete a post by id
     * @param id
     */
    public void deletePost(Integer id);
    
    /**
     * save or update a post
     * @param post
     */
    public void savePost(Post post);
    
}
