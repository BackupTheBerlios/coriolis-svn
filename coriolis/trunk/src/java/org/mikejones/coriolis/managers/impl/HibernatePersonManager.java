/*
 * Created on 09-Mar-2005
 */
package org.mikejones.coriolis.managers.impl;

import org.mikejones.coriolis.hibernate.services.api.ISessionManager;
import org.mikejones.coriolis.managers.api.PersonManager;
import org.mikejones.coriolis.om.Person;

public class HibernatePersonManager implements PersonManager {
    
    private ISessionManager iSessionManager;
    
    public void setSessionManager(ISessionManager iSessionManager) {
        this.iSessionManager = iSessionManager;        
    }

    public Person getUser(Integer id) {
//        Session session = iSessionManager.getSession();
//        return session.load(Person.class, )
        return null;
        
    }

    public Person getUser(String username, String password) {
        // TODO Auto-generated method stub
        return null;
    }

    public void addUser(Person person) {
        // TODO Auto-generated method stub

    }

}
