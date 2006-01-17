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
    public List<Post> getPostsForMonth(Calendar calendar) {
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);

        Date firstDay = calendar.getTime();
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getMaximum(Calendar.DAY_OF_MONTH));
        Date lastDay = calendar.getTime();

        return postsBetweenDates(firstDay, lastDay);
    }

    protected Date firstMomentOfMonth(Calendar calendar) {
        Calendar copy = (Calendar) calendar.clone();
        copy.set(Calendar.DAY_OF_MONTH, 1);
        copy.set(Calendar.HOUR_OF_DAY, 0);
        copy.set(Calendar.MINUTE, 0);

        return copy.getTime();

    }

    protected Date latMomentOfMonth(Calendar calendar) {
        Calendar copy = (Calendar) calendar.clone();
        copy.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        copy.set(Calendar.HOUR_OF_DAY, calendar.getMaximum(Calendar.HOUR_OF_DAY));
        copy.set(Calendar.MINUTE, calendar.getMaximum(Calendar.MINUTE));
        return copy.getTime();
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

    /*
     *  (non-Javadoc)
     * @see org.mikejones.coriolis.managers.api.PostManager#deletePost(org.mikejones.coriolis.om.Post)
     */
    public void deletePost(Post post) {
        if (post == null)
            throw new NullArgumentException("post");

        Transaction t = session.beginTransaction();
        session.delete(post);
        t.commit();
    }

    /*
     *  (non-Javadoc)
     * @see org.mikejones.coriolis.managers.api.PostManager#getPostForDate(java.util.Date)
     */
    public List<Post> getPostForDate(Date date) {
        Calendar dateStart = Calendar.getInstance();
        dateStart.setTime(date);

        Calendar dateEnd = Calendar.getInstance();
        dateEnd.setTime(date);

        dateEnd.set(Calendar.DAY_OF_MONTH, dateStart.get(Calendar.DAY_OF_MONTH) + 1);

        return postsBetweenDates(dateStart.getTime(), dateEnd.getTime());
    }

    @SuppressWarnings("unchecked")
    protected List<Post> postsBetweenDates(Date dateStart, Date dateEnd) {
        return session.createQuery(
                "from " + Post.class.getName()
                        + " post where post.postDate between :firstDay and :lastDay order by post.postDate desc")
                .setParameter("firstDay", dateStart).setParameter("lastDay", dateEnd).list();

    }

}
