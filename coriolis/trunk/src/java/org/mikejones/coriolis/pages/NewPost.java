/*
 * Created on 26-Feb-2005
 */
package org.mikejones.coriolis.pages;

import org.apache.hivemind.Registry;
import org.apache.hivemind.servlet.HiveMindFilter;
import org.apache.tapestry.IRequestCycle;
import org.mikejones.coriolis.framework.SecurePage;
import org.mikejones.coriolis.managers.api.IPostManager;
import org.mikejones.coriolis.om.Post;

public abstract class NewPost extends SecurePage {
    
    public abstract Post getPost();
    public abstract void setPost(Post post);
    
    /* (non-Javadoc)
     * @see org.apache.tapestry.AbstractPage#beginPageRender()
     */
    public void beginPageRender() {
        if(getPost()==null) {
            setPost(new Post());
        }
    }
        
    public void addPost(IRequestCycle cycle) {
                        
        Registry registry = HiveMindFilter.getRegistry(cycle.getRequestContext().getRequest());        
        IPostManager postManager = (IPostManager) registry.getService(IPostManager.class);
        
        postManager.addPost(getPost());
        cycle.activate("Blog");
    }
    

}
