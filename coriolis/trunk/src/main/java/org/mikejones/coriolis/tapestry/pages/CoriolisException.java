/*
 * created on 31-Jan-2006
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.tapestry.html.BasePage;

public abstract class CoriolisException extends BasePage {
    
    public abstract Exception getException();

}
