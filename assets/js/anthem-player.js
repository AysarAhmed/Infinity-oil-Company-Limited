(function(){
  const audio = document.getElementById('anthemAudio');
  if(!audio) return;

  const playBtn = document.getElementById('playBtn');
  const miniPlayBtn = document.getElementById('miniPlayBtn');
  const miniPlayer = document.getElementById('miniPlayer');
  const miniClose = document.getElementById('miniCloseBtn');
  const progressTrack = document.getElementById('progressTrack');
  const progressFill = document.getElementById('progressFill');
  const progressHandle = document.getElementById('progressHandle');
  const miniProgressTrack = document.getElementById('miniProgressTrack');
  const miniProgressFill = document.getElementById('miniProgressFill');
  const timeCurrent = document.getElementById('timeCurrent');
  const timeTotal = document.getElementById('timeTotal');
  const volumeSlider = document.getElementById('volumeSlider');
  const canvas = document.getElementById('vizCanvas');
  const vctx = canvas ? canvas.getContext('2d') : null;
  const downloadBtn = document.getElementById('downloadBtn');

  let rafId;
  let userClosedMini = false;

  function fmtTime(s){
    if(!isFinite(s) || s < 0) return '0:00';
    const m = Math.floor(s/60);
    const sec = Math.floor(s%60).toString().padStart(2,'0');
    return m + ':' + sec;
  }

  function setPlayingUI(isPlaying){
    playBtn.classList.toggle('playing', isPlaying);
    miniPlayBtn.classList.toggle('playing', isPlaying);
    playBtn.setAttribute('aria-label', isPlaying ? 'Simamisha Wimbo' : 'Cheza Wimbo');
    if(isPlaying && !userClosedMini){ miniPlayer.classList.add('show'); document.body.classList.add('has-mini-player'); }
    if(!isPlaying){ miniPlayer.classList.remove('show'); document.body.classList.remove('has-mini-player'); }
  }

  // Decorative visualizer only — deliberately NOT wired into the actual <audio>
  // output via the Web Audio API. Routing playback through an AudioContext
  // (createMediaElementSource) is what was silencing playback on some mobile
  // browsers, so the bars here just dance in sync with playback state instead.
  function drawViz(){
    rafId = requestAnimationFrame(drawViz);
    if(!vctx) return;
    const w = canvas.width, h = canvas.height;
    vctx.clearRect(0,0,w,h);
    const bars = 16;
    const barW = w/bars;
    const playing = !audio.paused && !audio.ended;
    const now = performance.now();
    for(let i=0;i<bars;i++){
      let barH = 4;
      if(playing){
        const t = now/260 + i*0.7;
        const wobble = Math.abs(Math.sin(i*1.7 + now/900));
        barH = 4 + (Math.sin(t)*0.5+0.5) * (h-6) * (0.4 + 0.6*wobble);
      }
      vctx.fillStyle = playing ? (i%2===0 ? 'rgba(14,91,196,0.95)' : 'rgba(183,183,178,0.85)') : 'rgba(255,255,255,0.15)';
      vctx.fillRect(i*barW+1, h-barH, barW-2, barH);
    }
  }

  function togglePlay(){
    if(audio.paused){
      const p = audio.play();
      if(p && p.catch){ p.catch(function(err){ console.warn('Imeshindwa kucheza wimbo:', err); }); }
    } else {
      audio.pause();
    }
  }

  playBtn.addEventListener('click', togglePlay);
  miniPlayBtn.addEventListener('click', togglePlay);
  miniClose.addEventListener('click', function(e){ e.stopPropagation(); userClosedMini = true; miniPlayer.classList.remove('show'); document.body.classList.remove('has-mini-player'); });

  // Reliable cross-device download: fetch the file as a blob and trigger the
  // save via an in-memory link. This works far more consistently on phones
  // than a plain <a download> pointing straight at the file, which many
  // mobile browsers/in-app browsers (e.g. Safari, WhatsApp/Instagram webviews)
  // just open and play instead of saving.
  if(downloadBtn){
    downloadBtn.addEventListener('click', function(e){
      e.preventDefault();
      const src = downloadBtn.getAttribute('href');
      fetch(src)
        .then(function(res){ if(!res.ok) throw new Error('Haipatikani'); return res.blob(); })
        .then(function(blob){
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Infinity-Oil-Wimbo.mp3';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(function(){ URL.revokeObjectURL(url); }, 4000);
        })
        .catch(function(){
          // Fallback for browsers/webviews that block blob downloads —
          // opens the file directly so the person can save it manually.
          window.open(src, '_blank');
        });
    });
  }

  audio.addEventListener('play', function(){ setPlayingUI(true); userClosedMini = false; });
  audio.addEventListener('pause', function(){ setPlayingUI(false); });
  audio.addEventListener('ended', function(){
    setPlayingUI(false);
    progressFill.style.width = '0%';
    progressHandle.style.left = '0%';
    miniProgressFill.style.width = '0%';
    timeCurrent.textContent = '0:00';
  });
  audio.addEventListener('loadedmetadata', function(){ timeTotal.textContent = fmtTime(audio.duration); });
  audio.addEventListener('timeupdate', function(){
    if(!audio.duration) return;
    const pct = (audio.currentTime/audio.duration)*100;
    progressFill.style.width = pct + '%';
    progressHandle.style.left = pct + '%';
    miniProgressFill.style.width = pct + '%';
    timeCurrent.textContent = fmtTime(audio.currentTime);
  });

  function seek(clientX, track){
    const rect = track.getBoundingClientRect();
    let pct = (clientX - rect.left) / rect.width;
    pct = Math.min(1, Math.max(0, pct));
    if(audio.duration){ audio.currentTime = pct * audio.duration; }
  }
  progressTrack.addEventListener('click', function(e){ seek(e.clientX, progressTrack); });
  miniProgressTrack.addEventListener('click', function(e){ seek(e.clientX, miniProgressTrack); });

  let dragging = false;
  progressTrack.addEventListener('pointerdown', function(e){ dragging = true; seek(e.clientX, progressTrack); });
  window.addEventListener('pointermove', function(e){ if(dragging) seek(e.clientX, progressTrack); });
  window.addEventListener('pointerup', function(){ dragging = false; });

  progressTrack.addEventListener('keydown', function(e){
    if(!audio.duration) return;
    if(e.key === 'ArrowRight'){ audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); }
    if(e.key === 'ArrowLeft'){ audio.currentTime = Math.max(0, audio.currentTime - 5); }
  });

  volumeSlider.addEventListener('input', function(e){ audio.volume = parseFloat(e.target.value); });

  drawViz();
})();
