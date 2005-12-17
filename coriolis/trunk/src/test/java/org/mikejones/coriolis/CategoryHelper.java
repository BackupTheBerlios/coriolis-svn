package org.mikejones.coriolis;

import org.mikejones.coriolis.om.*;

import junit.framework.TestCase;

public class CategoryHelper extends TestCase {

	private static final String CATEGORY_TITLE = "title";
	private static final String CATEGORY_DESCRIPTION = "description";
	
	public static Category createCategory() {
    	Category result = new Category();
    	result.setTitle(CATEGORY_TITLE);
    	result.setDescription(CATEGORY_DESCRIPTION);
    	return result;
    }
	
	public static void assertCategory(Category category) {
		assertEquals(CATEGORY_TITLE, category.getTitle());
    	assertEquals(CATEGORY_DESCRIPTION, category.getDescription());
	}
	
	
}
