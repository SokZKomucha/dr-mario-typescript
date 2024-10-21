import { MagnifyingGlassElement } from "./MagnifyingGlassElement";
import { Position } from "./Position";

export class MagnifyingGlass {
  public container: HTMLDivElement;
  public virusBlue: MagnifyingGlassElement;
  public virusBrown: MagnifyingGlassElement;
  public virusYellow: MagnifyingGlassElement;

  constructor() {
    this.container = document.createElement("div");
    this.container.style.width = "176px";
    this.container.style.height = "176px";
    this.container.style.top = "202px";
    this.container.style.left = "32px";
    
    this.virusBlue = new MagnifyingGlassElement("cornflowerblue", 1);
    this.virusBrown = new MagnifyingGlassElement("red", 6);
    this.virusYellow = new MagnifyingGlassElement("orange", 11);

    for (const v of [this.virusBlue, this.virusBrown, this.virusYellow]) {
      const element = v.element;
      element.width = 64;
      element.height = 48;
      this.container.appendChild(element);
    }
  }
  
  nextFrame() {
    [this.virusBlue, this.virusBrown, this.virusYellow].forEach(e => e.nextFrame());
  }

  nextPosition() {
    [this.virusBlue, this.virusBrown, this.virusYellow].forEach(e => {
      e.positionIndex = (e.positionIndex + 1) % positions.length;
      e.updatePosition();
    });
  }

  setLaughing() {
    [this.virusBlue, this.virusBrown, this.virusYellow].forEach(e => e.laughing = true);
  }
}

export const positions: Position[] = [
  new Position(55, 120),//
  new Position(82, 110),//
  new Position(90, 95),//
  new Position(100, 82),//
  new Position(105, 65),//
  new Position(98, 44),//
  new Position(90, 30),//
  new Position(69, 16),//
  new Position(50, 10),//
  new Position(30, 24),//
  new Position(15, 36),//
  new Position(10, 50),//
  new Position(5, 65),//
  new Position(10, 84),//
  new Position(25, 101),//
  new Position(40, 110)//
];