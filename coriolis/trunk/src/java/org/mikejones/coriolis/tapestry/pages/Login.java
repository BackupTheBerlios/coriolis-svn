/*
 * Created on 05-Mar-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.tapestry.IPage;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.InjectState;
import org.apache.tapestry.html.BasePage;
import org.mikejones.coriolis.managers.api.PersonManager;
import org.mikejones.coriolis.om.Person;
import org.mikejones.coriolis.tapestry.framework.aso.BlogVisit;

public abstract class Login extends BasePage {

    @InjectObject("service:blog.PersonManager")
    public abstract PersonManager getPersonManager();
    
    @InjectState("blogVisit")
    public abstract BlogVisit getBlogVisit();
    
    public abstract String getUsername();
    
    public abstract String getPassword();

    public IPage login() {
        Person person = getPersonManager().getUser(getUsername(), getPassword());
        if(person == null) {
            return null;
        } else {
            BlogVisit blogVisit = getBlogVisit();
            blogVisit.setUser(person);
            
            return getRequestCycle().getPage("Home");

        }
    }

}
