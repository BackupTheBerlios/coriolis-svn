/*
 * created on 11-Jan-2006
 */
package org.mikejones.coriolis.tapestry.components.postcalendar;

import java.util.Calendar;
import java.util.Date;

public class CalendarConfig {
    
    private int month;
    
    private int year;
    
    private int daysInMonth;
    
    private int weeksInMonth;
    
    private int dayOfWeek;
    
    private int today;
    
    private int firstDayOfMonth;

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(int dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public int getDaysInMonth() {
        return daysInMonth;
    }

    public void setDaysInMonth(int daysInMonth) {
        this.daysInMonth = daysInMonth;
    }

    public int getFirstDayOfMonth() {
        return firstDayOfMonth;
    }

    public void setFirstDayOfMonth(int firstDayOfMonth) {
        this.firstDayOfMonth = firstDayOfMonth;
    }

    public int getToday() {
        return today;
    }

    public void setToday(int today) {
        this.today = today;
    }

    public int getWeeksInMonth() {
        return weeksInMonth;
    }

    public void setWeeksInMonth(int weeksInMonth) {
        this.weeksInMonth = weeksInMonth;
    }
    
    private Calendar calendar;
    
    

    public CalendarConfig(Calendar calendar) {
        this.calendar = calendar;
        setFirstDayOfMonth(firstDayOfMonth(calendar));
        setDayOfWeek(calendar.get(Calendar.DAY_OF_MONTH));
        setDaysInMonth(calendar.getMaximum(Calendar.DAY_OF_MONTH));
        setWeeksInMonth(numberOfWeeks(firstDayOfMonth,daysInMonth));
        setToday(calendar.get(Calendar.DAY_OF_MONTH));
        setYear(calendar.get(Calendar.YEAR));
        setMonth(calendar.get(Calendar.MONTH));
        
    }
    
    
    private int firstDayOfMonth(Calendar calendar) {        
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        return calendar.get(Calendar.DAY_OF_WEEK);
    }

    private int numberOfWeeks(int firstDayOfMonth, int daysInMonth) {
        int totalDays = daysInMonth + firstDayOfMonth + 1;
        totalDays += (totalDays % 7);
        return totalDays / 7;
    }
    
    public Date createDate(int day) {      
        
        return createCalendar(day).getTime();
        
    }
    public Calendar createCalendar(int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month);
        calendar.set(Calendar.DAY_OF_MONTH, day);
        
        return calendar;
        
    }
    
    public Calendar getCalendar() {
        
        return (Calendar) this.calendar.clone();
    }

}
