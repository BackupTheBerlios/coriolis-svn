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
    
    public abstract String getPostText();
    public abstract String getPostTitle();
    
    public void addPost(IRequestCycle cycle) {
        Post post = new Post();
        post.setTitle(getPostTitle());
        post.setText(getPostText());
                
        Registry registry = HiveMindFilter.getRegistry(cycle.getRequestContext().getRequest());        
        IPostManager postManager = (IPostManager) registry.getService(IPostManager.class);
        
        post.setId(new Integer(postManager.getPosts().size() +1));
        postManager.addPost(post);
        cycle.activate("Blog");
    }
    

}
