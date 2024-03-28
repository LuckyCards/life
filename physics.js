const canvas = document.getElementById("life").getContext("2d");
document.getElementById("life").addEventListener("click", function (event) {
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
      distDiff = a.mass + b.mass - d;
      /*console.log(distDiff, d)
      console.log(a.mass + b.mass)*/
      if (d === 0)
        continue;

      if (distDiff <= 0 && d < 8000) {

        fx += F * dx;
        fy += F * dy;
      } else if (distDiff > 0) {
        dirX = a.x - b.x;
        dirY = a.y - b.y;
        dist = Math.sqrt(dirX * dirX + dirY * dirY) * -1;

        vetorNX = dirX / dist;
        vetorNY = dirY / dist;
        a.x = a.x - vetorNX * distDiff
        a.y = a.y - vetorNY * distDiff
      }
    }

    a.vx = (a.vx + fx) / a.mass;
    a.vy = (a.vy + fy) / a.mass;
    a.x += a.vx;
    a.y += a.vy;
    if (a.x <= 0 + 30 + a.mass || a.x >= w - 30 - a.mass) a.x -= a.vx * 3;
    if (a.y <= 0 + 30 + a.mass || a.y >= h - 30 - a.mass) a.y -= a.vy * 3;
  }
};

green = create(20, "green", 80);


const desenharCirculo = (x, y) => {
  const bagun2 = particle(x, y, "aliceblue", 3);
  //particles.push(bagun2);
  //green.push(bagun2);
}

const update = () => {
  rule(green, green, -.32);

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
  //requestAnimationFrame(update);
};
update();
setInterval(() => {
  update();

}, 200);
