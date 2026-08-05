// script.js - portfolio filtering, lightbox, checkout (Stripe test-mode)
document.addEventListener('DOMContentLoaded',function(){
  // Filtering
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.grid-item');
  filters.forEach(btn=>btn.addEventListener('click',()=>{
    filters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.getAttribute('data-filter');
    items.forEach(i=>{
      if(f==='*' || i.dataset.category===f) i.style.display='block'; else i.style.display='none';
    });
  }));

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const grid = Array.from(document.querySelectorAll('.grid-item img'));
  let currentIndex = 0;
  function openLightbox(i){
    currentIndex = i;
    lightboxImg.src = grid[i].src;
    lightboxImg.alt = grid[i].alt || '';
    lightbox.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){ lightbox.setAttribute('aria-hidden','true'); }
  grid.forEach((img,idx)=>img.addEventListener('click',()=>openLightbox(idx)));
  document.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
  document.querySelector('.lightbox-next').addEventListener('click',()=>{ currentIndex=(currentIndex+1)%grid.length; openLightbox(currentIndex); });
  document.querySelector('.lightbox-prev').addEventListener('click',()=>{ currentIndex=(currentIndex-1+grid.length)%grid.length; openLightbox(currentIndex); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLightbox(); if(e.key==='ArrowRight') document.querySelector('.lightbox-next').click(); if(e.key==='ArrowLeft') document.querySelector('.lightbox-prev').click(); });

  // Checkout modal toggles
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const modalClose = document.querySelector('.modal-close');
  if(checkoutBtn){checkoutBtn.addEventListener('click',()=>{checkoutModal.setAttribute('aria-hidden','false');});}
  if(modalClose){modalClose.addEventListener('click',()=>{checkoutModal.setAttribute('aria-hidden','true');});}

  // Stripe Payment Request Button (test-mode). Replace the publishableKey with your own in production.
  if(window.Stripe){
    const stripe = Stripe('pk_test_00000000000000000000000000'); // <-- REPLACE with your publishable key
    const paymentRequest = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {label: 'Sample payment', amount: 100},
      requestPayerName: true,
      requestPayerEmail: true,
    });

    paymentRequest.canMakePayment().then(function(result){
      if(result){
        const prButton = stripe.elements().create('paymentRequestButton', {paymentRequest});
        prButton.mount('#paymentRequestButton');
      } else {
        // Payment Request API (Google/Apple Pay) not available; hide container or show note
        document.getElementById('paymentRequestButton').style.display='none';
      }
    });

    paymentRequest.on('token', function(ev){
      // In test/demo mode we simply acknowledge the token.
      console.log('Received Stripe token (test):', ev.token);
      ev.complete('success');
      alert('Payment token received (test). Check console for token details.');
    });
  }

  // Minimal card form demo (test-only); in production use Stripe Elements + server-side charge
  const cardForm = document.getElementById('cardForm');
  if(cardForm) cardForm.addEventListener('submit',function(e){ e.preventDefault(); alert('Card payment demo – integrate with Stripe/your gateway server-side for real payments.'); });

  // Order button opens checkout
  const orderBtn = document.getElementById('orderBtn'); if(orderBtn) orderBtn.addEventListener('click',()=>{document.getElementById('checkoutModal').setAttribute('aria-hidden','false');});
});
