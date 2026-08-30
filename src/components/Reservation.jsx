import React, { useState } from 'react';
import '../styles/Reservation.css';
import logoImage from '../assets/patnam_house.jpeg';

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Time slots with available spots
  const timeSlots = [
    { time: '9:00am', spots: 50 },
    { time: '10:00am', spots: 22 },
    { time: '11:00am', spots: 35 },
    { time: '12:00pm', spots: 18 },
    { time: '1:00pm', spots: 8 },
    { time: '2:00pm', spots: 4 },
    { time: '3:00pm', spots: 22 },
    { time: '4:00pm', spots: 30 },
    { time: '5:00pm', spots: 15 },
    { time: '6:00pm', spots: 25 },
    { time: '7:00pm', spots: 12 },
    { time: '8:00pm', spots: 10 },
  ];

  // Get calendar data
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1));
  };

  const handleDateSelect = (day) => {
    const selected = new Date(year, month, day);
    setSelectedDate(selected);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return day === selectedDate.getDate() && 
           month === selectedDate.getMonth() && 
           year === selectedDate.getFullYear();
  };

  const isPastDate = (day) => {
    const today = new Date();
    const checkDate = new Date(year, month, day);
    today.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  return (
    <div className="reservation" id="reservation">
      <div className="reservation__container">
        <h2 className="reservation__title">Reserve Your Table</h2>
        <p className="reservation__subtitle">Group Booking Made Easy</p>

        <div className="reservation__content">
          {/* Calendar Section */}
          <div className="reservation__calendar-section">
            <div className="reservation__calendar">
              {/* Logo */}
              <div className="reservation__logo">
                <img src={logoImage} alt="Patnam House" />
              </div>

              <h3 className="reservation__calendar-title">Group booking</h3>

              {/* Month Navigation */}
              <div className="reservation__month-nav">
                <button 
                  className="reservation__nav-btn reservation__nav-btn--prev"
                  onClick={handlePrevMonth}
                  aria-label="Previous month"
                >
                  ‹
                </button>
                <span className="reservation__month-year">
                  {monthNames[month]} {year}
                </span>
                <button 
                  className="reservation__nav-btn reservation__nav-btn--next"
                  onClick={handleNextMonth}
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>

              {/* Day Names */}
              <div className="reservation__day-names">
                {dayNames.map((day, index) => (
                  <div key={index} className="reservation__day-name">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="reservation__calendar-grid">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="reservation__day reservation__day--empty"></div>
                ))}

                {/* Actual days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const isPast = isPastDate(day);
                  
                  return (
                    <button
                      key={day}
                      className={`reservation__day ${
                        isToday(day) ? 'reservation__day--today' : ''
                      } ${
                        isSelected(day) ? 'reservation__day--selected' : ''
                      } ${
                        isPast ? 'reservation__day--disabled' : ''
                      }`}
                      onClick={() => !isPast && handleDateSelect(day)}
                      disabled={isPast}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="reservation__timeslots-section">
            <div className="reservation__timeslots">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`reservation__timeslot ${
                    selectedTime === slot.time ? 'reservation__timeslot--selected' : ''
                  } ${
                    slot.spots <= 5 ? 'reservation__timeslot--low' : ''
                  }`}
                  onClick={() => handleTimeSelect(slot.time)}
                  disabled={slot.spots === 0}
                >
                  <span className="reservation__time">{slot.time}</span>
                  <span className="reservation__spots">{slot.spots} spots left</span>
                </button>
              ))}
            </div>

            {/* Confirm Button */}
            {selectedDate && selectedTime && (
              <div className="reservation__confirm">
                <button className="reservation__confirm-btn">
                  Confirm Booking
                  <svg className="reservation__confirm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
                <p className="reservation__selected-info">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {selectedTime}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
