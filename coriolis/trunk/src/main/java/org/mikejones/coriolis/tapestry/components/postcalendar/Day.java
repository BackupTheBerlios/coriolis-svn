/*
 * created on 03-Jan-2006
 */
package org.mikejones.coriolis.tapestry.components.postcalendar;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class Day {

    public static SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

    private Calendar day;

    private boolean isToday = false;

    private boolean hasPost = false;

    public boolean isHasPost() {
        return hasPost;
    }

    public void setHasPost(boolean hasPost) {
        this.hasPost = hasPost;
    }

    public boolean isToday() {
        return isToday;
    }

    public void setToday(boolean isToday) {
        this.isToday = isToday;
    }

    public Calendar getDay() {
        return day;
    }

    public void setDay(Calendar day) {
        this.day = day;

    }

    public String dayNumber() {
        if (day == null)
            return "";
        else
            return day.get(Calendar.DAY_OF_MONTH)+"";
    }

    public String dayMonthYear() {
        return dateFormat.format(day.getTime());

    }
    
    public String getDayClass() {
        if(day == null)
            return "empty";
        else if (isToday)
            return "day current";
        else 
            return "day";
        
    }

}
