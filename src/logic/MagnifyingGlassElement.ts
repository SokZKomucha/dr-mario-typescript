import { imageOverlay } from "leaflet";
import { textureMappings } from "../configuration/textureMappings";
import { Colors } from "../configuration/colors";
import { Position } from "./Position";
import { positions } from "./MagnifyingGlass";

export class MagnifyingGlassElement {
  public color: Colors;
  public currentFrame = 1;
  public element: HTMLImageElement;
  public laughing = false;
  public position: Position;
  public positionIndex: number;

  constructor(color: Colors, positionIndex: number) {
    this.element = document.createElement("img");
    this.color = color;
    this.positionIndex = positionIndex;
    this.position = positions[this.positionIndex];

    this.element.classList.add("virus");
    this.element.src = textureMappings.get(`v_${this.color}_${this.currentFrame}`)!
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }

  nextFrame() {
    if (!this.laughing) {
      this.currentFrame = this.currentFrame === 4 ? 1 : this.currentFrame + 1;
    } else {
      this.currentFrame = this.currentFrame === 2 ? 4 : 2;
    }
    this.element.src = textureMappings.get(`v_${this.color}_${this.currentFrame}`)!
  }

  updatePosition(positionIndex = this.positionIndex) {
    this.positionIndex = positionIndex;
    this.position = positions[this.positionIndex];
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }
}