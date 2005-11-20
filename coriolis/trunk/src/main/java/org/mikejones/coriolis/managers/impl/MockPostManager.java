/*
 * Created on 25-Feb-2005
 */
package org.mikejones.coriolis.managers.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike </a>
 */
public class MockPostManager implements PostManager {
    
    private List<Post> posts;

    public MockPostManager() {
        posts = new ArrayList<Post>();
        Post post = new Post();
        post.setPostId(new Integer(0));
        post.setTitle("This is an examplte Title");
        post
                .setText("here is some really long text for a message.It will be much longer that this, I really should be able to put html"
                        + "in here too... but how am I going to deal with that.. it will be CRAZY.");
        post.setPostDate(new Date());
        posts.add(post);        

        post = new Post();
        post.setPostId(new Integer(1));
        post.setTitle("created prog title");
        post.setText("post text taht is a little longs");
        post.setPostDate(new Date());
        posts.add(post);

    }

    /*
     * (non-Javadoc)
     * 
     * @see org.mikejones.coriolis.managers.api.IPostManager#getPost(int)
     */
    public Post getPost(int index) {
        return posts.get(index);
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.mikejones.coriolis.managers.api.IPostManager#getPost(java.lang.Integer)
     */
    public Post getPost(Integer id) {
        for (int i = 0; i < posts.size(); i++) {
            Post post = posts.get(i);
            if (post.getPostId().equals(id)) {
                return post;
            }
        }
        return null;
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.mikejones.coriolis.managers.api.IPostManager#getPosts()
     */
    public List<Post> getPosts() {
        return posts;
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.mikejones.coriolis.managers.api.IPostManager#addPost(org.mikejones.coriolis.om.Post)
     */
    public void addPost(Post post) {
        post.setPostId(posts.size());
        posts.add(post);
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.mikejones.coriolis.managers.api.IPostManager#removePost(org.mikejones.coriolis.om.Post)
     */
    public void removePost(Post post) {
        for (int i = 0; i < posts.size(); i++) {
            Post loopPost = posts.get(i);
            if (loopPost.getPostId().equals(post.getPostId())) {
                posts.remove(i);
                return;
            }
        }
    }

    public void removePost(Integer id) {
        for (int i = 0; i < posts.size(); i++) {
            Post post = posts.get(i);
            if (post.getPostId().equals(id)) {
                posts.remove(i);
                return;
            }
        }
    }

    public void saveOrUpdate(Post post) {
        for (int i = 0; i < posts.size(); i++) {
            Post localPost = posts.get(i);
            if (localPost.getPostId().equals(post.getPostId())) {
                localPost.setTitle(post.getTitle());
                localPost.setText(post.getText());
            }
        }   
    }    

}