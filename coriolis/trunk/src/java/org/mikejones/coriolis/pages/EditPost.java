/*
 * Created on 06-Mar-2005
 */
package org.mikejones.coriolis.pages;

import org.apache.commons.lang.StringUtils;
import org.apache.hivemind.Registry;
import org.apache.hivemind.servlet.HiveMindFilter;
import org.apache.tapestry.IRequestCycle;
import org.mikejones.coriolis.framework.SecurePage;
import org.mikejones.coriolis.managers.api.IPostManager;
import org.mikejones.coriolis.om.Post;

public abstract class EditPost extends SecurePage {

    public abstract void setMessage(String message);
    
    public abstract void setPost(Post post);
    
    public abstract Post getPost();

    public void editPost(IRequestCycle cycle, Integer postId) {
        Registry registry = HiveMindFilter.getRegistry(cycle.getRequestContext().getRequest());        
        IPostManager postManager = (IPostManager) registry.getService(IPostManager.class); 
        setPost(postManager.getPost(postId));
        cycle.activate(this);
    }

    public void updatePost(IRequestCycle cycle) {
        if (StringUtils.isEmpty(getPost().getText())) {
            setMessage("The text field is required!");
        } else {
            Registry registry = HiveMindFilter.getRegistry(cycle.getRequestContext().getRequest());        
            IPostManager postManager = (IPostManager) registry.getService(IPostManager.class);            
            postManager.saveOrUpdate(getPost());
            cycle.activate("Blog");
        }
    }
}
