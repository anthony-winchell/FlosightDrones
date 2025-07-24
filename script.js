const { createClient } = supabase;
const supabaseUrl = 'https://asyqeocahphppyxnawkl.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzeXFlb2NhaHBocHB5eG5hd2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNjEwNzIsImV4cCI6MjA2ODczNzA3Mn0.DxDjjxeN8029aXy-mAtfVegnDz2ln4ZkovHDyTtSFjM'; // replace with your actual anon key
const supabaseClient = createClient(supabaseUrl, supabaseKey);

//form submission handler

const form = document.getElementById('serviceRequestForm');
const formSection = document.getElementById('formSection');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const projectTypeValues = Array.from(
    form.querySelectorAll('input[name="projectType"]:checked')
  ).map(checkbox => checkbox.value).join(', ');

  const formData = {
    fullName: form.fullName.value,
    email: form.email.value,
    phone: form.phone.value,
    contactMethod: form.contactMethod.value,
    startDate: form.startDate.value,
    projectType: projectTypeValues, 
    description: form.description.value,
    location: form.location.value,
    contactTime: form.contactTime.value,
    budget: form.budget.value,
  };

  console.log('Submitting form data:', formData);

  const { data, error } = await supabaseClient
    .from('FloSightRequests')
    .insert([formData]);

  console.log('Response:', { data, error });

  if (error) {
    console.error('Error inserting data:', error);
    alert('Failed to submit your request. Please try again.');
  } else {
    alert('Request submitted successfully!');
    form.reset();
  }
});

//set the default value for the start date to today
 document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = today;
   });