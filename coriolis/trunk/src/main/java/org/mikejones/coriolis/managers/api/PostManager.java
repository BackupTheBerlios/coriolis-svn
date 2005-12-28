/*
 * Created on 25-Feb-2005
 */
package org.mikejones.coriolis.managers.api;

import java.util.Calendar;
import java.util.List;

import org.mikejones.coriolis.om.Post;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public interface PostManager {
    
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
    public List<Post> getPostsForMonth();
    
    public void deletePost(Post post);    
    
    public void deletePost(Integer id);
    
    public void savePost(Post post);
    
}
