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

    public abstract void setPostId(Integer id);

    public abstract Integer getPostId();

    public abstract String getPostText();

    public abstract void setPostText(String text);

    public abstract String getPostTitle();

    public abstract void setPostTitle(String title);

    public void editPost(IRequestCycle cycle, Integer postId) {
        Registry registry = HiveMindFilter.getRegistry(cycle.getRequestContext().getRequest());        
        IPostManager postManager = (IPostManager) registry.getService(IPostManager.class); 
        Post post = postManager.getPost(postId);

        setPostId(postId);
        setPostTitle(post.getTitle());
        setPostText(post.getText());

        cycle.activate(this);
    }

    public void updatePost(IRequestCycle cycle) {
        if (StringUtils.isEmpty(getPostTitle())
                || StringUtils.isEmpty(getPostText())) {
            setMessage("The Title and the text fields are both required!");
        } else {
            Registry registry = HiveMindFilter.getRegistry(cycle.getRequestContext().getRequest());        
            IPostManager postManager = (IPostManager) registry.getService(IPostManager.class);
            Post post = postManager.getPost(getPostId());
            post.setTitle(getPostTitle());
            post.setText(getPostText());
            postManager.saveOrUpdate(post);
            cycle.activate("Blog");
        }
    }
}
