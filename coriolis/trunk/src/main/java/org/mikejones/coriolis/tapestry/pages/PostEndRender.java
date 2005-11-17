/*
 * Created on 06-Mar-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.tapestry.annotations.Bean;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.InjectState;
import org.apache.tapestry.event.PageEndRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.valid.IValidationDelegate;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.aso.BlogVisit;
import org.mikejones.coriolis.tapestry.framework.validation.BlogDelegate;


public abstract class PostEndRender extends EditPost implements PageEndRenderListener{

    public abstract void setMessage(String message);
    
    @InjectState("blogVisit")
    public abstract BlogVisit getBlogVisit();
    
    @InjectObject("service:blog.PostManager")
    public abstract PostManager getPostManager();
    
    @Bean(BlogDelegate.class)
    public abstract IValidationDelegate getDelegate();    

    
    /* (non-Javadoc)
     * @see org.apache.tapestry.event.PageRenderListener#pageBeginRender(org.apache.tapestry.event.PageEvent)
     */
    public void pageEndRender(PageEvent arg0) {
        getPostManager().saveOrUpdate(getPost());
    } 
    
}
