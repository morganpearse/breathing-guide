import { html, css, LitElement } from 'lit-element';

/**
 * The Breathing Guide component simulates breathing via two circles, the inner one expanding and contracting
 * animation toggled on/off with a button element
 *
 * @element breathing-component
 *
 * @prop {Number} animationStageLength    - how long each phase of the animation lasts
 * @prop {Number} animationStartDelay   - time in ms between button click and animation start
 * @prop {String} message    - the currently displayed message as the animation progresses
 * @prop {String} startingMessage   - the initial message displayed prior to start
 * @prop {String} buttonDisplay   - label of trigger button
 */

export class BreathingGuide extends LitElement {
  static get styles() {
    return css`
      :host {
        border: solid 1px #dedede;
        padding: 16px;
        max-width: 500px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        font-family: Arial, Helvetica, sans-serif;
      }
      @keyframes fade-in-out {
        0% {
          opacity: 0;
        }
        80% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      .frame {
        position: relative;
        height: 400px;
        width: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: middle;
        margin-top: 16px;
        margin-bottom: 16px;
      }

      .circle, .square {
        border: 1px solid #dfdfdf;
      }

      .circle {
        border-radius: 50%;
      }

      .outer-shape {
        height: 400px;
        width: 400px;
      }

      .outer-shape.circle, .outer-shape.square {
        background-color: rgb(0,219,255);
      }

      .inner-shape {
        background-color: #efefef;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        transform: scale(0.4);
        transition: all 0.05s linear;
        width: 100%;
      }

      .inner-shape.circle, .inner-shape.square {
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        -webkit-filter: drop-shadow(0px 5px 15px rgba(86,86,86,.5));
        filter: drop-shadow(0px 5px 15px rgba(86,86,86,.5));

      }

      .triangle {
        border-left: 200px solid transparent;
        border-right: 200px solid transparent;
        border-bottom: 360px solid rgb(0,219,255);
        height: 0px !important;
        width: 0px !important;
      }

      .inner-shape.triangle {
        left: -200px;
        top: 28px;
        background-color: transparent;
        border-bottom: 360px solid white;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        -webkit-filter: drop-shadow(0px 5px 15px rgba(86,86,86,.5));
        filter: drop-shadow(0px 5px 15px rgba(86,86,86,.5));
      }

      .breathe-in {
        background-color: #fff;
        transform: scale(0.9);
        transition: all 4s linear;
      }

      .triangle .breathe-in {
        transform: matrix(0.9, 0, 0, 0.9, 0, -22);
      }

      .breathe-out {
        background-color: #efefef;
        transform: scale(0.4);
        transition: all 4s linear;
      }

      .triangle .breathe-out {
        transform: matrix(0.4, 0, 0, 0.4, 0, 0);
      }

      .message {
        font-family: 'Arial';
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
        left: 1rem;
        position: absolute;
        right: 1rem;
        text-align: center;
        text-shadow: 0 0 0.2em rgba(255, 255, 255, 0.8),
          0 0 0.2em rgba(255, 255, 255, 0.8), 0 0 0.2em rgba(255, 255, 255, 0.8);
        top: 50%;
        transform: translateY(-50%);
      }
      .message-fade {
        animation: fade-in-out 4s infinite;
      }
      .animation-toggle {
        display: inline-block;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        font-family: 'Arial';
        font-size: 20px;
        font-weight: bold;
        color: #fff !important;
        text-transform: uppercase;
        text-decoration: none;
        background: #008000;
        padding: 20px 20px 20px 20px;
        border-radius: 8px;
        border: none;
        transition: all 0.4s ease 0s;
        text-align: center;
      }
      .animation-toggle:hover {
        background: #434343;
        letter-spacing: 1px;
        -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
        -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
        box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
        transition: all 0.4s ease 0s;
        cursor: pointer;
      }

      .animation-toggle.started {
        background: #dd0000;
      }

      .radiobuttons {
        margin-top: 30px;
        margin-bottom: 30px;
      }

      .container {
        position: relative;
        padding-left: 35px;
        margin-left: 5px;
        margin-right: 5px;
        cursor: pointer;
        font-size: 18px;
        text-transform: uppercase;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      .radiobutton {
        position: absolute;
        top: 0;
        left: 0;
      }

      .radiobutton-circle, .radiobutton-square {
        height: 25px;
        width: 25px;
        background-color: #eee;
      }

      .radiobutton-circle {
        border-radius: 50%;
      }

      .radiobutton-square {
        border-radius: 0;
      }

      .radiobutton-triangle {
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 25px solid #eee;
        height: 0px !important;
        width: 0px !important;
      }

      .container:hover input ~ .radiobutton-circle, .container:hover input ~ .radiobutton-square {
        background-color: #ccc;
      }

      .container:hover input ~ .radiobutton-triangle {
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 25px solid #ccc;
      }

      .container input:checked ~ .radiobutton-circle, .container input:checked ~ .radiobutton-square {
        background-color: #2196F3;
      }

      .container input:checked ~ .radiobutton-triangle {
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 25px solid #2196F3;
      }

      .radiobutton:after {
        content: "";
        position: absolute;
        display: none;
      }

      .container input:checked ~ .radiobutton:after {
        display: block;
      }

      .radiobutton-circle:after, .radiobutton-square:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        background: white;
      }

      .radiobutton-circle:after {
        border-radius: 50%;
      }

      .radiobutton-square:after {
        border-radius: 0;
      }

      .radiobutton-triangle:after {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 8px solid white;
        height: 0px !important;
        width: 0px !important;      
        top: 12px;
        left: -4px;
      }
    `;
  }

  static get properties() {
    return {
      animationStageLength: { type: Number },
      animationStartDelay: { type: Number },
      message: { type: String },
      startingMessage: { type: String },
      buttonDisplay: { type: String },
    };
  }

  static get tag() {
    return 'breathing-component';
  }

  constructor() {
    super();
    this.animationStageLength = 4000;
    this.animationStartDelay = 1000;
    this.startingMessage = "Click button when ready...";
    this.message = this.startingMessage;
    this.buttonDisplay = 'Start animation';

    this.animationIntervalID = null;
    this.animationTimeoutID = null;
    this.animationStartedAt = null;
    this.animationStages = [
      this._breatheIn.bind(this),
      this._holdBreath.bind(this),
      this._breatheOut.bind(this),
      this._holdBreath.bind(this),
    ];
    this.currentAnimationStage = null;
    this.buttonAction = this._handleStart; //initial @click action
  }

  render() {
    return html`
      <div>
        <div class="frame">
          <div class="outer-shape circle">
            <div class="inner-shape circle"></div>
          </div>
          <div class="message">${this.message}</div>
        </div>
        <div class="radiobuttons">
          <label class="container">circle
            <input class="shape-select" type="radio" @click="${this._handleSelectShape}" id="radiobutton-circle" checked name="shape" value="circle">
            <span class="radiobutton radiobutton-circle"></span>
          </label>
          <label class="container">triangle
            <input class="shape-select" type="radio" @click="${this._handleSelectShape}" id="radiobutton-triangle" name="shape" value="triangle">
            <span class="radiobutton radiobutton-triangle"></span>
          </label>
          <label class="container">square
            <input class="shape-select" type="radio" @click="${this._handleSelectShape}" id="radiobutton-square" name="shape" value="square">
            <span class="radiobutton radiobutton-square"></span>
          </label>
        </div>
        <p>
          <a class="animation-toggle" @click=${this.buttonAction}>${this.buttonDisplay}</a>
        </p>
      </div>
    `;
  }

  // -------------------------------------------------------------------------------------------------------------------
  // handler functions
  // -------------------------------------------------------------------------------------------------------------------

  _handleSelectShape() {
    this._handleStop();
    this.shadowRoot.querySelector('.outer-shape').classList.remove('circle', 'triangle', 'square');
    this.shadowRoot.querySelector('.inner-shape').classList.remove('circle', 'triangle', 'square');

    if (this.shadowRoot.getElementById('radiobutton-circle').checked) {
      this.shadowRoot.querySelector('.outer-shape').classList.add('circle');
      this.shadowRoot.querySelector('.inner-shape').classList.add('circle');
    }
    else if (this.shadowRoot.getElementById('radiobutton-triangle').checked) {
      this.shadowRoot.querySelector('.outer-shape').classList.add('triangle');
      this.shadowRoot.querySelector('.inner-shape').classList.add('triangle');
    }
    else if (this.shadowRoot.getElementById('radiobutton-square').checked) {
      this.shadowRoot.querySelector('.outer-shape').classList.add('square');
      this.shadowRoot.querySelector('.inner-shape').classList.add('square');
    }
  }
  
  _fadeMessage(text) {
    this.shadowRoot.querySelector('.message').classList.add('message-fade');
    this.message = text;
  }

  _breatheIn() {
    this.shadowRoot
      .querySelector('.inner-shape')
      .classList.remove('breathe-out');
    this._fadeMessage('Take a slow breath in');
    this.shadowRoot.querySelector('.inner-shape').classList.add('breathe-in');
  }

  _breatheOut() {
    this.shadowRoot
      .querySelector('.inner-shape')
      .classList.remove('breathe-in');
    this._fadeMessage('Now breathe out slowly');
    this.shadowRoot.querySelector('.inner-shape').classList.add('breathe-out');
  }

  _holdBreath() {
    this._fadeMessage('Now hold your breath');
  }

  _handleStart() {
    this.buttonAction = this._handleStop;
    this.buttonDisplay = 'Stop animation';
    this.shadowRoot.querySelector('.animation-toggle').classList.add('started');

    //this._recordStart(); //for analytics

    //start animation after `animationStartDelay` hold
    this.animationTimeoutID = setTimeout(
      this._startAnimation.bind(this),
      this.animationStartDelay
    );
  }

  _startAnimation() {
    //reset current animation stage and call it
    this.currentAnimationStage = 0;
    this.animationStages[this.currentAnimationStage]();
    //call `nextAnimationStage` every 4 seconds
    this.animationIntervalID = setInterval(
      this._nextAnimationStage.bind(this),
      this.animationStageLength
    );
  }

  _nextAnimationStage() {
    this.currentAnimationStage += 1;
    if (this.currentAnimationStage >= this.animationStages.length) {
      this.currentAnimationStage = 0;
    }
    this.animationStages[this.currentAnimationStage]();
  }

  _handleStop() {
    //clear any active interval/timeout
    clearTimeout(this.animationTimeoutID);
    clearInterval(this.animationIntervalID);

    //this._recordStop(); //for analytics

    this.shadowRoot.querySelector('.inner-shape').classList.remove('breathe-in', 'breathe-out'); //reset to remove breathe-in or -out classes
    this.shadowRoot.querySelector('.message').className = 'message'; //reset to remove message-fade class

    this.buttonAction = this._handleStart;
    this.buttonDisplay = 'Start animation';
    this.shadowRoot.querySelector('.animation-toggle').classList.remove('started');

    this.message = this.startingMessage;
  }

  _recordStart() {
    //track when we start so we can determine duration upon end
    this.animationStartedAt = new Date();
    //-- analytics code goes here --
  }

  _recordStop() {
    if (!this.animationStartedAt) {
      return;
    }

    //Find time elapsed in seconds and clear start date
    this.animationEndedAt = new Date();
    this.timeElapsed = Math.round(
      (this.animationEndedAt - this.animationStartedAt) / 1000
    );
    this.animationStartedAt = null;
    //-- analytics code goes here --
  }
}

window.customElements.define(BreathingGuide.tag, BreathingGuide);