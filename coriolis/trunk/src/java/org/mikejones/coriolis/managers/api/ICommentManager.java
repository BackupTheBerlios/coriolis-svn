/*
 * Created on 15-Mar-2005
 */
package org.mikejones.coriolis.managers.api;

import org.mikejones.coriolis.om.Comment;
import org.mikejones.coriolis.om.Post;

public interface ICommentManager {
    
    /**
     * Add a newly created comment to the post
     * 
     * @param post
     * @param comment
     */
    public void addComment(Post post, Comment comment);
    
    public void removePost(Comment comment);
    
    public void saveOrUpdate(Object object);
    
    

}
