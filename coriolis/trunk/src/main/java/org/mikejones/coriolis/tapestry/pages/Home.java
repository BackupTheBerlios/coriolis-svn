/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import java.util.List;

import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.event.PageBeginRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.html.BasePage;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public abstract class Home extends BasePage implements PageBeginRenderListener {

    public abstract List<Post> getPosts();

    public abstract void setPosts(List<Post> posts);

    public abstract Post getPost();
    
    @InjectObject("service:coriolis.managers.PostManager")
    public abstract PostManager getPostManager();

    /*
     *  (non-Javadoc)
     * @see org.apache.tapestry.event.PageBeginRenderListener#pageBeginRender(org.apache.tapestry.event.PageEvent)
     */
    public void pageBeginRender(PageEvent event) {
        setPosts(getPostManager().getPosts());
    }

}
