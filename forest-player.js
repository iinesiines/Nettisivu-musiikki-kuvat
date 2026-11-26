/* Tuuli Design: Magnesus, "Forest birds - ambient seamless loop", Freesound #723913.
   Audio converted from user-supplied WAV to MP3 for lighter website delivery; CC0.
   Browsers commonly block audible autoplay. The button provides a fallback. */
(() => {
  'use strict';
  const audio = document.getElementById('forest-audio');
  const button = document.getElementById('forest-toggle');
  const status = document.getElementById('forest-announcement');
  if (!audio || !button) return;
  const widget = button.closest('.forest-player');
  const playLabel = button.dataset.playLabel || 'Play forest sounds';
  const pauseLabel = button.dataset.pauseLabel || 'Pause forest sounds';
  const preferredLanguage = document.documentElement.lang === 'de' ? 'de' : 'en';
  audio.volume = 0.22;
  const readPref = () => { try { return localStorage.getItem('tuuli-forest-audio'); } catch (_) { return null; } };
  const savePref = value => { try { localStorage.setItem('tuuli-forest-audio',value); } catch (_) {} };
  function updateUI() {
    const playing = !audio.paused && !audio.ended;
    widget.classList.toggle('is-playing',playing);
    button.setAttribute('aria-pressed',playing ? 'true':'false');
    button.setAttribute('aria-label',playing ? pauseLabel : playLabel);
    button.title = playing ? pauseLabel : playLabel;
    if(status) status.textContent = playing ? (preferredLanguage==='de'?'Waldklänge spielen':'Forest sounds playing') : (preferredLanguage==='de'?'Waldklänge pausiert':'Forest sounds paused');
  }
  audio.addEventListener('play',updateUI);
  audio.addEventListener('pause',updateUI);
  audio.addEventListener('ended',updateUI);
  audio.addEventListener('error',() => {
    if(status) status.textContent= preferredLanguage==='de' ? 'Audio konnte nicht geladen werden' : 'Audio file could not be loaded';
  });
  button.addEventListener('click',async() => {
    if(!audio.paused) { audio.pause(); savePref('off'); return; }
    try { await audio.play(); savePref('on'); }
    catch(_) { updateUI(); if(status) status.textContent=preferredLanguage==='de'?'Zum Abspielen erneut tippen':'Tap again to play audio'; }
  });
  updateUI();
  // An attempt is allowed, but browsers often prevent sound until a user clicks.
  if (readPref() !== 'off') {
    audio.play().catch(() => { updateUI(); });
  }
})();
