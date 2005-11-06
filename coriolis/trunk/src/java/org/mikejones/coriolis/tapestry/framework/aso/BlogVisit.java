/*
 * Created on 27-Feb-2005
 */
package org.mikejones.coriolis.tapestry.framework.aso;

import java.io.Serializable;

import org.apache.tapestry.IRequestCycle;
import org.mikejones.coriolis.managers.api.PersonManager;
import org.mikejones.coriolis.om.Person;
import org.mikejones.coriolis.tapestry.framework.BlogEngine;

public class BlogVisit implements Serializable {    

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    private transient Person user = null;

    private Integer userId;

    /**
     * @return Returns the person.
     */
    public Person getUser(IRequestCycle cycle) {
        if (user != null) {
            return user;
        }
        if (userId == null) {
            return null;
        }
        BlogEngine engine = (BlogEngine) cycle.getEngine();
        PersonManager personManager = (PersonManager) engine.getRegistry(cycle).getService(
                PersonManager.class);
        return personManager.getUser(userId);        
    }

    /**
     * @param person
     *            The person to set.
     */
    public void setUser(Person person) {
        this.user = person;
        if(user==null) {
            userId = null;
            return;
        }
        userId = user.getId();
    }

    public boolean isUserLoggedIn() {
        return userId != null;
    }

   

}
