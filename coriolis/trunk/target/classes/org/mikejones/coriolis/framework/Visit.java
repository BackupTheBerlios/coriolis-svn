/*
 * Created on 27-Feb-2005
 */
package org.mikejones.coriolis.framework;

import java.io.Serializable;

import org.mikejones.coriolis.om.Person;

public class Visit implements Serializable {

    private static final long serialVersionUID = 3258407314062259257L;
    
    private Person person = null;
    
    /**
     * @return Returns the person.
     */
    public Person getPerson() {
        return person;
    }    
    
    /**
     * @param person The person to set.
     */
    public void setPerson(Person person) {
        this.person = person;
    }    
    
    public boolean isUserLoggedIn() {
        return person != null;
    }    

}
