// https://openprocessing.org/sketch/2792194
// A fork of https://openprocessing.org/sketch/2792194
// CreativeCommons Attribution NonCommercial ShareAlike
// ---

//https://sprott.physics.wisc.edu/pubs/paper203.pdf

//de Jong Attractor

let xl, xh, yl, yh;
let sx, sy;
let N = 300000;
let startTime;
let button, slider, dots, idlabel, Alabel, hr;
let allowInnerAutoDraw = true;

function setup() {
  startTime = millis();
  
  let deJongCanvas = createCanvas(w=windowWidth/1.85, h=w);
  deJongCanvas.parent('deJong');

  colorMode(HSB);
  background(bg=98);
  strokeWeight(0.5);
  stroke(0, 0.4);

  t = 2;
  
  button = createButton('↺');
  button.position(0, windowHeight/19);
  button.style('font-size:large');
  button.style('cursor:pointer');
  button.mousePressed(set_slider_and_loop);
  button.parent('deJong');
  
  slider = createSlider(10000, 1000000, 300000);
  slider.position(windowWidth/35, windowHeight/17);
  slider.style('accent-color:var(--text-color)');
  slider.parent('deJong');

  dots = createP('');
  dots.position(0, 0);
  dots.style('color:gray');
  dots.parent('deJong');

  idlabel = createP('');
  idlabel.position(windowWidth/13, 0);
  idlabel.style('color:gray');
  idlabel.parent('deJong');

  Alabel = createP('');
  Alabel.position(windowWidth/5, 0);
  Alabel.style('color:gray');
  Alabel.parent('deJong');
}

function draw(){
  if (t == 2) {
    test_set_pram();
  }

  for(let i=0; i<=11000; i++){
    if (! (t == 3) ) {
      break
    }
    itr_eq();
    test_disp();
    test_res();
  }

  if (t == 1){
    draw_set_pram();

    push();
    translate(w*0.5, h*0.5);
    for (let i=0; i<=N; i++) {
      if (! (t == 1) ) {
        break
      }
      itr_eq();
      draw_disp();
      draw_res();
    }
    pop();

    push();
    blendMode(SOFT_LIGHT);
    fill(random(360), 70, 100);
    stroke(0,0);
    rect(0,0,w,h);
    pop();

    noLoop();
  }

  idlabel.html("id:"+id);
  Alabel.html("A:"+A);
  dots.html("N="+N);

  if (millis() - startTime < 4000) {
    dots.style('color:darkgray');
  } else {
    dots.style('color:gray');
  }

}

function test_set_pram(){
  x = y = 0.05;
  xe = x + 0.000001;
  ye = y;

  A = [];
  id = '';
  for (let i=0; i<4; i++) {
    let a = int(random(4095));
    A[i] = floor(a - 2047)/800;
    id += a.toString(16).padStart(3, '0');
  }

  t = 3;
  lsum = 0;
  n = 0;
  xmin = ymin = 1000000;
  xmax = ymax = -1*xmin;
}

function itr_eq(){
  xnew = sin(A[0]*y) - cos(A[1]*x);
  ynew = sin(A[2]*x) - cos(A[3]*y);
  n = n + 1;
}

function test_disp(){
  if (! (n < 100 || n > 1000) ) {
    if (x < xmin) { xmin = x; }
    if (x > xmax) { xmax = x; }
    if (y < ymin) { ymin = y; }
    if (y > ymax) { ymax = y; }
  }
  if (n == 1000) {
    rs_scr();
  }
}

function test_res(){
  cal();
  if (n > 11000) {
    t = 1;
  }
  if ((abs(xnew) + abs(ynew)) > 1000000) {
    t = 2;
  }
  if (n > 100 && l < 0.3) {
    t = 2;
  }
  x = xnew;
  y = ynew;
}

function cal(){
  xsave = xnew;
  ysave = ynew;
  x = xe;
  y = ye;
  n = n - 1;
  itr_eq();
  dlx = xnew - xsave;
  dly = ynew - ysave;
  dl2 = dlx*dlx + dly*dly;
  df = 1000000000000 * dl2;
  rs = 1 / sqrt(df);
  xe = xsave + rs*(dlx);
  ye = ysave + rs*(dly);
  xnew = xsave;
  ynew = ysave;
  lsum += log(df);
  l = 0.721347 * lsum / n;
}

function rs_scr(){
  dx = 0.1 * (xmax - xmin);
  dy = 0.1 * (ymax - ymin);
  xl = xmin - dx;
  xh = xmax + dx;
  yl = ymin - dy;
  yh = ymax + dy;

  //scale
  sx = w/(xmax - xmin)*0.8;
  sy = h/(ymax - ymin)*0.8;
  xc = xmax - 0.5 * (xmax - xmin);
  yc = ymax - 0.5 * (ymax - ymin);
}

function draw_set_pram(){
  background(bg);

  x = y = 0.05;
  xe = x + 0.000001;
  ye = y;

  t = 1;
  lsum = 0;
  n = 0;

  let sum = 0;
  for(let i=0;i<4;i++){
    sum += A[i]*10000;
  }

  randomSeed( int(sum) );
}

function draw_disp(){
  if (x > xl && x < xh && y > yl && y < yh) {
    point(sx*(x-xc), sy*(y-yc));
  }
}

function draw_res(){
  cal();
  if (n > N) {
    t = 2;
  }
  x = xnew;
  y = ynew;
}

function mouseMoved() {
  if (millis() - startTime < 4000) {
    return
  }
  if ((mouseX >= 0 && mouseY > 90) && allowInnerAutoDraw) {
    slider.value(10000); // too slow with more particles
    N = slider.value();
    loop();
  }
}

function set_slider_and_loop() {
  allowInnerAutoDraw = false;
  N = slider.value();
  loop();
}
