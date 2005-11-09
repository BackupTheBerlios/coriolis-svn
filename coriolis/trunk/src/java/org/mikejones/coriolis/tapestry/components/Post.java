/*
 * created on 06-Nov-2005
 */
package org.mikejones.coriolis.tapestry.components;

import java.text.Format;
import java.text.SimpleDateFormat;

import org.apache.tapestry.BaseComponent;
import org.mikejones.coriolis.tapestry.pages.ViewPost;

public class Post extends BaseComponent {
    
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

}
