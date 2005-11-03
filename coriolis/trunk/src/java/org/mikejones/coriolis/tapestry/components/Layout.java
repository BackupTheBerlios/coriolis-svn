/*
 * Created on 05-Mar-2005
 */
package org.mikejones.coriolis.tapestry.components;

import org.apache.tapestry.BaseComponent;
import org.apache.tapestry.IRequestCycle;
import org.mikejones.coriolis.tapestry.framework.Visit;

public abstract class Layout extends BaseComponent {
    
//    public abstract boolean isUserLoggedIn();
//    
//    public abstract void setUserLoggedIn(boolean userLoggedIn);
//    
//    protected void prepareForRender(IRequestCycle cycle) {
//        super.prepareForRender(cycle);
//        Visit visit = (Visit)getPage().getVisit();
//        setUserLoggedIn(visit.isUserLoggedIn());        
//    }   
    
    public void logout(IRequestCycle cycle) {
        Visit visit = (Visit) cycle.getEngine().getVisit();
        visit.setUser(null);        
        cycle.activate("Blog");
    }  
        
}
