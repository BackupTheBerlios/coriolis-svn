package org.mikejones.coriolis.tapestry.components;

import java.util.List;

import org.apache.tapestry.BaseComponent;
import org.apache.tapestry.IPage;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.event.PageBeginRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.mikejones.coriolis.managers.api.CategoryManager;
import org.mikejones.coriolis.om.Category;
import org.mikejones.coriolis.tapestry.pages.ViewPosts;

public abstract class CategoryMenu extends BaseComponent implements PageBeginRenderListener {

	@InjectObject("service:coriolis.managers.CategoryManager")
	public abstract CategoryManager getCategoryManager();
	
	public abstract List<Category> getCategories();

	public abstract void setCategories(List<Category> categories);
	
	public abstract Category getCategory();
	
	public void pageBeginRender(PageEvent pageEvent) {
		setCategories(getCategoryManager().getCategories());
	}
	
	public IPage viewCategoryPosts(Integer id) {
		ViewPosts page = (ViewPosts)getPage().getRequestCycle().getPage("ViewPosts");
		Category category = getCategoryManager().getCategory(id);
		if (category.getPosts().size() > 0) {
			page.setPosts(category.getPosts());
			return page;
		}
		return null;
	}
}
