/*
 * Created on 05-Mar-2005
 */
package org.mikejones.coriolis.pages;

import org.apache.hivemind.Registry;
import org.apache.hivemind.servlet.HiveMindFilter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.html.BasePage;
import org.mikejones.coriolis.framework.Visit;
import org.mikejones.coriolis.managers.api.IPersonManager;
import org.mikejones.coriolis.om.Person;

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
            visit.setPerson(person);
            cycle.activate("Blog");
        } else {
            setMessage("Incorrect username/passowrd!!");
        }
    }    

}
