/*
 * created on 09-Feb-2006
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.event.PageBeginRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.form.IPropertySelectionModel;
import org.apache.tapestry.html.BasePage;
import org.mikejones.coriolis.managers.api.BlogManager;
import org.mikejones.coriolis.om.Blog;
import org.mikejones.coriolis.om.SiteStyle;
import org.mikejones.coriolis.tapestry.form.SiteStyleSelectionModel;

public abstract class Admin extends BasePage implements PageBeginRenderListener {

    @InjectObject("service:coriolis.managers.BlogManager")
    public abstract BlogManager getBlogManager();

    public abstract void setBlog(Blog blog);

    public static final IPropertySelectionModel SITESTYLE_MODEL = new SiteStyleSelectionModel();

    /**
     * Method for loop
     * @return
     */
    public abstract SiteStyle getCurrentStyle();

    public void pageBeginRender(PageEvent event) {
        setBlog(getBlogManager().loadBlog());
    }

    public void submit() {
        
    }
    
    
}
