/*
 * Created on 09-Mar-2005
 */
package org.mikejones.coriolis.hibernate.services.api;

import net.sf.hibernate.Session;

public interface ISessionManager {
    
    public Session getSession();
    
    public void closeSession();
    
    public void beginTransaction();
    
    public void commitTransaction();
    
    public void rollbackTransaction();

}
