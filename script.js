const backendUrl = 'https://flosightdronesbackend.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  // format the phone number input
  const phoneInput = document.getElementById("phone");

  phoneInput.addEventListener("input", function () {
    let numbers = this.value.replace(/\D/g, "").slice(0, 10);
    let formatted = numbers;

    if (numbers.length > 6) {
      formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    } else if (numbers.length > 3) {
      formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else if (numbers.length > 0) {
      formatted = `(${numbers}`;
    }

    this.value = formatted;
  });

  // format budget input
  const budgetInput = document.getElementById("budget");
  budgetInput.addEventListener("input", function () {
    const raw = this.value.replace(/[^\d]/g, "");
    if (raw === "") {
      this.value = "";
      return;
    }
    this.value = `$${parseInt(raw, 10).toLocaleString()}`;
  });

  // handle form submission
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
      fullName: form.fullName.value || "",
      email: form.email.value || "",
      phone: form.phone.value || "",
      contactMethod: form.contactMethod.value || "",
      startDate: form.startDate.value || null,
      projectType: projectTypeValues.length ? projectTypeValues : null,
      description: form.description.value || "",
      location: form.location.value || "",
      contactTime: contactTimeValues.length ? contactTimeValues : null,
      budget: form.budget.value || ""
    };

    try {
      const res = await fetch(`${backendUrl}/submit-form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Submission failed: ${errText}`);
      }

      // success message
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
      console.error('Form submission error:', error);
    }
  });
});
