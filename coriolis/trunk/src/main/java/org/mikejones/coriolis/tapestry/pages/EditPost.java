/*
 * Created on 06-Mar-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.commons.lang.StringUtils;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.annotations.Bean;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.InjectState;
import org.apache.tapestry.annotations.Persist;
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
    
    public abstract Post getPost();
    public abstract void setPost(Post post);
    
    public abstract String getPostTitle();
    public abstract void getPostTitle(String title);
    
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
    
    /*public void editPost(IRequestCycle cycle, String id) {
        int idx = new Integer(id).intValue();
        editPost(cycle, idx);   
    }*/
    
    public void editPost(IRequestCycle cycle, Integer id) {
        if(getPostManager().getPosts()==null | id == null) {
            setPost(new Post());
        }
        else {
        setPost(getPostManager().getPost(id));
        }
        editPost(cycle);
    }
    
    public void editPost(IRequestCycle cycle) {
        pageValidate(new PageEvent(this, cycle));
        if(getDelegate().getHasErrors()){ 
        //List errorRenderers = getDelegate().getErrorRenderers();
       // errorRenderers.
        }
        cycle.activate(this);
        if (getPostId()==null){
            setPostId((Integer)cycle.getListenerParameters()[0]);
        }
        int x =new Integer(getPostId());
        if(getPostManager().getPost(x)!=null) {
            setPost(getPostManager().getPost(x));
        }
    }

    public void updatePost(IRequestCycle cycle) {
        if (StringUtils.isEmpty(getPost().getText())) {
            setMessage("The text field is required!");
        } else {
            if (getPost()!=null){
            getPostManager().saveOrUpdate(getPost());
            }
            else{
                cycle.getListenerParameters();
                } 
            }
        if (StringUtils.isEmpty(getPost().getTitle())) {
            setMessage("The title is required!");
        } else {
            if (getPostTitle()!=null){
                getPost().setTitle(getPostTitle());
            getPostManager().saveOrUpdate(getPost());
            }
            else{
                cycle.getListenerParameters();
                } 
            }
            cycle.activate("Blog");
        }
}
