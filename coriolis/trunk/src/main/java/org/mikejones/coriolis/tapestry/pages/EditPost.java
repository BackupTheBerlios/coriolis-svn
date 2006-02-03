/*
 * Created on 06-Mar-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import java.util.Date;
import java.util.List;

import org.apache.tapestry.annotations.Bean;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.event.PageBeginRenderListener;
import org.apache.tapestry.event.PageEvent;
import org.apache.tapestry.valid.IValidationDelegate;
import org.mikejones.coriolis.managers.api.CategoryManager;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Category;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.framework.SecurePage;
import org.mikejones.coriolis.tapestry.framework.validation.BlogDelegate;

public abstract class EditPost extends SecurePage implements PageBeginRenderListener {

	private boolean _isNew = true;
	
	public abstract Integer getPostId();
    public abstract void setPostId(Integer id);
    
    public abstract Post getPost();
    public abstract void setPost(Post post);

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
		getCategoryManager().updatePostCategoriesFromList(getPost(), categoriesAsList);
	}
	
	public String getCategoriesAsArrayValues() {
		List<Category> categories = getCategoryManager().getCategories();
		String result = "";
		for (int i = 0; i < categories.size(); i++) {
			result += "\"" + categories.get(i).getTitle() + "\"";
			if (i < categories.size() - 1)
				result += ", ";
		}
		return result;
	}
	
	public boolean isNew() {
		return _isNew;
	}
	
	public void setNew(boolean isNew) {
		_isNew = isNew;
	}
	
	public void pageBeginRender(PageEvent pageEvent) {
		if (getPost() == null)
			setPost(new Post());
	}
	
    public void loadPost() {
    		if (getPostId() == null) {
    			setPost(new Post());
    		} else {
    			setNew(false);
	        Post post = getPostManager().getPost(getPostId());
	        setPost(post);
    		}
    }

    public String updatePost() {
        if (!getDelegate().isInError()) {
        		
        		if (isNew())
        			getPost().setPostDate(new Date());
            
        		getPostManager().savePost(getPost());
            return "Home";
        }
        return null;
    }

}
