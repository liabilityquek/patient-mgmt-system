const vaccination = document.getElementById('vaccination');
const vaccinationType = document.getElementById('vaccination-type-label');

vaccination.addEventListener('click', () => {
    if(vaccination.value === 'YES'){
        vaccinationType.style.display = 'block'
    }else{
        vaccinationType.style.display = 'none';
    }
})

document.addEventListener("DOMContentLoaded", function() {
    vaccinationSelect();
  });