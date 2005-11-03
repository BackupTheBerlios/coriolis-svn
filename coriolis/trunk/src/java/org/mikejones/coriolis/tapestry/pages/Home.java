/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.tapestry.event.PageBeginRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.html.BasePage;
import org.mikejones.coriolis.managers.api.PostManager; 
import org.mikejones.coriolis.om.Post;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public abstract class Home extends BasePage implements PageBeginRenderListener {
    
    public abstract void setPostList(List postList);
//    
    public abstract PostManager getPostManager();
//
    /*
     *  (non-Javadoc)
     * @see org.apache.tapestry.event.PageBeginRenderListener#pageBeginRender(org.apache.tapestry.event.PageEvent)
     */
    public void pageBeginRender(PageEvent event) {
        getPostManager().getPosts();
        List posts = new ArrayList();
        Post post = new Post();
        post.setText("text");
        post.setTitle("title");
        post.setDate(new Date());
        posts.add(post);
        setPostList(posts);        
    }    
    


}
