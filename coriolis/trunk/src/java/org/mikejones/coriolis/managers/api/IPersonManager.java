/*
 * Created on 27-Feb-2005
 */
package org.mikejones.coriolis.managers.api;

import org.mikejones.coriolis.om.Person;

public interface IPersonManager { 
    
    public Person getUser(Integer id);
    
    public Person getUser(String username, String password);
    
    public void addUser(Person person);

}
