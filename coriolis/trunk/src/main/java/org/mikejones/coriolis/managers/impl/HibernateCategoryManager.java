package org.mikejones.coriolis.managers.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Transaction;
import org.mikejones.coriolis.managers.api.CategoryManager;
import org.mikejones.coriolis.om.Category;
import org.mikejones.coriolis.om.Post;

public class HibernateCategoryManager extends HibernateManager implements
		CategoryManager {

	@SuppressWarnings("unchecked")
	public List<Category> getCategories() {
		return session.createCriteria(Category.class).list();
	}

	public Category getCategory(Integer id) {
		return (Category) session.get(Category.class, id);
	}

	public Category getCategory(String title) {
		List result = session.createQuery(
				"from Category as cat where cat.title = ?").setString(0, title)
				.list();
		if (result.size() > 0)
			return (Category) result.get(0);

		return null;
	}

	public Category saveCategory(Category category) {
		Transaction t = session.beginTransaction();
		try {
			Object result = session.save(category);
			return getCategory((Integer) result);
		} catch (Exception ex) {
			t.rollback();
			return null;
		}
	}

	public void removeCategoriesFromPost(Post post) {
		for (Category c : post.getCategories()) {
			c.getPosts().remove(post);
			saveCategory(c);
		}
		post.getCategories().clear();
	}

	public void updatePostCategoriesFromList(Post post, String categories) {

		List<Category> toRemove = new ArrayList<Category>();

		// if there nowt there remove everyfink
		if (categories == null) {
			for (Category c : post.getCategories()) {
				toRemove.add(c);
			}
			for (Category c : toRemove) {
				post.removeCategory(c);
			}
			return;
		}

		// get the entered posts
		String[] titles = categories.replace(", ", ",").split(",");

		// of the original categories for this post, find any that have been
		// removed
		for (Category c : post.getCategories()) {
			if (!hasCategoryTitle(c.getTitle(), titles)) {
				toRemove.add(c);
			}
		}

		// remove em
		for (Category c : toRemove) {
			post.removeCategory(c);
		}

		for (String title : titles) {

			// if the post doesnt already contain this category, its a new un
			if (!post.containsCategory(title)) {

				Category c = getCategory(title);

				if (c == null) {// this must be a non existing category

					c = new Category();
					c.setTitle(title);
					c.addPost(post);
					saveCategory(c);

				} else {

					post.addCategory(c);

				}

			}
		}

	}
	
	private boolean hasCategoryTitle(String title, String[] titles) {
		for (String t : titles) {
			if (t.equals(title))
				return true;
		}
		return false;
	}
}