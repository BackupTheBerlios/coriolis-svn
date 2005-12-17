package org.mikejones.coriolis;

import org.hibernate.Transaction;
import org.mikejones.coriolis.om.Category;

public class CategoryTest extends BaseCase {

	public void testSaveCategory() {
		Category category = CategoryHelper.createCategory();
		
		Transaction transaction = session.beginTransaction();
		session.save(category);
		transaction.commit();
		
		Category saved = (Category)session.get(Category.class, category.getId());
		CategoryHelper.assertCategory(saved);
	}
	
	public void testSaveCategoryWithPost() {
		Category category = CategoryHelper.createCategoryWithPost();
		
		Transaction transaction = session.beginTransaction();
		session.save(category);
		transaction.commit();
		
		Category saved = (Category)session.get(Category.class, category.getId());
		CategoryHelper.assertCategoryWithPost(saved);
	}
	
}
