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

      //F = (g * 1) / d;
      F = (g * a.mass * b.mass) / Math.pow(d, 2);
      total_mass = a.mass + b.mass;
      distDiff = a.mass + b.mass - d;
      /*console.log(distDiff, d)
      console.log(a.mass + b.mass)*/
      if (d === 0)
        continue;

      if (distDiff <= 0 && d < 4000) {
        fx += F * dx;
        fy += F * dy;

      } else if (distDiff > 1) {
        dirX = a.x - b.x;
        dirY = a.y - b.y;
        dist = Math.sqrt(dirX * dirX + dirY * dirY) * -1;
        vetorNX = dirX / dist;
        vetorNY = dirY / dist;

        //reposition
        a.x = a.x - (vetorNX * distDiff) / 2
        a.y = a.y - (vetorNY * distDiff) / 2
        b.x = b.x - (vetorNX * distDiff) / 2 * -1
        b.y = b.y - (vetorNY * distDiff) / 2 * -1
        
        //bounce
        
        rel_vx = b.vx - a.vx;
        rel_vy = b.vy - a.vy;
        rel_vel = ((rel_vx * vetorNX) + (rel_vy * vetorNY))/1.2
        a.vx += (vetorNX * rel_vel * (2 * b.mass) / total_mass);
        a.vy += (vetorNY * rel_vel * (2 * b.mass) / total_mass);
        b.vx -= (vetorNX * rel_vel * (2 * a.mass) / total_mass);
        b.vy -= (vetorNY * rel_vel * (2 * a.mass) / total_mass);
        //a.vx *= -1
        //a.vy *= -1
        //b.vx *= -1
        //b.vy *= -1
        
        //algum tipo de pressão quanto mais tempo ele passar sem tocar nada vai acumulando a pressão
        // necessário 3ª lei de newton
        // de alguma forma setar ele para ser imovel, assim assignar a posição aos 2 ao a e ao b?
      }
    }

    a.vx = (a.vx) + fx / a.mass;
    a.vy = (a.vy) + fy / a.mass;
    a.x += a.vx;
    a.y += a.vy;
    if (a.x <= 0 + 10 + a.mass) { a.x = 10 + a.mass; a.vx *= -0.5 }
    if (a.x >= w - 10 - a.mass) { a.x = w - 10 - a.mass; a.vx *= -0.5 }
    if (a.y <= 0 + 10 + a.mass) { a.y = 10 + a.mass; a.vy *= -0.5 }
    if (a.y >= h - 10 - a.mass) { a.y = h - 10 - a.mass; a.vy *= -0.5 }
    /*
    if (a.x <= 0 + 150 + a.mass || a.x >= w - 150 - a.mass) a.x -= a.vx - .1 * -1;
    if (a.y <= 0 + 150 + a.mass || a.y >= h - 150 - a.mass) a.y -= a.vy + .1 * -1;*/
  }
};

green = create(2, "green", 30);
red = create(0, "red", 30);


const desenharCirculo = (x, y) => {
  const bagun2 = particle(x, y, "green", 30);
  particles.push(bagun2);
  green.push(bagun2);
}

const update = () => {
  rule(green, green, -.1);
  rule(green, red, -.1);

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
/*setInterval(() => {
  update();

}, 200);*/
