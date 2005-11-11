/*
 * Created on 06-Mar-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.commons.lang.StringUtils;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.annotations.Bean;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.InjectState;
import org.apache.tapestry.event.PageBeginRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.valid.IValidationDelegate;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.SecurePage;
import org.mikejones.coriolis.tapestry.framework.aso.BlogVisit;
import org.mikejones.coriolis.tapestry.framework.validation.BlogDelegate;


public abstract class EditPost extends SecurePage implements PageBeginRenderListener{

    public abstract void setMessage(String message);
    
    public abstract void setPost(Post post);
    
    public abstract Post getPost();
    
    @InjectState("blogVisit")
    public abstract BlogVisit getBlogVisit();
    
    @InjectObject("service:blog.PostManager")
    public abstract PostManager getPostManager();
    
    
    @Bean(BlogDelegate.class)
    public abstract IValidationDelegate getDelegate();    

    public abstract void setPostId(Integer id);
    
    public abstract Integer getPostId();
    
    /* (non-Javadoc)
     * @see org.apache.tapestry.event.PageRenderListener#pageBeginRender(org.apache.tapestry.event.PageEvent)
     */
    public void pageBeginRender(PageEvent arg0) {
        if (getPost()==null){
           setPost(getPostManager().getPost(getPostId().intValue())); 
        }
        else {
            setPostId(getPost().getId());
        }
        if(getPostManager().getPosts()==null) {
            setPost(new Post());
            getPostManager().addPost(getPost());
        }
        else {
            if (getPostManager().getPost(getPostId().intValue())==null){
                getPostManager().addPost(getPost());  
            }  
        }
    } 
    
    public void editPost(IRequestCycle cycle, Integer id) {
        pageValidate(new PageEvent(this, cycle));
        if (getDelegate().getHasErrors()) {
            setMessage("Adam says: There are errors in the text input");
        }
        if (id == null) {
            id = new Integer(0);
        }
        if (getPostManager().getPost(id) == null) {
            Post post = new Post();
            post.setId(0);
            setPost(post);
        } else {
            setPost(getPostManager().getPost(id));
        }
        cycle.activate(this);
    }

    public void updatePost(IRequestCycle cycle) {
        setPost(getPostManager().getPost(getPostId().intValue()));
        if (StringUtils.isEmpty(getPost().getText())) {
            setMessage("The text field is required!");
        } else if(getDelegate().getHasErrors()){ 
                setMessage("Adam says: There are some errors here.");
            }
        else {
            getPostManager().saveOrUpdate(getPost());
            cycle.activate("Home");
        }
    }

}
