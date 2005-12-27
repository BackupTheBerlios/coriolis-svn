/*
 * Created on 05-Mar-2005
 */
package org.mikejones.coriolis.tapestry.components;

import org.apache.tapestry.BaseComponent;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.InjectState;
import org.mikejones.coriolis.managers.api.BlogManager;
import org.mikejones.coriolis.om.Blog;
import org.mikejones.coriolis.tapestry.framework.aso.BlogVisit;

public abstract class Layout extends BaseComponent {
	
	public abstract Blog getBlog();
	
	public abstract void setBlog(Blog blog);	

    @InjectState("blogVisit")
    public abstract BlogVisit getBlogVisit();
    
    @InjectObject("service:coriolis.managers.BlogManager")
    public abstract BlogManager getBlogManager();

    public abstract void setIsLoggedIn(boolean isLoggedIn);

    protected void prepareForRender(IRequestCycle cycle) {
        setIsLoggedIn(getPage().getEngine().getInfrastructure().getApplicationStateManager().exists("blogVisit"));
        
        if(getBlog()==null) {
        	Blog blog = new Blog();
        	blog.setTitle("[change this in admin]");
        	setBlog(blog);
        	
        }
    }

}
