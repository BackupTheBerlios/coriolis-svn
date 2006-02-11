/*
 * created on 11-Feb-2006
 */
package org.mikejones.coriolis.tapestry.form;

import org.apache.tapestry.form.IPropertySelectionModel;
import org.mikejones.coriolis.om.SiteStyle;

public class SiteStyleSelectionModel implements IPropertySelectionModel {

    public int getOptionCount() {
        return SiteStyle.values().length;
    }

    public Object getOption(int index) {
        return SiteStyle.values()[index];
    }

    public String getLabel(int index) {
        return SiteStyle.values()[index].name();
    }

    public String getValue(int index) {
        return SiteStyle.values()[index].name();
    }

    public Object translateValue(String value) {
        return SiteStyle.valueOf(value);
    }

}
