// Set the maximum value for the year input to the current year
document.getElementById('year').max = new Date().getFullYear();

// General validation function to check if a value is within a range
function isValid(value, min, max) {
  return value >= min && value <= max;
}

// Function to check if a year is a leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Function to get the number of days in a month
function getDaysInMonth(month, year) {
  switch (month) {
    case 2: // February
      return isLeapYear(year) ? 29 : 28;
    case 4: case 6: case 9: case 11: // April, June, September, November
      return 30;
    default: // January, March, May, July, August, October, December
      return 31;
  }
}

// Specific validation functions using the general validation function
function validateDay() {
  const dayInput = document.getElementById('date');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');
  const dayValue = parseInt(dayInput.value, 10);
  const monthValue = parseInt(monthInput.value, 10);
  const yearValue = parseInt(yearInput.value, 10);
  const daysInMonth = getDaysInMonth(monthValue, yearValue);
  return isValid(dayValue, 1, daysInMonth);
}

function validateMonth() {
  const monthInput = document.getElementById('month');
  const monthValue = parseInt(monthInput.value, 10);
  return isValid(monthValue, 1, 12);
}

function validateYear() {
  const yearInput = document.getElementById('year');
  const yearValue = parseInt(yearInput.value, 10);
  const currentYear = new Date().getFullYear();
  
  // Validate that the year is between 1900 and the current year
  return isValid(yearValue, 1900, currentYear);
}
function isFutureDate(day, month, year) {
  const today = new Date();
  const inputDate = new Date(year, month - 1, day);
  return today > inputDate;
}

// Function to calculate the age
function calculateAge(day, month, year) {
  const birthDate = new Date(year, month - 1, day); // Months are 0-based in JavaScript
  const today = new Date();
  
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  return { years: ageYears, months: ageMonths, days: ageDays };
}

// Function to display the results
function displayAge() {
  const dayInput = document.getElementById('date').value;
  const monthInput = document.getElementById('month').value;
  const yearInput = document.getElementById('year').value;

  const { years, months, days } = calculateAge(dayInput, monthInput, yearInput);

  document.querySelector('.result .age-years').textContent = years;
  document.querySelector('.result .age-months').textContent = months;
  document.querySelector('.result .age-days').textContent = days;
}

// Function to handle displaying errors
function showError(input, emptyError, invalidError) {
  const emptyMessage = input.parentElement.querySelector('.error-message.empty-input');
  const invalidMessage = input.parentElement.querySelector('.error-message.invalid-date');

  emptyMessage.style.display = emptyError ? 'block' : 'none';
  invalidMessage.style.display = invalidError ? 'block' : 'none';

  input.classList.toggle('error', emptyError || invalidError);
}

// Main function to validate the entire date
function validateDate() {
  const dayInput = document.getElementById('date');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');

  const isDayValid = validateDay();
  const isMonthValid = validateMonth();
  const isYearValid = validateYear();
  const isDayInFuture = isFutureDate(dayInput.value, monthInput.value, yearInput.value);

  showError(dayInput, !dayInput.value, !isDayValid && dayInput.value);
  showError(monthInput, !monthInput.value, !isMonthValid && monthInput.value);
  showError(yearInput, !yearInput.value, (!isYearValid || !isDayInFuture) && yearInput.value);

  if (isDayValid && isMonthValid && isYearValid && isDayInFuture && dayInput.value && monthInput.value && yearInput.value) {
    displayAge();
  }
}

// Event listener for the button click
document.getElementById('calculate-btn').addEventListener('click', function(event) {
  event.preventDefault();
  validateDate();
});
