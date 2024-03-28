const canvas = document.getElementById("life").getContext("2d");
document.getElementById("life").addEventListener("click", function(event) {
  // Obtenha as coordenadas do clique dentro do canvas
  let x = event.offsetX;
  let y = event.offsetY;
  
  // Faça algo com as coordenadas (por exemplo, desenhar um círculo)
  desenharCirculo(x, y);
});
w = canvas.canvas.width;
h = canvas.canvas.height;


const draw = (x, y, c, s = 5) => {
  canvas.fillStyle = c;
  canvas.fillRect(x, y, s, s);
};
const drawCircle = (x, y, c, s = 5) => {
  canvas.fillStyle = c;
  canvas.beginPath();
  canvas.arc(x, y, s, 0, Math.PI * 2, true);
  canvas.closePath();
  canvas.fill();
};
const particle = (x, y, c, m = 1) => {
  return { x: x, y: y, vx: 0, vy: 0, color: c, mass: m };
};

const random = (s = 450) => {
  return Math.random() * (s - 50) + 25; //centralizar
};

const particles = [];


const create = (quantity, color, mass = 5) => {
  group = [];
  for (let i = 0; i < quantity; i++) {
    group.push(particle(random(w), random(h), color, mass));
    particles.push(group[i]);
  }
  return group;
};

const rule = (part1, part2, g) => {
  for (let i = 0; i < part1.length; i++) {
    fx = 0;
    fy = 0;

    for (let j = 0; j < part2.length; j++) {
      a = part1[i];
      b = part2[j];
      dx = a.x - b.x;
      dy = a.y - b.y;
      d = Math.sqrt(dx * dx + dy * dy);

      F = (g * 1) / d;
      if (d > 0 && d < 80) {

        fx += F * dx;
        fy += F * dy;
      }
    }

    a.vx = (a.vx + fx) / a.mass;
    a.vy = (a.vy + fy) / a.mass;
    a.x += a.vx;
    a.y += a.vy;
    if (a.x <= 0 + 10 + a.mass || a.x >= w - 10 - a.mass) a.x -= a.vx * 3;
    if (a.y <= 0 + 10 + a.mass || a.y >= h - 10 - a.mass) a.y -= a.vy * 3;
  }
};

bagun = create(100, "aliceblue", 3);
yellow = create(400, "yellow", 3);
green = []//create(200, "green", 3);
black = create(2, "#000", 50);


const desenharCirculo=(x,y)=>{
  const bagun2 = particle(x, y, "aliceblue", 3);
  particles.push(bagun2);
  green.push(bagun2);
}

const update = () => {
  /*rule(green, green, 0.32);
  rule(yellow, black, 1);
  rule(green, black, -1);
  rule(black, black, -1);
  rule(green, yellow, -0.22);
  rule(yellow, green, -0.5);
  rule(bagun, green, -0.000005);
  rule(green, bagun, -0.5);
  rule(bagun, bagun, 0.5);*/

  //mini life
  rule(green, green, -.32);
  rule(green, bagun, -.17);
  rule(green, yellow, .34);
  rule(bagun, bagun, -.1);
  rule(bagun, green, -.34);
  rule(yellow, yellow, .15);
  rule(yellow, green, -.20);

  canvas.clearRect(0, 0, w, h);
  draw(0, 0, "#090909", w);
  for (i = 0; i < particles.length; i++) {
    drawCircle(
      particles[i].x,
      particles[i].y,
      particles[i].color,
      particles[i].mass
    );
  }
  requestAnimationFrame(update);
};

update();
