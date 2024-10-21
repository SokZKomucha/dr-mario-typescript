import { BoardAnimationFrame } from "../logic/BoardAnimation";
import { refreshRate } from "./config";

export const animationFrames = new Map<string, BoardAnimationFrame[]>();

animationFrames.set("cornflowerblue_v", [
  new BoardAnimationFrame("covid_blue_1.png", refreshRate / 2),
  new BoardAnimationFrame("covid_blue_2.png", refreshRate / 2)
]);

animationFrames.set("red_v", [
  new BoardAnimationFrame("covid_brown_1.png", refreshRate / 2),
  new BoardAnimationFrame("covid_brown_2.png", refreshRate / 2)
]);

animationFrames.set("orange_v", [
  new BoardAnimationFrame("covid_yellow_1.png", refreshRate / 2),
  new BoardAnimationFrame("covid_yellow_2.png", refreshRate / 2)
]);



animationFrames.set("cornflowerblue_v_death", [
  new BoardAnimationFrame("bl_x.png", refreshRate / 1.5)
]);

animationFrames.set("red_v_death", [
  new BoardAnimationFrame("br_x.png", refreshRate / 1.5)
]);

animationFrames.set("orange_v_death", [
  new BoardAnimationFrame("yl_x.png", refreshRate / 1.5)
]);

animationFrames.set("cornflowerblue_death", [
  new BoardAnimationFrame("bl_o.png", refreshRate / 1.5)
]);

animationFrames.set("red_death", [  // Red dead redemption 2 referencja?
  new BoardAnimationFrame("br_o.png", refreshRate / 1.5)
]);

animationFrames.set("orange_death", [
  new BoardAnimationFrame("yl_o.png", refreshRate / 1.5)
]);