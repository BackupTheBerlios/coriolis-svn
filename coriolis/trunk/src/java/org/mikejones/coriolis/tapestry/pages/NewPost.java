/*
 * Created on 26-Feb-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.event.PageBeginRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.valid.IValidationDelegate;
import org.apache.tapestry.valid.ValidationConstraint;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.SecurePage;

public abstract class NewPost extends SecurePage implements PageBeginRenderListener {
    
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

    public void addPost(IRequestCycle cycle) {
        IValidationDelegate delegate = (IValidationDelegate) getBeans().getBean("delegate");

        if (StringUtils.isEmpty(getPost().getText())) {
            error(delegate, "inputText", "The text field is required.", ValidationConstraint.REQUIRED);
        }

        if (delegate.getHasErrors()) {
            return;
        }        
        
        Post post = getPost();
        post.setPostDate(new Date(Calendar.getInstance().getTimeInMillis()));

        getPostManager().addPost(getPost());
        cycle.activate("Blog");
    }

}