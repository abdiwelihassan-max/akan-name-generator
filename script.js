// Weekdays
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// Akan names
const maleNames = ["Kwasi","Kwadwo","Kwabena","Kwaku","Yaw","Kofi","Kwame"];
const femaleNames = ["Akosua","Adwoa","Abenaa","Akua","Yaa","Afua","Ama"];


// Leap year check
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}


// Days in a month
function getDaysInMonth(month, year) {
  const daysInMonths = {
    1: 31,
    2: isLeapYear(year) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  };
  return daysInMonths[month];
}


// Validate date
function isValidDate(day, month, year, gender) {

  if (!day || !month || !year) {
    alert("Please enter a valid date");
    return false;
  }

  if (!gender) {
    alert("Please select your gender");
    return false;
  }

  if (month < 1 || month > 12) {
    alert("Enter a valid month");
    return false;
  }

  const maxDays = getDaysInMonth(month, year);

  if (day < 1 || day > maxDays) {
    alert("Enter a valid day");
    return false;
  }

  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    alert("Enter a valid year");
    return false;
  }

  return true;
}


// Zeller's Congruence (corrected)
function calculateDay(CC, YY, MM, DD) {
  const term1 = Math.floor(CC / 4) - 2 * CC - 1;
  const term2 = Math.floor((5 * YY) / 4);
  const term3 = Math.floor((26 * (MM + 1)) / 10);

  let d = (term1 + term2 + term3 + DD) % 7;
  return d < 0 ? d + 7 : d;
}


// Main function
function getAkanName() {

  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);
  const gender = document.getElementById("gender").value;

  if (!isValidDate(day, month, year, gender)) return;

  // Month correction for Zeller
  let m = month;
  let y = year;

  if (m < 3) {
    m += 12;
    y -= 1;
  }

  const CC = Math.floor(y / 100);
  const YY = y % 100;

  const dayIndex = calculateDay(CC, YY, m, day);
  const akanName = gender === "male" ? maleNames[dayIndex] : femaleNames[dayIndex];

  document.getElementById("result").innerHTML = `
    <h2>Your Akan Name is ${akanName}</h2>
    <p>You were born on ${days[dayIndex]}</p>
  `;
}


