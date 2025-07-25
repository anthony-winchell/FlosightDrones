const backendUrl = 'https://flosightdronesbackend.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('serviceRequestForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const projectTypeValues = Array.from(
      form.querySelectorAll('input[name="projectType"]:checked')
    ).map(cb => cb.value);

    const contactTimeValues = Array.from(
      form.querySelectorAll('input[name="contactTime"]:checked')
    ).map(cb => cb.value);

    const formData = {
      fullName: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      contactMethod: form.contactMethod.value,
      startDate: form.startDate.value,
      projectType: projectTypeValues,
      description: form.description.value,
      location: form.location.value,
      contactTime: contactTimeValues,
      budget: form.budget.value,
    };

    try {
      const res = await fetch('https://flosightdronesbackend.onrender.com/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Submission failed');

      form.style.opacity = '0';
      setTimeout(() => {
        form.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <img src="./assets/check.png" height="100" width="100" alt="Checked Icon" />
            <p style="font-size: 3rem; color: #9200a8;">You're all set! Someone will be in touch soon.</p>
          </div>
        `;
        form.style.opacity = '1';
      }, 500);
    } catch (error) {
      alert('There was a problem submitting the form. Please try again.');
      console.error(error);
    }
  });
});
