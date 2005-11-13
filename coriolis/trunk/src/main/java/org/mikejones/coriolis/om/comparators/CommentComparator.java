/*
 * 
 */
package org.mikejones.coriolis.om.comparators;

import java.util.Comparator;

import org.mikejones.coriolis.om.Comment;


/**
 * A comparator for the Comment domain object.
 * Basicaly hibernate uses this class to sort the return comments into date
 * order.
 *
 * @author <a href="mailTo:michael.jones@anite.com">Mike</a>
 */
public class CommentComparator implements Comparator {

    /* (non-Javadoc)
     * @see java.util.Comparator#compare(java.lang.Object, java.lang.Object)
     */
    public int compare(Object comment0, Object comment1) {        
        return ((Comment)comment0).getDate().compareTo(((Comment)comment1).getDate());        
    }

}
