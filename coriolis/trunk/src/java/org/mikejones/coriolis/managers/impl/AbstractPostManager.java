/*
 * Created on 10-Nov-2005
 * Author adam
 * TODO Insert list of further regular items here
 */
package org.mikejones.coriolis.managers.impl;

import java.util.List;

import org.apache.tapestry.BaseComponent;
import org.apache.tapestry.annotations.InjectPage;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;
import org.mikejones.coriolis.tapestry.pages.EditPost;

public abstract class AbstractPostManager extends BaseComponent implements PostManager  {

    @InjectPage("EditPost")
    public abstract EditPost getEditPostPage();
    
    private List<Post> posts;

    

}
