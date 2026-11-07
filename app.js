const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
if(menuButton&&nav){
  menuButton.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.textContent=open?'×':'☰';
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';
  }));
}
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{
  const select=document.querySelector('#serviceSelect');
  if(select)select.value=link.dataset.service;
}));
const form=document.querySelector('#bookingForm');
if(form){
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const lines=[
      'Hello Fluffy Clean, I would like to make an enquiry.','',
      'Name: '+data.get('name'),'Phone: '+data.get('phone'),
      'Service: '+data.get('service'),'Preferred date: '+(data.get('date')||'Not specified'),
      'Location: '+data.get('location'),'Details: '+(data.get('details')||'Not specified'),'',
      'Please let me know the availability and price. Thank you.'
    ];
    const message=lines.join('\n');
    const whatsappUrl='https://wa.me/2348033174796?text='+encodeURIComponent(message);
    const status=document.querySelector('.form-status');
    const submit=form.querySelector('[type="submit"]');
    // Open WhatsApp directly from the user's click so popup blockers do not suppress it.
    window.open(whatsappUrl,'_blank','noopener,noreferrer');
    if(submit){submit.disabled=true;submit.querySelector('span').textContent='Sending email copy…';}
    if(status)status.textContent='WhatsApp is ready. Sending a copy to the business email…';
    const payload={
      name:data.get('name'),phone:data.get('phone'),service:data.get('service'),
      preferred_date:data.get('date')||'Not specified',location:data.get('location'),
      details:data.get('details')||'Not specified',message:message,
      _subject:'New Fluffy Clean website enquiry — '+data.get('service'),
      _template:'table',_captcha:'false',_replyto:''
    };
    try{
      const response=await fetch('https://formsubmit.co/ajax/scpama4@gmail.com',{
        method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(payload)
      });
      const result=await response.json();
      if(!response.ok||result.success===false)throw new Error(result.message||'Email service did not accept the request');
      if(status)status.textContent='Email copy sent to Fluffy Clean. Now press Send in the WhatsApp tab to deliver your direct message too.';
      if(submit)submit.querySelector('span').textContent='Email copy sent';
    }catch(error){
      if(status)status.textContent='WhatsApp is ready. Email copy could not be confirmed, so please press Send in WhatsApp or email scpama4@gmail.com directly.';
      if(submit)submit.querySelector('span').textContent='WhatsApp enquiry ready';
    }finally{
      if(submit)submit.disabled=false;
    }
  });
}
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver'in window){
  const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}
  }),{threshold:.12});
  revealItems.forEach(item=>observer.observe(item));
}else revealItems.forEach(item=>item.classList.add('is-visible'));
