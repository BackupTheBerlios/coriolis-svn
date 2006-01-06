/*
 * created on 03-Jan-2006
 */
package org.mikejones.coriolis.tapestry.components.postcalendar;

import java.util.ArrayList;
import java.util.List;

public class Week {
    
    private List<Day> days = new ArrayList<Day>();

    public List<Day> getDays() {
        return days;
    }

    public void setDays(List<Day> days) {
        this.days = days;
    }
    
    public void addDay(Day day) {
        days.add(day);        
    }

}
