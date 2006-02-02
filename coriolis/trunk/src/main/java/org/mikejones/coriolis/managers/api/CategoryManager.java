package org.mikejones.coriolis.managers.api;

import java.util.List;

import org.mikejones.coriolis.om.Category;
import org.mikejones.coriolis.om.Post;

public interface CategoryManager {

	/**
	 * gets all the categories in the system
	 * @return
	 */
	public List<Category> getCategories();
	
	/**
	 * get a category by id
	 * @param id
	 * @return
	 */
	public Category getCategory(Integer id);
	
	/**
	 * get a category by its title
	 * @param title
	 * @return
	 */
	public Category getCategory(String title);
	
	/**
	 * save a category
	 * @param category
	 * @return
	 */
	public Category saveCategory(Category category);
	
	/**
     * Deletes all categories from a post and saves
     * @param post
     */
    public void removeCategoriesFromPost(Post post);
    
    /**
     * Takes a comma separated list of category titles and updates
     * the posts' category list to reflect them.
     * @param post
     * @param categories
     */
    public void updatePostCategoriesFromList(Post post, String categories);
    
}
