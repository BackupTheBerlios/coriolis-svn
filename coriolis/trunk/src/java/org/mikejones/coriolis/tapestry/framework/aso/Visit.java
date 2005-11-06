/*
 * Created on 27-Feb-2005
 */
package org.mikejones.coriolis.tapestry.framework.aso;

import java.io.Serializable;

import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.SessionStoreOptimized;
import org.mikejones.coriolis.managers.api.PersonManager;
import org.mikejones.coriolis.om.Person;
import org.mikejones.coriolis.tapestry.framework.BlogEngine;

public class Visit implements Serializable, SessionStoreOptimized {

    private static final long serialVersionUID = 3258407314062259257L;

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

    /*
     *  (non-Javadoc)
     * @see org.apache.tapestry.SessionStoreOptimized#isStoreToSessionNeeded()
     */
    public boolean isStoreToSessionNeeded() {
        return isUserLoggedIn();
    }

}
