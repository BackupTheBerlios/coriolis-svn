/*
 * Created on 25-Feb-2005
 */
package org.mikejones.coriolis.managers.impl;

import java.util.ArrayList;
import java.util.List;

import org.mikejones.coriolis.managers.api.IPostManager;
import org.mikejones.coriolis.om.Post;

/**
 * @author <a href="mailTo:michael.daniel.jones@gmail.com" >mike </a>
 */
public class TestPostManager implements IPostManager {

    private List posts;

    //private static IPostManager instance;

    public TestPostManager() {
        posts = new ArrayList();
        Post post = new Post();
        post.setId(new Integer(1));
        post.setTitle("This is an examplte Title");
        post
                .setText("here is some really long text for a message.It will be much longer that this, I really should be able to put html"
                        + "in here too... but how am I going to deal with that.. it will be CRAZY.");
        posts.add(post);

        post = new Post();
        post.setId(new Integer(2));
        post.setTitle("created prog title");
        post.setText("post text taht is a little longs");
        posts.add(post);

    }

//    public static IPostManager getInstance() {
//        if (instance == null) {
//            instance = new TestPostManager();
//        }
//        return instance;
//    }

    /*
     * (non-Javadoc)
     * 
     * @see org.mikejones.coriolis.managers.api.IPostManager#getPost(int)
     */
    public Post getPost(int index) {
        return (Post) posts.get(index);
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.mikejones.coriolis.managers.api.IPostManager#getPost(java.lang.Integer)
     */
    public Post getPost(Integer id) {
        for (int i = 0; i < posts.size(); i++) {
            Post post = (Post) posts.get(i);
            if (post.getId().equals(id)) {
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
    public List getPosts() {
        return posts;
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.mikejones.coriolis.managers.api.IPostManager#addPost(org.mikejones.coriolis.om.Post)
     */
    public void addPost(Post post) {
        posts.add(post);
    }

    /*
     * (non-Javadoc)
     * 
     * @see org.mikejones.coriolis.managers.api.IPostManager#removePost(org.mikejones.coriolis.om.Post)
     */
    public void removePost(Post post) {
        for (int i = 0; i < posts.size(); i++) {
            Post loopPost = (Post) posts.get(i);
            if (loopPost.getId().equals(post.getId())) {
                posts.remove(i);
                return;
            }
        }
    }

    public void removePost(Integer id) {
        for (int i = 0; i < posts.size(); i++) {
            Post post = (Post) posts.get(i);
            if (post.getId().equals(id)) {
                posts.remove(i);
                return;
            }
        }
    }

    public void saveOrUpdate(Post post) {
        for (int i = 0; i < posts.size(); i++) {
            Post localPost = (Post) posts.get(i);
            if (localPost.getId().equals(post.getId())) {
                localPost.setTitle(post.getTitle());
                localPost.setText(post.getText());
            }
        }
        
        
    }
}
