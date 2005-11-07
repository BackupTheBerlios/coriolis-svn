/*
 * Created on 05-Mar-2005
 */
package org.mikejones.coriolis.tapestry.components;

import org.apache.tapestry.BaseComponent;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.annotations.InjectState;
import org.mikejones.coriolis.tapestry.framework.aso.BlogVisit;

public abstract class Layout extends BaseComponent {

    @InjectState("blogVisit")
    public abstract BlogVisit getBlogVisit();

    public abstract void setIsLoggedIn(boolean isLoggedIn);

    protected void prepareForRender(IRequestCycle cycle) {
        setIsLoggedIn(getPage().getEngine().getInfrastructure().getApplicationStateManager().exists("blogVisit"));        
    }
    


}
