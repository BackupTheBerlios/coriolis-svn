/*
 * Created on 09-Mar-2005
 */
package org.mikejones.coriolis.hibernate.services.api;

import net.sf.hibernate.Session;

public interface ISessionManager {
    
    /**
     * Get the session 
     * @return
     */
    public Session getSession();
    
    /**
     * Close the session
     *
     */
    public void closeSession();
    
    /**
     * Begin a transaction
     *
     */
    public void beginTransaction();
    
    /**
     * Commit the transaction and handle the errors
     *
     */
    public void commitTransaction();
    
    /**
     * Called from other methods to roll back the transaction 
     * when a hibernate exception is thrown.
     *
     */
    public void rollbackTransaction();

}
