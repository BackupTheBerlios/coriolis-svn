package org.mikejones.coriolis.managers.api;

import java.util.List;

import org.mikejones.coriolis.om.Category;

public interface CategoryManager {

	public List<Category> getCategories();
	public Category getCategory(Integer id);
	public Category getCategory(String title);
	public Category saveCategory(Category category);
}
