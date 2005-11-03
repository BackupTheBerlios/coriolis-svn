/*
 * Created on 06-Mar-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.commons.lang.StringUtils;
import org.apache.hivemind.Registry;
import org.apache.hivemind.servlet.HiveMindFilter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.event.PageRenderListener;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.SecurePage;

public abstract class EditPost extends SecurePage implements PageRenderListener {

    public abstract void setMessage(String message);
    
    public abstract void setPost(Post post);
    
    public abstract Post getPost();
    
    /* (non-Javadoc)
     * @see org.apache.tapestry.event.PageRenderListener#pageBeginRender(org.apache.tapestry.event.PageEvent)
     */
    public void pageBeginRender(PageEvent arg0) {
        if(getPost()==null) {
            setPost(new Post());
        }
    } 

    public void editPost(IRequestCycle cycle, Integer postId) {
        Registry registry = HiveMindFilter.getRegistry(cycle.getRequestContext().getRequest());        
        PostManager postManager = (PostManager) registry.getService(PostManager.class); 
        setPost(postManager.getPost(postId));
        cycle.activate(this);
    }

    public void updatePost(IRequestCycle cycle) {
        if (StringUtils.isEmpty(getPost().getText())) {
            setMessage("The text field is required!");
        } else {
            Registry registry = HiveMindFilter.getRegistry(cycle.getRequestContext().getRequest());        
            PostManager postManager = (PostManager) registry.getService(PostManager.class);            
            postManager.saveOrUpdate(getPost());
            cycle.activate("Blog");
        }
    }
}
