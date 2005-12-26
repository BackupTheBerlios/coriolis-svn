package org.mikejones.coriolis.managers.impl;

import org.hibernate.Transaction;
import org.mikejones.coriolis.managers.api.BlogManager;
import org.mikejones.coriolis.om.Blog;

public class HibernateBlogManager extends HibernateManager implements BlogManager {

	public void saveBlog(Blog blog) {
		Transaction tx = session.beginTransaction();
		session.save(blog);
		tx.commit();
	}

}
