/*
 * created on 23-Jan-2006
 */
package org.mikejones.coriolis.tapestry.components.scriptaculous;

import java.util.HashMap;
import java.util.Map;

import org.apache.tapestry.IMarkupWriter;
import org.apache.tapestry.IRequestCycle;
import org.apache.tapestry.IScript;
import org.apache.tapestry.TapestryUtils;
import org.apache.tapestry.annotations.InjectScript;
import org.apache.tapestry.annotations.Parameter;
import org.apache.tapestry.form.TextField;

public abstract class AutoCompleteTextField extends TextField {

    @InjectScript("AutoCompleteTextField.script")
    public abstract IScript getAutoCompleteScript();
    
    @Parameter(required = true)
    public abstract String getValueString();
    
    @Override
    protected void renderFormComponent(IMarkupWriter writer, IRequestCycle cycle) {
        String value = getTranslatedFieldSupport().format(this, getValue());

        String name = getName();
        String updateId = name + "Update";

        renderDelegatePrefix(writer, cycle);

        writer.beginEmpty("input");

        writer.attribute("type", isHidden() ? "password" : "text");

        writer.attribute("name", name);

        if (isDisabled())
            writer.attribute("disabled", "disabled");

        if (value != null)
            writer.attribute("value", value);

        renderIdAttribute(writer, cycle);

        renderDelegateAttributes(writer, cycle);

        getTranslatedFieldSupport().renderContributions(this, writer, cycle);
        getValidatableFieldSupport().renderContributions(this, writer, cycle);

        renderInformalParameters(writer, cycle);

        writer.closeTag();

        renderDelegateSuffix(writer, cycle);

        writer.begin("div");
        writer.attribute("id", updateId);
//        writer.attribute("style", "display:none;border:1px solid black;background-color:white;");
        writer.attribute("class", "auto_complete");
        writer.end("div");

        Map<String, Object> symbols = new HashMap<String, Object>();
        symbols.put(INPUT_ID, getClientId());
        symbols.put(UPDATE_ID, updateId);
        symbols.put(VALUES_KEY, getValueString());

        getAutoCompleteScript().execute(cycle, TapestryUtils.getPageRenderSupport(cycle, this), symbols);

    }

    private final static String INPUT_ID = "inputId";

    private final static String UPDATE_ID = "updateId";
    
    private final static String VALUES_KEY = "valueString";
}
