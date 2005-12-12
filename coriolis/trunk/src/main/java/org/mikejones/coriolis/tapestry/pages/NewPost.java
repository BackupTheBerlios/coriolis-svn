/*
 * Created on 26-Feb-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.tapestry.annotations.Bean;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.event.PageBeginRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.html.BasePage;
import org.apache.tapestry.valid.IValidationDelegate;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.validation.BlogDelegate;

public abstract class NewPost extends BasePage implements PageBeginRenderListener {

    @Bean(BlogDelegate.class)
    public abstract IValidationDelegate getDelegate();

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
        if (getDelegate().getHasErrors())
            return null;
        getPostManager().savePost(getPost());
        return "Home";
    }

}