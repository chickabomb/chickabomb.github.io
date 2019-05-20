/*
 * mburger webcomponent CSS v1.3.0
 * mmenujs.com/mburger
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-4.0
 * http://creativecommons.org/licenses/by/4.0/
 */
export const mBurger = document.createElement('template');
mBurger.innerHTML = `
	<style>:root{--mb-button-size:60px;--mb-bar-width:0.6;--mb-bar-height:4px;--mb-bar-spacing:10px;--mb-cross-timeout:$mb_cross_timeout}:host{background:0 0;border:none;border-radius:0;color:inherit;display:inline-block;position:relative;box-sizing:border-box;height:var(--mb-button-size);padding:0 0 0 var(--mb-button-size);margin:0;line-height:var(--mb-button-size);vertical-align:middle;appearance:none;outline:0;cursor:pointer}:host b{display:block;position:absolute;left:calc(var(--mb-button-size) * ((1 - var(--mb-bar-width))/ 2));width:calc(var(--mb-button-size) * var(--mb-bar-width));height:var(--mb-bar-height);border-radius:calc(var(--mb-bar-height)/ 2);background:currentColor;color:inherit;opacity:1}:host b:nth-of-type(1){bottom:calc(50% + var(--mb-bar-spacing));transition:bottom .2s ease,transform .2s ease}:host b:nth-of-type(2){top:calc(50% - (var(--mb-bar-height)/ 2));transition:opacity .2s ease}:host b:nth-of-type(3){top:calc(50% + var(--mb-bar-spacing));transition:top .2s ease,transform .2s ease}:host span:not(:empty){padding-right:calc(var(--mb-button-size) * ((1 - var(--mb-bar-width))/ 2))}:host([state=cross]) b:nth-of-type(1){bottom:calc(50% - (var(--mb-bar-height)/ 2));transform:rotate(45deg)}:host([state=cross]) b:nth-of-type(2){opacity:0}:host([state=cross]) b:nth-of-type(3){top:calc(50% - (var(--mb-bar-height)/ 2));transform:rotate(-45deg)}:host([fx=collapse]) b:nth-of-type(1){transition:bottom .2s ease,margin .2s ease,transform .2s ease;transition-delay:.2s,0s,0s}:host([fx=collapse]) b:nth-of-type(2){transition:top .2s ease,opacity 0s ease;transition-delay:.3s,.3s}:host([fx=collapse]) b:nth-of-type(3){transition:top .2s ease,transform .2s ease}:host([state=cross][fx=collapse]) b:nth-of-type(1){bottom:calc(50% - var(--mb-bar-spacing) - var(--mb-bar-height));margin-bottom:calc(var(--mb-bar-spacing) + (var(--mb-bar-height)/ 2));transform:rotate(45deg);transition-delay:calc(var(--mb-cross-timeout) + .1s),calc(var(--mb-cross-timeout) + .3s),calc(var(--mb-cross-timeout) + .3s)}:host([state=cross][fx=collapse]) b:nth-of-type(2){top:calc(50% + var(--mb-bar-spacing));opacity:0;transition-delay:calc(var(--mb-cross-timeout) + 0s),calc(var(--mb-cross-timeout) + .2s)}:host([state=cross][fx=collapse]) b:nth-of-type(3){top:calc(50% - (var(--mb-bar-height)/ 2));transform:rotate(-45deg);transition-delay:calc(var(--mb-cross-timeout) + .3s),calc(var(--mb-cross-timeout) + .3s)}:host([fx=spin]) b:nth-of-type(1){transition-delay:.2s,0s}:host([fx=spin]) b:nth-of-type(2){transition-duration:0s;transition-delay:.2s}:host([fx=spin]) b:nth-of-type(3){transition-delay:.2s,0s}:host([state=cross][fx=spin]) b:nth-of-type(1){transform:rotate(135deg);transition-delay:calc(var(--mb-cross-timeout) + 0s),calc(var(--mb-cross-timeout) + .2s)}:host([state=cross][fx=spin]) b:nth-of-type(2){transition-delay:calc(var(--mb-cross-timeout) + 0s)}:host([state=cross][fx=spin]) b:nth-of-type(3){transform:rotate(225deg);transition-delay:calc(var(--mb-cross-timeout) + 0s),calc(var(--mb-cross-timeout) + .2s)}:host([fx=squeeze]) b:nth-of-type(1){transition-delay:.1s,0s}:host([fx=squeeze]) b:nth-of-type(2){transition-delay:.1s}:host([fx=squeeze]) b:nth-of-type(3){transition-delay:.1s,0s}:host([state=cross][fx=squeeze]) b:nth-of-type(1){transition-delay:calc(var(--mb-cross-timeout) + 0s),calc(var(--mb-cross-timeout) + .1s)}:host([state=cross][fx=squeeze]) b:nth-of-type(2){transition-delay:calc(var(--mb-cross-timeout) + 0s)}:host([state=cross][fx=squeeze]) b:nth-of-type(3){transition-delay:calc(var(--mb-cross-timeout) + 0s),calc(var(--mb-cross-timeout) + .1s)}:host([fx=tornado]) b:nth-of-type(1){transition:bottom .2s ease,transform .2s ease;transition-delay:.2s}:host([fx=tornado]) b:nth-of-type(2){transition:opacity 0s ease,transform .2s ease;transition-delay:.1s,.1s}:host([fx=tornado]) b:nth-of-type(3){transition:top .2s ease,transform .2s ease;transition-delay:0s}:host([state=cross][fx=tornado]) b:nth-of-type(1){transform:rotate(-135deg);transition-delay:calc(var(--mb-cross-timeout) + 0s)}:host([state=cross][fx=tornado]) b:nth-of-type(2){opacity:0;transform:rotate(-135deg);transition-delay:calc(var(--mb-cross-timeout) + .4s),calc(var(--mb-cross-timeout) + .1s)}:host([state=cross][fx=tornado]) b:nth-of-type(3){transform:rotate(-225deg);transition-delay:calc(var(--mb-cross-timeout) + .2s)}</style>
	<b></b>
	<b></b>
	<b></b>
	<span><slot></slot></span>`;
customElements.define('m-burger', class extends HTMLElement {
    constructor() {
        super();
        var content = mBurger.content.cloneNode(true);
        //	Attach shadow DOM
        this.attachShadow({ mode: 'open' }).appendChild(content);
        this.menu = null;
    }
    static get observedAttributes() {
        return ['menu'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'menu') {
            this.menu = newValue ? document.getElementById(newValue) : null;
            if (this.menu) {
                let API = this.menu['mmenu'];
                if (API) {
                    API.bind('open:after', () => {
                        this.setAttribute('state', 'cross');
                    });
                    API.bind('close:after', () => {
                        this.removeAttribute('state');
                    });
                }
            }
        }
    }
    connectedCallback() {
        this.addEventListener('click', evnt => {
            if (this.menu && this.menu.classList.contains('mm-menu')) {
                let API = this.menu['mmenu'];
                if (API && API.open) {
                    API.open();
                }
            }
        });
    }
});
