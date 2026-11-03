
'use strict';
const navButton = document.querySelector('.nav-toggle');
const nav = document.querySelector('.primary-links');
if (navButton && nav) {
  function closeMenu(){nav.classList.remove('is-open'); navButton.setAttribute('aria-expanded','false'); navButton.setAttribute('aria-label','Open menu');document.body.classList.remove('menu-open');}
  navButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navButton.setAttribute('aria-expanded', String(open));
    navButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open',open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape') closeMenu()});
}
const yr = document.getElementById('copyright-year');
if (yr) yr.textContent = new Date().getFullYear();

// Milestone calculator is illustrative only; it never charges money.
const milestonePackage = document.getElementById('payment-package');
const paymentInquiry = document.getElementById('payment-inquiry');
const formatMoney = amount => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:Number.isInteger(amount)?0:2,maximumFractionDigits:2}).format(amount);
function updateMilestonePricing(){
  if (!milestonePackage) return;
  const amount = Number(milestonePackage.value);
  if (!Number.isFinite(amount) || amount <= 0) return;
  const entries = {'payment-total':amount,'payment-first':amount*.5,'payment-second':amount*.25,'payment-third':amount*.25};
  Object.entries(entries).forEach(([id,value])=>{const element=document.getElementById(id);if(element) element.textContent=formatMoney(value)});
  if (paymentInquiry) paymentInquiry.dataset.selectService = milestonePackage.selectedOptions[0].dataset.service;
}
if (milestonePackage){milestonePackage.addEventListener('change',updateMilestonePricing);updateMilestonePricing();}

// Move the actual on-page card into the modal and back: one form, one set of fields,
// one Netlify form definition. Draft input survives closing and reopening the modal.
const modal = document.getElementById('inquiry-modal');
const modalBody = document.getElementById('inquiry-modal-body');
const card = document.querySelector('#contact .form-card');
const cardHome = card?.parentNode;
const cardMarker = document.createComment('Contact form home');
if (card && cardHome) cardHome.insertBefore(cardMarker, card);
const form = document.getElementById('inquiry-form');
const serviceSelect = form?.querySelector('select[name="service"]');
const paymentSelect = form?.querySelector('select[name="payment_preference"]');
const packageNotice = document.getElementById('selected-package-note');
const modalCloseButton = modal?.querySelector('.inquiry-modal-close');
let returnFocusTo = null;

function updateService(value){
  if (!serviceSelect || !value) return;
  if (!Array.from(serviceSelect.options).some(opt => opt.value === value)) return;
  serviceSelect.value = value;
  if (packageNotice){
    packageNotice.textContent = value === 'Help me choose / smaller scope'
      ? 'A smaller first step is worth discussing. Tell us what matters most and your comfortable budget.'
      : `Your starting point: ${serviceSelect.selectedOptions[0]?.textContent || value}. Share a little about your business below.`;
    packageNotice.hidden = false;
  }
}
function updatePayment(value){
  if (!paymentSelect || !value) return;
  if (Array.from(paymentSelect.options).some(opt => opt.value === value)) paymentSelect.value = value;
}
serviceSelect?.addEventListener('change',()=>{
  if (!serviceSelect.value) return;
  if (packageNotice){packageNotice.textContent=`Your starting point: ${serviceSelect.selectedOptions[0]?.textContent || serviceSelect.value}`;packageNotice.hidden=false;}
});

function openInquiry(trigger){
  if (!modal || !modalBody || !card || typeof modal.showModal !== 'function') return false;
  if (modal.open) return true;
  returnFocusTo = trigger;
  modalBody.appendChild(card);
  modal.showModal();
  document.body.classList.add('inquiry-open');
  modalBody.scrollTop = 0;
  modalCloseButton?.focus({preventScroll:true});
  return true;
}
function closeInquiry(){if (modal?.open) modal.close();}
modalCloseButton?.addEventListener('click',closeInquiry);
// Native Escape support is provided by <dialog>; clicking the backdrop closes too.
modal?.addEventListener('click',event=>{if (event.target===modal) closeInquiry();});
modal?.addEventListener('close',()=>{
  if (card && cardMarker.parentNode) cardMarker.parentNode.insertBefore(card,cardMarker.nextSibling);
  document.body.classList.remove('inquiry-open');
  if (returnFocusTo?.isConnected) returnFocusTo.focus({preventScroll:true});
  returnFocusTo=null;
});

// The exact header "Start a Conversation" interaction is the only contact scroll link.
// Every other link to #contact, including footer Contact, opens the existing form as a modal.
document.querySelectorAll('a[href="#contact"]').forEach(trigger=>{
  const isScrollLink = trigger.classList.contains('nav-cta');
  if (isScrollLink) return;
  trigger.addEventListener('click',event=>{
    if (!modal || typeof modal.showModal !== 'function') return; // non-JS fallback scroll
    event.preventDefault();
    updateService(trigger.dataset.selectService);
    updatePayment(trigger.dataset.selectPayment);
    openInquiry(trigger);
  });
});
