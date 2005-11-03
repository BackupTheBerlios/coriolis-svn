/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import java.util.List;

import org.apache.hivemind.Registry;
import org.apache.hivemind.servlet.HiveMindFilter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.event.PageRenderListener;
import org.apache.tapestry.html.BasePage;
import org.mikejones.coriolis.managers.api.PostManager;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public abstract class Blog extends BasePage implements PageRenderListener {

    public abstract List getPostList();

    public abstract void setPostList(List postList);

    /*
     * (non-Javadoc)
     * 
     * @see org.apache.tapestry.event.PageRenderListener#pageBeginRender(org.apache.tapestry.event.PageEvent)
     */
    public void pageBeginRender(PageEvent pageEvent) {
        Registry registry = HiveMindFilter.getRegistry(pageEvent.getRequestCycle().getRequestContext().getRequest());
        PostManager postManager = (PostManager) registry.getService(PostManager.class);
        setPostList(postManager.getPosts());
    }

    public void viewPost(IRequestCycle cycle) {
        Object[] parameters = cycle.getServiceParameters();
        Integer postId = (Integer) parameters[0];
        ViewPost viewPost = (ViewPost) cycle.getPage("ViewPost");
        viewPost.viewPost(cycle, postId);
    }

    public void editPost(IRequestCycle cycle) {
        Object[] parameters = cycle.getServiceParameters();
        Integer postId = (Integer) parameters[0];
        EditPost editPost = (EditPost) cycle.getPage("EditPost");
        editPost.editPost(cycle, postId);
    }

    public void deletePost(IRequestCycle cycle) {
        Object[] parameters = cycle.getServiceParameters();
        Integer postId = (Integer) parameters[0];
        Registry registry = HiveMindFilter.getRegistry(cycle.getRequestContext().getRequest());
        ((PostManager) registry.getService(PostManager.class)).removePost(postId);
        
    }

}
