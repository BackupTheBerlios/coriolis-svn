/*
 * created on 09-Feb-2006
 */
package org.mikejones.coriolis.managers.impl;

import org.mikejones.coriolis.managers.api.BlogManager;
import org.mikejones.coriolis.om.Blog;

public class MockBlogManager implements BlogManager {
    
    private static Blog blog;

    public void saveBlog(Blog blog) {
        // TODO Auto-generated method stub
        
    }

    public Blog loadBlog() {
        if(blog ==null) { 
            blog = new Blog();
            blog.setTitle("[change in admin]");            
        }
        return blog;
        
    }

}
