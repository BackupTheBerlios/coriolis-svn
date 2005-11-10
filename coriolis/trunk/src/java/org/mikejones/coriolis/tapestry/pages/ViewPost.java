/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.tapestry.annotations.Bean;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.event.PageBeginRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.html.BasePage;
import org.apache.tapestry.valid.IValidationDelegate;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Comment;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.validation.BlogDelegate;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public abstract class ViewPost extends BasePage implements PageBeginRenderListener {
    
    @Bean(BlogDelegate.class)
    public abstract IValidationDelegate getDelegate();

    @InjectObject("service:blog.PostManager")
    public abstract PostManager getPostManager();

    public abstract Comment getLoopComment();

    public abstract Comment getComment();

    public abstract void setComment(Comment comment);

    public abstract void setPost(Post post);

    public abstract Integer getPostId();

    public abstract void setPostId(Integer id);

    public abstract void setMessage(String message);

    /*
     *  (non-Javadoc)
     * @see org.apache.tapestry.event.PageBeginRenderListener#pageBeginRender(org.apache.tapestry.event.PageEvent)
     */
    public void pageBeginRender(PageEvent arg0) {
        if (getComment() == null)
            setComment(new Comment());
    }

    public void viewPost(Integer postId) {
        PostManager postManager = getPostManager();
        setPost(postManager.getPost(postId));
        setPostId(postId);

        getRequestCycle().activate(this);
    }

    public void addComment() {
        if(getDelegate().getHasErrors())
            return;
        
        PostManager postManager = getPostManager();
        Post post = postManager.getPost(getPostId());
        post.addComment(getComment());
        setPost(post);
        setComment(new Comment());
    }

}
