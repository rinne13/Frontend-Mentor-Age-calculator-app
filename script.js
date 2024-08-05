// Set the maximum value for the year input to the current year
document.getElementById('year').max = new Date().getFullYear();

// General validation function to check if a value is within a range
function isValid(value, min, max) {
  const num = parseInt(value, 10);
  return num >= min && num <= max;
}

// Specific validation functions using the general validation function
function validateDay() {
  const dayInput = document.getElementById('date');
  const dayValue = parseInt(dayInput.value, 10);
  return dayValue >= 1 && dayValue <= 31;
}

function validateMonth() {
  const monthInput = document.getElementById('month');
  const monthValue = parseInt(monthInput.value, 10);
  return monthValue >= 1 && monthValue <= 12;
}

function validateYear() {
  const yearInput = document.getElementById('year');
  const yearValue = parseInt(yearInput.value, 10);
  const currentYear = new Date().getFullYear();
  return yearValue >= 1900 && yearValue <= currentYear;
}

function showError(input, isError) {
  const label = input.parentElement;
  if (isError) {
    input.classList.add('error');
    label.classList.add('error');
  } else {
    input.classList.remove('error');
    label.classList.remove('error');
  }
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

  document.querySelector('.result h1:nth-child(1)').textContent = `${years} years`;
  document.querySelector('.result h1:nth-child(2)').textContent = `${months} months`;
  document.querySelector('.result h1:nth-child(3)').textContent = `${days} days`;
}
// Function to handle displaying errors
function showError(element, show) {
  element.classList.toggle('error', show);
}

// Main function to validate the entire date
function validateDate() {
  const dayInput = document.getElementById('date');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');
  const allError = document.getElementById('allError');

  const isDayValid = validateDay();
  const isMonthValid = validateMonth();
  const isYearValid = validateYear();

  showError(dayInput, !isDayValid);
  showError(monthInput, !isMonthValid);
  showError(yearInput, !isYearValid);

 

  if (isDayValid && isMonthValid && isYearValid) {
    allError.style.display = 'none';
    displayAge();
  } else {
    allError.style.display = 'block';
  }
}

// Event listener for the button click
document.getElementById('calculate-btn').addEventListener('click', function(event) {
  event.preventDefault();
  validateDate();
});

// Event listener for the button click
document.getElementById('calculate-btn').addEventListener('click', function(event) {
  event.preventDefault();
  validateDate();
});
