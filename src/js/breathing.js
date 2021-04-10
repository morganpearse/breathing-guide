  // Set each animation stage to 4 seconds
  const stageLength = 4000;
  // Set start delay to 1 second
  const startDelay = 1000;

  // We want to run through animation stages in this sequence
  const stages = [breatheIn, holdBreath, breatheOut, holdBreath];

  // To track the current animation stage and timeout/interval
  let currentStage = null;
  let intervalID = null;
  let timeoutID = null;

  let startedAt = null;

  const inner = document.querySelector('.inner-circle');
  const message = document.querySelector('.message');
  const btn = document.querySelector(
    '.animation-toggle'
  );

  const originalMessage = message.innerHTML;

  function fadeMessage(text) {
    message.classList.add('message--fade');
    message.innerHTML = text;
  }

  function breatheIn() {
    inner.classList.remove('breathe-out');
    fadeMessage('Breathe in slowly');
    inner.classList.add('breathe-in');
  }

  function breatheOut() {
    inner.classList.remove('breathe-in');
    fadeMessage('Breathe out slowly');
    inner.classList.add('breathe-out');
  }

  function holdBreath() {
    fadeMessage('Now hold your breath');
  }

  btn.addEventListener('click', handleStart);

  function handleStart() {
    message.innerHTML = '';
    btn.innerHTML = 'Stop';
    btn.removeEventListener('click', handleStart);

    //recordStart();

    btn.addEventListener('click', handleStop);

    // start animation after `startDelay` hold
    timeoutID = setTimeout(startAnimation, startDelay);
  }

  function startAnimation() {
    // reset current animation stage and call it
    currentStage = 0;
    stages[currentStage].call();

    // call `nextAnimationStage` every 4 seconds
    intervalID = setInterval(nextAnimationStage, stageLength);
  }

  function nextAnimationStage() {
    currentStage += 1;
    if (currentStage >= stages.length) {
      currentStage = 0;
    }
    stages[currentStage].call();
  }

  function handleStop() {
    // clear any active interval/timeout
    clearTimeout(timeoutID);
    clearInterval(intervalID);

    //recordStop();

    btn.innerHTML = 'Start breathing exercise';
    btn.removeEventListener('click', handleStop);
    btn.addEventListener('click', handleStart);

    inner.className = 'inner-circle';
    message.className = 'message';
    message.innerHTML = originalMessage;
  }

  // ===== optional analytics functions =====

  function recordStart() {
    // track when we start so we can determine duration upon end
    startedAt = new Date();

    if (typeof ga !== 'undefined') {
      ga('send', 'event', {
        eventCategory: 'breathing-animation',
        eventAction: 'start-animation'
      });
    }
  }

  function recordStop() {
    if (!startedAt) {
      return;
    }

    // Find time elapsed in seconds and clear start date
    const endedAt = new Date();
    const timeElapsed = Math.round(
      (endedAt - startedAt) / 1000
    );
    startedAt = null;

    if (typeof ga !== 'undefined') {
      ga('send', 'event', {
        eventCategory: 'breathing-animation',
        eventAction: 'stop-animation',
        eventValue: timeElapsed.toString()
      });
    }
  }