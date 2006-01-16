/*
 * created on 12-Jan-2006
 */
package org.mikejones.coriolis.tapestry.framework.services;

import java.util.List;

import org.apache.hivemind.util.Defense;
import org.apache.tapestry.IComponent;

public class AjaxDirectServiceParameter {

    private IComponent component;

    private Object[] serviceParameters;

    public IComponent getComponent() {
        return component;
    }

    public Object[] getServiceParameters() {
        return serviceParameters;
    }

    public AjaxDirectServiceParameter(IComponent component, Object[] serviceParameters) {
        Defense.notNull(component, "component");
        this.component = component;
        this.serviceParameters = serviceParameters;
    }

    public static Object[] constructServiceParameters(Object parameterValue) {
        if (parameterValue == null)
            return null;

        if (parameterValue instanceof Object[])
            return (Object[]) parameterValue;

        if (parameterValue instanceof List) {
            List list = (List) parameterValue;

            return list.toArray();
        }

        return new Object[] { parameterValue };
    }

}
