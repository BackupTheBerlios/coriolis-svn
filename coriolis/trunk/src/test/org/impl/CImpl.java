/*
 * Created on 10-Mar-2005
 */
package org.impl;

import org.A;
import org.B;

public class CImpl implements org.C {

    private A a;

    private B b;

    public void setA(A a) {
        this.a = a;
    }

    public void setB(B b) {
        this.b = b;
    }

    public String getAaa() {
       return a.aye();
    }

    public String getBbb() {
        // TODO Auto-generated method stub
        return b.bee();
    }

}
