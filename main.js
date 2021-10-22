import Clock from './app.js';


const arms = document.querySelectorAll('.box .clock .arm');


const clk = new Clock(arms);
clk.run();