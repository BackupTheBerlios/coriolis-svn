/*
 * Created on 21-Feb-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.annotations.Bean;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.InjectPage;
import org.apache.tapestry.annotations.InjectState;
import org.apache.tapestry.event.PageBeginRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.html.BasePage;
import org.apache.tapestry.valid.IValidationDelegate;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Comment;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.aso.BlogVisit;
import org.mikejones.coriolis.tapestry.framework.validation.BlogDelegate;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike</a>
 */
public abstract class ViewPost extends BasePage implements PageBeginRenderListener {
    
    @Bean(BlogDelegate.class)
    public abstract IValidationDelegate getDelegate();

    @InjectState("blogVisit")
    public abstract BlogVisit getBlogVisit();
    
    @InjectObject("service:blog.PostManager")
    public abstract PostManager getPostManager();
    
    @InjectPage("EditPost")
    public abstract EditPost getEditPostPage();

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
        PostManager postManager = getPostManager();
        Post post = postManager.getPost(getPostId());       
        if(getDelegate().getHasErrors()) {
            setPost(post);
            return;
        }                
        
        post.addComment(getComment());
        setPost(post);
        setComment(new Comment());
    }

    public void editPost(IRequestCycle cycle) {
        getEditPostPage().pageValidate(new PageEvent(this, cycle));
        if(getDelegate().getHasErrors()){ 
            setMessage("Adam says: There are errors in the text input");
        }
        cycle.activate(this);
    }
}
