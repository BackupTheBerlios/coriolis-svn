/*
 * Created on 27-Feb-2005
 */
package org.mikejones.coriolis.om;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.TemporalType;
/**
 * 
 * 
 * @author <a href="mailto:michael.daniel.jones@gmail.com">michael.jones</a>
 */
@Entity
public class Person {

    private Integer id;

    private String username;

    private String email;

    private String password;

    private Date lastLoggedIn;

    /**
     * @return Returns the id.
     */
    @Id
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     *            The id to set.
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return Returns the email.
     */
    public String getEmail() {
        return email;
    }

    /**
     * @return Returns the lastLoggedIn.
     */
    public Date getLastLoggedIn() {
        return lastLoggedIn;
    }

    /**
     * @return Returns the password.
     */
    public String getPassword() {
        return password;
    }

    /**
     * @return Returns the username.
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param email
     *            The email to set.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @param lastLoggedIn
     *            The lastLoggedIn to set.
     */
    @Basic (temporalType = TemporalType.TIME)
    public void setLastLoggedIn(Date lastLoggedIn) {
        this.lastLoggedIn = lastLoggedIn;
    }

    /**
     * @param password
     *            The password to set.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @param username
     *            The username to set.
     */
    public void setUsername(String username) {
        this.username = username;
    }

}
