/*
 * created on 19-Nov-2005
 */
package org.mikejones.coriolis.tapestry.components;

import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.IScript;
import org.apache.tapestry.TapestryUtils;
import org.apache.tapestry.annotations.InjectObject;
import org.apache.tapestry.annotations.InjectScript;
import org.apache.tapestry.annotations.Parameter;
import org.apache.tapestry.form.AbstractFormComponent;
import org.apache.tapestry.form.TranslatedField;
import org.apache.tapestry.form.TranslatedFieldSupport;
import org.apache.tapestry.form.ValidatableFieldSupport;
import org.apache.tapestry.valid.ValidatorException;

public abstract class DojoTextArea extends AbstractFormComponent implements TranslatedField {

    @Parameter(required = true)
    public abstract String getValue();

    public abstract void setValue(String value);

    @Parameter(required = false)
    public abstract String getStyle();

    @Parameter(required = false)
    public abstract String getItems();
    
    @InjectScript("DojoTextArea.script")
    public abstract IScript getDojoScript();

    @InjectObject("service:tapestry.form.ValidatableFieldSupport")
    public abstract ValidatableFieldSupport getValidatableFieldSupport();

    @InjectObject("service:tapestry.form.TranslatedFieldSupport")
    public abstract TranslatedFieldSupport getTranslatedFieldSupport();

    @Override
    protected void renderFormComponent(IMarkupWriter writer, IRequestCycle cycle) {

        String value = getTranslatedFieldSupport().format(this, getValue());
        renderDelegatePrefix(writer, cycle);

        writer.begin("textarea");

        //writer.attribute("class", "dojo-Editor");
        writer.attribute("dojoType", "Editor");

        writer.attribute("name", getName());
        
        if (getItems() != null)
            writer.attribute("items", getItems());

        if (isDisabled())
            writer.attribute("disabled", "disabled");

        if (getStyle() != null)
            writer.attribute("style", getStyle());       

        renderIdAttribute(writer, cycle);

        renderDelegateAttributes(writer, cycle);
        getTranslatedFieldSupport().renderContributions(this, writer, cycle);
        getValidatableFieldSupport().renderContributions(this, writer, cycle);

        renderInformalParameters(writer, cycle);

        if (value != null)
            writer.print(value);

        writer.end();

        renderDelegateSuffix(writer, cycle);

        getDojoScript().execute(cycle, TapestryUtils.getPageRenderSupport(cycle, this), null);

    }

    /**
     * @see org.apache.tapestry.form.AbstractFormComponent#rewindFormComponent(org.apache.tapestry.IMarkupWriter, org.apache.tapestry.IRequestCycle)
     */
    protected void rewindFormComponent(IMarkupWriter writer, IRequestCycle cycle) {
        String value = cycle.getParameter(getName());

        try {
            String text = (String) getTranslatedFieldSupport().parse(this, value);

            getValidatableFieldSupport().validate(this, writer, cycle, text);

            setValue(text);
        } catch (ValidatorException e) {
            getForm().getDelegate().record(e);
        }
    }

    /**
     * @see org.apache.tapestry.form.AbstractFormComponent#isRequired()
     */
    public boolean isRequired() {
        return getValidatableFieldSupport().isRequired(this);
    }

}
