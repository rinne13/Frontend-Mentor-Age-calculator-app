// Set the maximum value for the year input to the current year
document.getElementById('year').max = new Date().getFullYear();

// General validation function to check if a value is within a range
function isValid(value, min, max) {
  const num = parseInt(value, 10);
  return num >= min && num <= max;
}

// Specific validation functions using the general validation function
function validateDay() {
  return isValid(document.getElementById('date').value, 1, 31);
}

function validateMonth() {
  return isValid(document.getElementById('month').value, 1, 12);
}

function validateYear() {
  const yearInput = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  return isValid(yearInput.value, 1900, currentYear);
}

// Function to handle displaying errors
function showError(element, show) {
  const label = element.parentElement;
  element.classList.toggle('error', show);
  label.classList.toggle('error', show);
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

  document.querySelector('.age-years').textContent = `${years}`;
  document.querySelector('.age-months').textContent = `${months}`;
  document.querySelector('.age-days').textContent = `${days}`;
}

// Event listener for the button click
document.getElementById('calculate-btn').addEventListener('click', function(event) {
  event.preventDefault();
  validateDate();
});

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