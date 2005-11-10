/*
 * created on 06-Nov-2005
 */
package org.mikejones.coriolis.tapestry.components;

import java.text.Format;
import java.text.SimpleDateFormat;

import org.apache.tapestry.BaseComponent;
import org.apache.tapestry.annotations.InjectObject;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.tapestry.pages.ViewPost;

public abstract class Post extends BaseComponent {
    
    @InjectObject("service:blog.PostManager")
    public abstract PostManager getPostManager();
    
    private Format dateFormat;

    public Format getDateFormat()
    {
      if (dateFormat == null)
        dateFormat = new SimpleDateFormat("kk':'mm 'on' dd MMMM yyyy");
        
      return dateFormat;
    }
    
    public void viewPost(Integer id) {
        ViewPost page = (ViewPost) getPage().getRequestCycle().getPage("ViewPost");
        page.viewPost(new Integer(id));
    }

    public void editPost(Integer id) {
      getPostManager().editPost(getPage().getRequestCycle(), id);  
    }
}
