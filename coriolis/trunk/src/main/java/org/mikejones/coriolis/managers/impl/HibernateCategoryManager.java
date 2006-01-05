package org.mikejones.coriolis.managers.impl;

import java.util.List;

import org.hibernate.Transaction;
import org.mikejones.coriolis.managers.api.CategoryManager;
import org.mikejones.coriolis.om.Category;

public class HibernateCategoryManager extends HibernateManager implements CategoryManager {

	@SuppressWarnings("unchecked")
	public List<Category> getCategories() {
		return session.createCriteria(Category.class).list();
	}

	public Category getCategory(Integer id) {
		return (Category)session.get(Category.class, id);
	}
	
	public Category getCategory(String title) {
		List result = session.createQuery("from Category as cat where cat.title = ?")
			.setString(0, title)
			.list();
		if (result.size() == 1)
			return (Category)result.get(0);
		
		return null;
	}
	
	public Category saveCategory(Category category) {
		Transaction t = session.beginTransaction();
		try {
			Category result = (Category)session.save(category);
			t.commit();
			return result;
		} catch (Exception ex) {
			t.rollback();
			return null;
		}
	}
}
