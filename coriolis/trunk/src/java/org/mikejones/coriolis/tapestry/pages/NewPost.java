/*
 * Created on 26-Feb-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.event.PageBeginRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.SecurePage;

public abstract class NewPost extends SecurePage implements PageBeginRenderListener {
    
	@InjectObject("service:blog.PostManager")
    public abstract PostManager getPostManager();

    public abstract Post getPost();

    public abstract void setPost(Post post);

    /*
     * (non-Javadoc)
     * 
     * @see org.apache.tapestry.event.PageRenderListener#pageBeginRender(org.apache.tapestry.event.PageEvent)
     */
    public void pageBeginRender(PageEvent pageEvent) {
        if (getPost() == null) {
            setPost(new Post());
        }
    }
    
    public String addPost() {
    	getPostManager().addPost(getPost());
    	return "Home";
    }

   

}