package org.mikejones.coriolis;

import org.hibernate.Transaction;
import org.mikejones.coriolis.om.Category;
import org.mikejones.coriolis.om.Post;

import com.sun.tools.javac.tree.Tree.Assert;

public class CategoryTest extends BaseCase {

	public void testSaveCategory() {
		Category category = CategoryHelper.createCategory();
		
		save(category);
		
		Category saved = (Category)session.get(Category.class, category.getId());
		CategoryHelper.assertCategory(saved);
	}
	
	public void testSaveCategoryWithPost() {
		Category category = CategoryHelper.createCategoryWithPost();
		save(category);		
		Category saved = (Category)session.get(Category.class, category.getId());
		CategoryHelper.assertCategoryWithPost(saved);
	}
	
	private void save(Object object) {
		Transaction transaction = session.beginTransaction();
		session.save(object);
		transaction.commit();
	}
	
}
