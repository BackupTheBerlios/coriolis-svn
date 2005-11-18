/*
 * Created on 06-Mar-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.commons.lang.StringUtils;
import org.apache.tapestry.IRender;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.annotations.Bean;
import org.apache.tapestry.annotations.InjectComponent;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.InjectState;
import org.apache.tapestry.annotations.Persist;
import org.apache.tapestry.event.PageBeginRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.valid.IValidationDelegate;
import org.apache.tapestry.valid.ValidatorException;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.SecurePage;
import org.mikejones.coriolis.tapestry.framework.aso.BlogVisit;
import org.mikejones.coriolis.tapestry.framework.validation.BlogDelegate;


public abstract class EditPost extends SecurePage implements PageBeginRenderListener{

    public abstract void setMessage(String message);
    
    public abstract Post getPost();
    public abstract void setPost(Post post);
    
    public abstract String getPostTitle();
    public abstract void setPostTitle(String title);
    
    public abstract String getTitle();
    public abstract void setTitle(String title);
    
    
    public abstract String getText();
    public abstract void setText(String text);
    
    @Persist("client")
    public abstract Integer getPostId();
    public abstract void setPostId(Integer id);
    
    @InjectState("blogVisit")
    public abstract BlogVisit getBlogVisit();
    
    @InjectObject("service:blog.PostManager")
    public abstract PostManager getPostManager();
    
    @Bean(BlogDelegate.class)
    public abstract IValidationDelegate getDelegate();
    
    
    
    /* (non-Javadoc)
     * @see org.apache.tapestry.event.PageRenderListener#pageBeginRender(org.apache.tapestry.event.PageEvent)
     */
    public void pageBeginRender(PageEvent arg0) {
        if(getPostManager().getPosts()==null) {
            setPost(new Post());
        }
    } 
    
    public void editPost(IRequestCycle cycle, Integer id) {
        if(getPostManager().getPosts()==null | id == null) {
            setPost(new Post());
        }
        else {
        setPost(getPostManager().getPost(id));
        setTitle(getPost().getTitle());
        }
        editPost(cycle);
    }
    
    public void editPost(IRequestCycle cycle) {
        pageValidate(new PageEvent(this, cycle));
        if(getDelegate().getHasErrors()){
            setMessage("Correct login required.");
            cycle.activate(this); 
        }
        if (getPostId()==null){
            setPostId((Integer)cycle.getListenerParameters()[0]);
        }
        int x =new Integer(getPostId());
        if(getPostManager().getPost(x)!=null) {
            setPost(getPostManager().getPost(x));
            setTitle(getPost().getTitle());
            setText(getPost().getText());
            cycle.activate(this);
        }
    }

    public void updatePost(IRequestCycle cycle) {
        if (StringUtils.isEmpty(getText())) {
            ValidatorException ve = new ValidatorException("The text field is required!");//setMessage("The text field is required!");
            getDelegate().record(ve);
            getDelegate().getErrorRenderers();
            if (getDelegate().isInError()) {
                cycle.activate(this);
            } 
        }
        else {
                if (this.getPost() != null) {
                    getPostManager().saveOrUpdate(this.getPost());
                    //cycle.activate("Home");
                } else {
                    //setPostId(((Integer)cycle.getListenerParameters()[0]).intValue());
                    Post updatePost = getPostManager().getPost(getPostId().intValue());
                    updatePost.setText(getText());
                    setPost(updatePost);
                    getPostManager().saveOrUpdate(getPost());
                    //cycle.activate("Home");
                }
            }
            if (StringUtils.isEmpty(getTitle())) {
                ValidatorException ve = new ValidatorException("The text title is required!");//setMessage("The text field is required!");
                getDelegate().record(ve);
                if (getDelegate().isInError()) {
                    cycle.activate(this);
                } 
            } else {
                if (this.getTitle() != null & getPost()!= null) {
                    getPost().setTitle(getTitle());
                    getPostManager().saveOrUpdate(getPost());
                    cycle.activate("Home");
                }
            }
    }
}
