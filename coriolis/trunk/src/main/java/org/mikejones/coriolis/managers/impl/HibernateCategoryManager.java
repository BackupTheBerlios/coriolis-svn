package org.mikejones.coriolis.managers.impl;

import java.util.List;

import org.hibernate.Session;
import org.mikejones.coriolis.managers.api.CategoryManager;
import org.mikejones.coriolis.om.Category;

public class HibernateCategoryManager implements CategoryManager {

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
	    
	@SuppressWarnings("unchecked")
	public List<Category> getCategories() {
		return session.createCriteria(Category.class).list();
	}

}
