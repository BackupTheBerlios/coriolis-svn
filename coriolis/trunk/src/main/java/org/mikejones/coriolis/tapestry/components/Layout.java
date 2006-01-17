/*
 * Created on 05-Mar-2005
 */
package org.mikejones.coriolis.tapestry.components;

import java.util.ArrayList;
import java.util.List;

import org.apache.tapestry.BaseComponent;
import org.apache.tapestry.IAsset;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.annotations.Asset;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.InjectState;
import org.apache.tapestry.annotations.Parameter;
import org.mikejones.coriolis.managers.api.BlogManager;
import org.mikejones.coriolis.om.Blog;
import org.mikejones.coriolis.tapestry.framework.aso.BlogVisit;

public abstract class Layout extends BaseComponent {
	
	public abstract Blog getBlog();
	
	@Parameter
	public abstract String getWindowSubtitle();
	
	public abstract void setBlog(Blog blog);	

    @InjectState("blogVisit")
    public abstract BlogVisit getBlogVisit();
    
    @InjectObject("service:coriolis.managers.BlogManager")
    public abstract BlogManager getBlogManager();
    
    @Asset("s/base.css")
    public abstract IAsset getBaseStyle();
    
    @Asset("s/green.css")
    public abstract IAsset getGreenStyle();
    
    @Asset("s/calendar.css")
    public abstract IAsset getCalendarStyle();
    
    private List<IAsset> styles;
    
    public List<IAsset> getStyleSheets() {
    	return styles; 	
    }
    
    public String getStatusMessage() {
    	if (getBlogVisit().isUserLoggedIn()) {
    		return "You are currently logged in as " + getBlogVisit().getUser(null).getUsername();
    	}
    	return "You are not currently logged in";
    }

    public abstract void setIsLoggedIn(boolean isLoggedIn);
    
    public String getWindowTitle() {
    	String subTitle = getWindowSubtitle();
    	
    	if(subTitle == null) {
    		return getBlog().getTitle();
    	}
    	return getBlog().getTitle() +" : " + subTitle;
    }

    protected void prepareForRender(IRequestCycle cycle) {
        setIsLoggedIn(getPage().getEngine().getInfrastructure().getApplicationStateManager().exists("blogVisit"));
        
        if (styles == null) {
    		styles = new ArrayList<IAsset>();
    		styles.add(getBaseStyle());
    		styles.add(getGreenStyle());
    		styles.add(getCalendarStyle());
    		
    	}
        
        if(getBlog()==null) {
        	Blog blog = new Blog();
        	blog.setTitle("[change this in admin]");
        	setBlog(blog);
        	
        }
    }

}
