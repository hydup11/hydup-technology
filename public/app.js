const menu=document.getElementById('menu'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
document.getElementById('year').textContent=new Date().getFullYear();

const form=document.getElementById('contactForm');
form.addEventListener('submit',async e=>{
  e.preventDefault();
  const btn=document.getElementById('submitBtn'),msg=document.getElementById('formMessage');
  btn.disabled=true; btn.innerHTML='Sending…';
  msg.className='form-message'; msg.textContent='';
  const payload=Object.fromEntries(new FormData(form).entries());
  try{
    const res=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data=await res.json();
    if(!res.ok) throw new Error(data.message||'Unable to send enquiry.');
    msg.className='form-message ok'; msg.textContent='Thank you! Your enquiry has been sent successfully.';
    form.reset();
  }catch(err){
    msg.className='form-message err'; msg.textContent=err.message||'Something went wrong. Please try again.';
  }finally{btn.disabled=false;btn.innerHTML='Send Enquiry <b>→</b>';}
});
