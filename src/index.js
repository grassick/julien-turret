import "./styles.css";
import kaboom from "kaboom";

// initialize context
kaboom({
  background: [0, 0, 0]
});

loadSprite("explosion", "exp2_0.png", {
  sliceX: 4,
  sliceY: 4,
  anims: {
    boom: {
      from: 0,
      to: 15
    }
  }
});
loadSprite("ufo", "ufo.png");

loadSprite("turret-red", "./turret-red.png");
loadSprite("turret-blue", "./turret-blue.png");
loadSprite("missile", "missile.png");
scene("main", () => {

// load a default sprite


// add character to screen, from a list of components
const blue = add([
  sprite("turret-blue"),
  scale(0.1),
  pos(120, height() - 10),
  origin("bot")
]);

const red = add([
  sprite("turret-red"),
  scale(0.1),
  pos(width() - 120, height() - 10),
  origin("bot")
]);

onKeyDown("a", () => {
  blue.move(-280, 0);
});

onKeyDown("d", () => {
  blue.move(280, 0);
});

onKeyDown("4", () => {
  red.move(-280, 0);
});

onKeyDown("6", () => {
  red.move(280, 0);
});



keyPress("5", () => {
  add([
    sprite("missile"),
    pos(red.pos.x, red.pos.y - 90),
    scale(0.1),
    rotate(-90),
    origin("center"),
    color(200, 100, 100),
    move(UP, 250),
    area(),
    cleanup(),
    "missile"
  ]);
});

keyPress("s", () => {
  add([
    sprite("missile"),
    pos(blue.pos.x, blue.pos.y - 90),
    scale(0.1),
    rotate(-90),
    origin("center"),
    color(100, 100, 200),
    move(UP, 250),
    area(),
    cleanup(),
    "missile"
  ]);
});


loop(0.4, () => {
  add([
    sprite("ufo"),
    move(DOWN, 250),
    pos(rand(width()-20), 0),
    area(),
    scale(0.3),
    cleanup(),
    "ufo"
  ]);
});


onCollide("missile", "ufo", (m, u) => {
  const e = add([sprite("explosion"), pos(u.pos), scale(0.9)]);
  e.play("boom");

  destroy(u);
  destroy(m);
  wait(1, () => {
    destroy(e);
  });
});
onUpdate("ufo", (u) => {
  if (u.pos.y > height()) {
    go("start")
    //alert("game over");
  }
});
})
scene("start", () => {
  add([
    pos(width()/2, 100),
    origin("center"),
    color(0, 0, 250),
    text(`Julien's game!`, 40),
  ])

  keyPress("enter", () => {
    go("main")
  })
})
go("start")