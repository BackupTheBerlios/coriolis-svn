/*
 * Created on 27-Feb-2005
 */
package org.mikejones.coriolis.managers.impl;

import java.util.ArrayList;
import java.util.List;

import org.mikejones.coriolis.managers.api.PersonManager;
import org.mikejones.coriolis.om.Person;

public class MockPersonManager implements PersonManager {
    
    private static List users;
    
    public MockPersonManager() {
        users = new ArrayList();
        Person person = new Person();
        person.setId(new Integer(1));
        person.setUsername("mik3jon3s");
        person.setPassword("test");        
        users.add(person);        
    }
    
    public Person getUser(Integer id) {
        for(int i =0; i < users.size(); i++) {
            Person person= (Person)users.get(i);
            if(person.getId().equals(id)) {
                return person;
            }            
        }
        return null;
    }

    public void addUser(Person person) {
        users.add(person);

    }

    public Person getUser(String username, String password) {
        for(int i =0; i < users.size(); i++) {
            Person person= (Person)users.get(i);
            if(person.getUsername().equals(username) && person.getPassword().equals(password)) {
                return person;
            }            
        }
        return null;
    }

}
