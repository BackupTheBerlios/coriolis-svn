/*
 * created on 11-Jan-2006
 */
package org.mikejones.coriolis.tapestry.components.postcalendar;

import java.util.Calendar;
import java.util.Date;

public class CalendarConfig {

    /**
     * The number of the month 
     */
    private int month;

    /**
     * The year this calendar config is for
     */
    private int year;

    /**
     * The number of days in the month
     */
    private int daysInMonth;

    /**
     * The number of weeks in the month
     */
    private int weeksInMonth;

    /**
     * The day of the week this date is 
     */
    private int dayOfWeek;

    /**
     * The number of the date in teh month 
     */
    private int today;

    /**
     * The number to represent the first day (eg mon-sun) in the currnet month
     */
    private int firstDayOfMonth;

    public int getMonth() {
        return month;
    }

    public int getYear() {
        return year;
    }

    public int getDayOfWeek() {
        return dayOfWeek;
    }

    public int getDaysInMonth() {
        return daysInMonth;
    }

    public int getFirstDayOfMonth() {
        return firstDayOfMonth;
    }

    public int getToday() {
        return today;
    }

    public int getWeeksInMonth() {
        return weeksInMonth;
    }

    private Calendar calendar;

    public CalendarConfig(Calendar calendar) {
        this.calendar = calendar;
        this.firstDayOfMonth = firstDayOfMonth(calendar);
        this.dayOfWeek = calendar.get(Calendar.DAY_OF_MONTH);
        this.daysInMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
        this.weeksInMonth = numberOfWeeks(firstDayOfMonth, daysInMonth);
        this.today = calendar.get(Calendar.DAY_OF_MONTH);
        this.year = calendar.get(Calendar.YEAR);
        this.month = calendar.get(Calendar.MONTH);
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
