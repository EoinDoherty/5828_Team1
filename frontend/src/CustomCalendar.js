import React, { Component, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
 

const CustomCalendar = (props) => {

  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  };

  function onClickDay(date) {
      console.log("Clicked: " + date);
  }

  function getPost() {
      const calendar = document.getElementById("calendar");
      console.log(calendar.getDate());
  }

  return (
      <div>
        <Calendar id="calendar" onChange={onChange} value={date} onClickDay={onClickDay}/>
      </div>
    );

 }

export default CustomCalendar