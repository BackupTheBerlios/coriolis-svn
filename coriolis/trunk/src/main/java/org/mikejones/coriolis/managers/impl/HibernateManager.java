package org.mikejones.coriolis.managers.impl;

import org.hibernate.Session;

public abstract class HibernateManager {

	public Session session;
    
    /**
     * Get the injected session
     * @return
     */
    public Session getSession() {
        return session;
    }

    /**
     * Method to inject the session
     * @param session
     */
    public void setSession(Session session) {
        this.session = session;
    }
	
}
