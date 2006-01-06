/*
 * created on 10-Nov-2005
 */
package org.mikejones.coriolis.managers.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.NullArgumentException;
import org.hibernate.Transaction;
import org.mikejones.coriolis.managers.api.PostManager;
import org.mikejones.coriolis.om.Post;

public class HibernatePostManager extends HibernateManager implements PostManager {

    /*
     *  (non-Javadoc)
     * @see org.mikejones.coriolis.managers.api.PostManager#getPost(java.lang.Integer)
     */
    public Post getPost(Integer id) {
        return (Post) session.load(Post.class, id);
    }

    /*
     *  (non-Javadoc)
     * @see org.mikejones.coriolis.managers.api.PostManager#getPosts()
     */
    @SuppressWarnings("unchecked")
    public List<Post> getPosts() {
        return session.createQuery("from " + Post.class.getName() + " post order by post.postDate desc").list();
    }

    /*
     *  (non-Javadoc)
     * @see org.mikejones.coriolis.managers.api.PostManager#getPostsForMonth()
     */
    @SuppressWarnings("unchecked")
    public List<Post> getPostsForMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);

        Date firstDay = calendar.getTime();
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getMaximum(Calendar.DAY_OF_MONTH));
        Date lastDay = calendar.getTime();

        return session.createQuery(
                "from " + Post.class.getName()
                        + " post where post.postDate between :firstDay and :lastDay order by post.postDate desc")
                .setParameter("firstDay", firstDay).setParameter("lastDay", lastDay).list();
    }

    /*
     *  (non-Javadoc)
     * @see org.mikejones.coriolis.managers.api.PostManager#savePost(org.mikejones.coriolis.om.Post)
     */
    public void savePost(Post post) {
        Transaction t = session.beginTransaction();
        session.save(post);
        t.commit();
    }

    /*
     *  (non-Javadoc)
     * @see org.mikejones.coriolis.managers.api.PostManager#deletePost(org.mikejones.coriolis.om.Post)
     */
    public void deletePost(Integer id) {
        Post post = getPost(id);
        deletePost(post);

    }

    public void deletePost(Post post) {
        if (post == null)
            throw new NullArgumentException("post");

        Transaction t = session.beginTransaction();
        session.delete(post);
        t.commit();
    }

}
