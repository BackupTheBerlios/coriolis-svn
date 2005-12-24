package org.mikejones.coriolis.tapestry.components;

import java.util.List;

import org.apache.tapestry.AbstractComponent;
import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.annotations.InjectObject;
import org.mikejones.coriolis.managers.api.CategoryManager;
import org.mikejones.coriolis.om.Category;

public abstract class CategoryMenu extends AbstractComponent {

	@InjectObject("service:coriolis.managers.CategoryManager")
	public abstract CategoryManager getCategoryManager();
	
	@Override
	protected void renderComponent(IMarkupWriter writer, IRequestCycle cycle) {
		List<Category> categories = getCategoryManager().getCategories();
		
		writer.begin("h3");
		writer.print("Categories");
		writer.end();
		
		writer.begin("ul");
		writer.attribute("class", "subMenu");
		for (int i = 0; i < categories.size(); i++) {
			Category category = categories.get(i);
			writer.begin("li");
			writer.attribute("title", category.getDescription());
			writer.print(category.getTitle());
			writer.print("(" + category.getPosts().size() + ")");
			writer.end();
		}
		writer.end();
		
	}
	
}
