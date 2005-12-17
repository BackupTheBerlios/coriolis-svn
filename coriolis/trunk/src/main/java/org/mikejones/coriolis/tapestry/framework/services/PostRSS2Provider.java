/*
 * created on 17-Dec-2005
 */
package org.mikejones.coriolis.tapestry.framework.service;

import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;

/**
 * A class to write out the post rss
 * 
 * @author <a href="mailTo:michael.jones@anite.com">Mike</a>
 */
public class PostRSS2Provider implements RSSProvider {

    public PostManager postManager;

    /**
     * injected
     * @return
     */
    public PostManager getPostManager() {
        return postManager;
    }

    /**
     * injected
     * @param postManager
     */
    public void setPostManager(PostManager postManager) {
        this.postManager = postManager;
    }

    /* (non-Javadoc)
     * @see org.mikejones.coriolis.tapestry.framework.service.RSSProvider#getRSS()
     */
    public String getRSS() {
        Document document = DocumentHelper.createDocument();

        Element rss = document.addElement("rss");
        rss.addAttribute("version", "2.0");
        Element channel = rss.addElement("channel");
        channel.addElement("title").addText("title");
        channel.addElement("link").addText("link");

        List<Post> posts = postManager.getPosts();

        for (Post post : posts) {
            writePostItem(channel, post);
        }

        return document.asXML();
    }

    /**
     * TODO write test for this
     * Convert a post to a rss item
     * @param channel
     * @param post
     */
    protected void writePostItem(Element channel, Post post) {
        Element item = channel.addElement("item");
        item.addElement("title").setText(post.getTitle());
        
        item.addElement("link").setText(this.linkToPost(post));

        // TODO stip out the html stuff
        item.addElement("description").setText(post.getText());

        // TODO prob need a format for that
        item.addElement("pubDate").setText(post.getPostDate().toString());
        // item.addElement("guid").setText(post.getId().toString());

    }
    
    
    /**
     * TODO write test for this
     * @param post
     * @return
     */
    protected String linkToPost(Post post) {
        return "http://localhost/myapp?service=external&context=ViewPost&sp="+post.getId();
    }

}
