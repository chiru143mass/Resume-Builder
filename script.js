// Multi-Step Form Navigation
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const progress = document.getElementById('progress');
let currentStep = 0;

nextBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    steps[currentStep].classList.remove('active');
    currentStep++;
    steps[currentStep].classList.add('active');
    progress.style.width = `${(currentStep + 1) / steps.length * 100}%`;
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    steps[currentStep].classList.remove('active');
    currentStep--;
    steps[currentStep].classList.add('active');
    progress.style.width = `${(currentStep + 1) / steps.length * 100}%`;
  });
});

// Drag-and-Drop for Profile Image
const dragDropArea = document.getElementById('dragDropArea');
const profileImgInput = document.getElementById('profileImg');

dragDropArea.addEventListener('click', () => profileImgInput.click());
profileImgInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      dragDropArea.innerHTML = `<img src="${reader.result}" alt="Profile Image">`;
    };
    reader.readAsDataURL(file);
  }
});
// Feature 4: Resume Template Selection
const templates = document.querySelectorAll('.template');
let selectedTemplate = null;

templates.forEach((template) => {
  template.addEventListener('click', () => {
    templates.forEach((temp) => temp.classList.remove('selected'));
    template.classList.add('selected');
    selectedTemplate = template.dataset.template;
  });
});

// Feature 5: Save and Load Data
const saveData = () => {
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    skills: document.getElementById('skills').value,
    experience: document.getElementById('experience').value,
    education: document.getElementById('education').value,
  };
  localStorage.setItem('resumeData', JSON.stringify(formData));
};

const loadData = () => {
  const savedData = JSON.parse(localStorage.getItem('resumeData'));
  if (savedData) {
    document.getElementById('name').value = savedData.name || '';
    document.getElementById('email').value = savedData.email || '';
    document.getElementById('skills').value = savedData.skills || '';
    document.getElementById('experience').value = savedData.experience || '';
    document.getElementById('education').value = savedData.education || '';
  }
};

window.addEventListener('load', loadData);

// Feature 6: Resume Preview Mode
const previewBtn = document.getElementById('previewResume');
const previewSection = document.getElementById('resumePreview');
const resumeOutput = document.getElementById('resumeOutput');
const formSection = document.getElementById('resumeForm');

previewBtn.addEventListener('click', () => {
  saveData(); // Save data before preview
  formSection.style.display = 'none';
  previewSection.classList.remove('hidden');

  // Generate preview content
  const data = JSON.parse(localStorage.getItem('resumeData'));
  resumeOutput.innerHTML = `
    <h1>${data.name}</h1>
    <p><strong>Email:</strong> ${data.email}</p>
    <h3>Skills</h3>
    <p>${data.skills}</p>
    <h3>Experience</h3>
    <p>${data.experience}</p>
    <h3>Education</h3>
    <p>${data.education}</p>
  `;
});

// Edit button to return to form
const editBtn = document.getElementById('editResume');
editBtn.addEventListener('click', () => {
  previewSection.classList.add('hidden');
  formSection.style.display = 'block';
});

// Feature 7: Advanced PDF Export
const downloadBtn = document.getElementById('downloadPDF');

downloadBtn.addEventListener('click', () => {
  const element = resumeOutput;
  const options = {
    margin: 1,
    filename: 'resume.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };
  html2pdf().set(options).from(element).save();
});
// Feature 8: Responsive Design - CSS handles responsiveness automatically

// Feature 9: Add More Fields Dynamically
const addSectionBtn = document.getElementById('addSection');
const additionalSections = document.getElementById('additionalSections');

addSectionBtn.addEventListener('click', () => {
  const newSection = document.createElement('div');
  newSection.className = 'form-group';
  newSection.innerHTML = `
    <label for="customField">Custom Field:</label>
    <input type="text" class="customField" placeholder="Enter details here">
  `;
  additionalSections.appendChild(newSection);
});

// Feature 10: Real-Time Form Validation
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.checkValidity()) {
      input.style.borderColor = 'green';
    } else {
      input.style.borderColor = 'red';
    }
  });
});

// Feature 11: Live Word/Character Count
const textAreas = document.querySelectorAll('textarea');
textAreas.forEach((textarea) => {
  const wordCount = document.createElement('div');
  wordCount.className = 'word-count';
  textarea.parentNode.appendChild(wordCount);

  textarea.addEventListener('input', () => {
    const words = textarea.value.trim().split(/\s+/).filter((word) => word.length > 0);
    wordCount.textContent = `Words: ${words.length}, Characters: ${textarea.value.length}`;
  });
});

// Feature 12: Smooth Animations (CSS handles most transitions)

// Feature 13: Dark Mode Toggle
const darkModeToggle = document.getElementById('darkMode');
darkModeToggle.addEventListener('change', (e) => {
  document.body.classList.toggle('dark-mode', e.target.checked);
});
// Feature 14: Email Notification after Resume Creation
const sendEmailBtn = document.getElementById('sendEmail');

sendEmailBtn.addEventListener('click', () => {
  const data = JSON.parse(localStorage.getItem('resumeData'));
  const emailContent = `
    Name: ${data.name}
    Email: ${data.email}
    Skills: ${data.skills}
    Experience: ${data.experience}
    Education: ${data.education}
  `;
  
  const mailtoLink = `mailto:?subject=Your Resume&body=${encodeURIComponent(emailContent)}`;
  window.location.href = mailtoLink;
});

// Feature 15: Auto-save Drafts every 5 seconds
setInterval(() => {
  saveData();
  document.getElementById('autosaveNotification').style.display = 'block';
  setTimeout(() => {
    document.getElementById('autosaveNotification').style.display = 'none';
  }, 2000);
}, 5000);

// Feature 16: Export Data to CSV/JSON
const exportData = () => {
  const data = JSON.parse(localStorage.getItem('resumeData'));
  const dataToExport = JSON.stringify(data, null, 2);

  const blob = new Blob([dataToExport], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume.json';
  a.click();
};

const exportCSV = () => {
  const data = JSON.parse(localStorage.getItem('resumeData'));
  const csvContent = `Name, Email, Skills, Experience, Education\n${data.name}, ${data.email}, ${data.skills}, ${data.experience}, ${data.education}`;
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume.csv';
  a.click();
};

// Feature 17: User Authentication
// This requires server-side integration (backend). For simplicity, you can simulate it with mock data.
const loginUser = () => {
  alert('User logged in');
};

// Feature 18: Language Support
const languageSelect = document.getElementById('languageSelect');

languageSelect.addEventListener('change', (e) => {
  const selectedLanguage = e.target.value;
  if (selectedLanguage === 'es') {
    alert('Idioma cambiado a Español');
  } else if (selectedLanguage === 'fr') {
    alert('Langue changée en français');
  } else {
    alert('Language switched to English');
  }
});

// Feature 19: Print Resume
const printResumeBtn = document.getElementById('printResume');

printResumeBtn.addEventListener('click', () => {
  const resumeContent = document.getElementById('resumeOutput').innerHTML;
  const newWindow = window.open();
  newWindow.document.write(resumeContent);
  newWindow.document.close();
  newWindow.print();
});

// Feature 20: Error Handling for Form Submission
const form = document.getElementById('resumeForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = ['name', 'email', 'skills', 'experience', 'education'];
  let hasError = false;

  fields.forEach((field) => {
    const input = document.getElementById(field);
    if (!input.value.trim()) {
      input.style.borderColor = 'red';
      hasError = true;
    } else {
      input.style.borderColor = 'green';
    }
  });

  if (!hasError) {
    form.submit();
  } else {
    alert('Please fill in all the fields.');
  }
});

// Feature 21: User Feedback & Rating
const submitRatingBtn = document.getElementById('submitRating');

submitRatingBtn.addEventListener('click', () => {
  const rating = document.getElementById('ratingSelect').value;
  alert(`Thank you for rating the template: ${rating} Star(s)!`);
});
