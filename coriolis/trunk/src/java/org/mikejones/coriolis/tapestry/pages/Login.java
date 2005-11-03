/*
 * Created on 05-Mar-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.hivemind.Registry;
import org.apache.hivemind.servlet.HiveMindFilter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.html.BasePage;
import org.mikejones.coriolis.managers.api.IPersonManager;
import org.mikejones.coriolis.om.Person;
import org.mikejones.coriolis.tapestry.framework.Visit;

public abstract class Login extends BasePage {
    
    public abstract void setMessage(String message);

    public abstract String getUsername();    
    public abstract String getPassword();    
    
    public void login(IRequestCycle cycle) {
        Registry registry = HiveMindFilter.getRegistry(cycle.getRequestContext().getRequest());        
        IPersonManager personManager = (IPersonManager) registry.getService(IPersonManager.class);
        Person person = personManager.getUser(getUsername(),
                getPassword());
        if (person != null) {
            Visit visit = (Visit) cycle.getEngine().getVisit();
            visit.setUser(person);
            cycle.activate("Blog");
        } else {
            setMessage("Incorrect username/passowrd!!");
        }
    }    

}
