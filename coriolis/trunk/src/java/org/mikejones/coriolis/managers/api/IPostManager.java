/*
 * Created on 25-Feb-2005
 */
package org.mikejones.coriolis.managers.api;

import java.util.List;

import org.mikejones.coriolis.om.Post;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public interface IPostManager {
    
    public Post getPost(int index);
    
    public Post getPost(Integer id);
    
    public List getPosts();
    
    public void addPost(Post post);
    
    public void removePost(Post post);    
    
    public void removePost(Integer id);
    
    public void saveOrUpdate(Post post);

}