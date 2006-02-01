/*
 * Created on 06-Mar-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import java.util.ArrayList;
import java.util.List;

import org.apache.tapestry.annotations.Bean;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.valid.IValidationDelegate;
import org.mikejones.coriolis.managers.api.CategoryManager;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Category;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.SecurePage;
import org.mikejones.coriolis.tapestry.framework.validation.BlogDelegate;

public abstract class EditPost extends SecurePage {

    public abstract void setPostId(Integer id);

    public abstract Integer getPostId();

    public abstract void setPost(Post post);

    public abstract Post getPost();

    @InjectObject("service:coriolis.managers.PostManager")
    public abstract PostManager getPostManager();
    
    @InjectObject("service:coriolis.managers.CategoryManager")
	public abstract CategoryManager getCategoryManager();

    @Bean(BlogDelegate.class)
    public abstract IValidationDelegate getDelegate();

    public String getCategoriesAsList() {
		return getPost().categoriesAsString();
	}
	
	public void setCategoriesAsList(String categoriesAsList) {
		
		Post p = getPost();	
		
		List<Category> toRemove = new ArrayList<Category>();
		
		// if there nowt there remove everyfink
		if (categoriesAsList == null) {
			for (Category c : p.getCategories()) {
				toRemove.add(c);
			}
			for (Category c : toRemove) {
				c.removePost(p);
			}
			return;
		}
		
		// get the entered posts
		String[] titles = categoriesAsList.replace(", ", ",").split(",");
		
		// of the original categories for this post, find any that have been removed
		for (Category c : p.getCategories()) {
			if (!hasCategoryTitle(c.getTitle(), titles)) {
				toRemove.add(c);
			}
		}
		
		// remove em
		for (Category c : toRemove) {
			c.removePost(p);
		}
		
		for (String title : titles) {
			
			// if the post doesnt already contain this category, its a new un
			if (!p.containsCategory(title)) {
			
				Category c = getCategoryManager().getCategory(title);
			
				if (c == null) {// this must be a non existing category
					
					c = new Category();
					c.setTitle(title);
					c.addPost(p);
					getCategoryManager().saveCategory(c);
					
				} else {// already exists, just add it. yeahmon.
					
					p.addCategory(c);
					
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
	
    public void loadPost() {
        Post post = getPostManager().getPost(getPostId());
        setPost(post);
    }

    public String updatePost() {
        if (!getDelegate().isInError()) {
            getPostManager().savePost(getPost());
            return "Home";
        }
        return null;
    }

}
