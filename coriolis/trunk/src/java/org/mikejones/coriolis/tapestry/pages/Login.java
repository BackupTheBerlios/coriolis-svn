/*
 * Created on 05-Mar-2005
 */
package org.mikejones.coriolis.tapestry.pages;

import org.apache.tapestry.html.BasePage;
import org.mikejones.coriolis.managers.api.PersonManager;

public abstract class Login extends BasePage {

    public abstract PersonManager getPersonManager();

    public String login(String userName, String password) {
        return "Blog";
//        Person person = getPersonManager().getUser(userName, password);
//        if (person != null) {
//            return "Blog";
//        } else {
//            return null;
//        }
    }

}
