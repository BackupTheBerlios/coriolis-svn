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
import org.apache.tapestry.engine.state.ApplicationStateManager;
import org.mikejones.coriolis.managers.api.BlogManager;
import org.mikejones.coriolis.om.Blog;
import org.mikejones.coriolis.om.SiteStyle;
import org.mikejones.coriolis.tapestry.framework.aso.BlogVisit;

public abstract class Layout extends BaseComponent {

    public abstract Blog getBlog();

    @Parameter
    public abstract String getWindowSubtitle();

    @InjectState("blogVisit")
    public abstract BlogVisit getBlogVisit();
    
    public abstract void setBlog(Blog blog);

    @InjectObject("infrastructure:applicationStateManager")
    public abstract ApplicationStateManager getApplicationStateManager();

    @InjectObject("service:coriolis.managers.BlogManager")
    public abstract BlogManager getBlogManager();

    @Asset("s/blue/base.css")
    public abstract IAsset getBlueBaseStyle();
    
    @Asset("s/green/base.css")
    public abstract IAsset getGreenBaseStyle();

    @Asset("s/calendar.css")
    public abstract IAsset getCalendarStyle();
    
    public abstract void setIsLoggedIn(boolean isLoggedIn);

    private List<IAsset> styles;

    public List<IAsset> getStyleSheets() {
        return styles;
    }

   

    public String getWindowTitle() {
        String subTitle = getWindowSubtitle();

        if (subTitle == null) {
            return getBlog().getTitle();
        }
        return getBlog().getTitle() + " : " + subTitle;
    }

    protected void prepareForRender(IRequestCycle cycle) {
        setIsLoggedIn(getApplicationStateManager().exists("blogVisit"));

        setBlog(getBlogManager().loadBlog());

        if (styles == null) {
            styles = new ArrayList<IAsset>();

            if (getBlog().getStyle().equals(SiteStyle.GREEN)) {
                styles.add(getGreenBaseStyle());
            } else {
                styles.add(getBlueBaseStyle());
            }

            styles.add(getCalendarStyle());

        }
    }
}
