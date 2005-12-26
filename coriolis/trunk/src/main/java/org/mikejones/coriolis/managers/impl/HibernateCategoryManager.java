package org.mikejones.coriolis.managers.impl;

import java.util.List;

import org.mikejones.coriolis.managers.api.CategoryManager;
import org.mikejones.coriolis.om.Category;

public class HibernateCategoryManager extends HibernateManager implements CategoryManager {

	@SuppressWarnings("unchecked")
	public List<Category> getCategories() {
		return session.createCriteria(Category.class).list();
	}

}
