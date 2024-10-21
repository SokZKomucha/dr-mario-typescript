import { Colors } from "../configuration/colors";
import { Cell } from "./Cell";
import { Position } from "./Position";

export class Pill {
  public cellMiddle: Cell;
  public cellSide: Cell;
  public facing: "up" | "down" | "left" | "right" = "right";
  public rotation: number = 1;  // 0-up   1-right    2-down    3-left
  public get Cells() { return [this.cellMiddle, this.cellSide]; }

  constructor(positionMiddle: Position, colorMiddle: Colors, colorSide: Colors) {
    this.cellMiddle = new Cell(positionMiddle, colorMiddle);
    this.cellSide = new Cell(new Position(positionMiddle.x + 1, positionMiddle.y), colorSide);
    this.cellMiddle.texture = `${this.cellMiddle.color}_left`
    this.cellSide.texture = `${this.cellSide.color}_right`
  }

  public move(dx: number, dy: number) {
    this.cellMiddle.position.x += dx;
    this.cellMiddle.position.y += dy;
    this.cellSide.position.x += dx;
    this.cellSide.position.y += dy;
  }

  public rotate(direction: "left" | "right") {
    if (direction === "left" && this.rotation === 0) {
      this.rotation = 3;
    } else if (direction === "left" && this.rotation > 0) {
      this.rotation--;
    } else if (direction === "right" && this.rotation === 3) {
      this.rotation = 0;
    } else if (direction === "right" && this.rotation < 3) {
      this.rotation++;
    }

    if (direction === "left" && this.rotation === 0) {
      this.cellSide.position.x = this.cellMiddle.position.x;
      this.cellSide.position.y = this.cellMiddle.position.y - 1;
      this.cellMiddle.texture = `${this.cellMiddle.color}_down`
      this.cellSide.texture = `${this.cellSide.color}_up`
    } else if (direction === "left" && this.rotation === 1) {
      this.cellSide.position.x = this.cellMiddle.position.x + 1;
      this.cellSide.position.y = this.cellMiddle.position.y;
      this.cellMiddle.texture = `${this.cellMiddle.color}_left`
      this.cellSide.texture = `${this.cellSide.color}_right`
      this.move(0, 1);
    } else if (direction === "left" && this.rotation === 2) {
      this.cellSide.position.x = this.cellMiddle.position.x;
      this.cellSide.position.y = this.cellMiddle.position.y + 1;
      this.cellMiddle.texture = `${this.cellMiddle.color}_up`
      this.cellSide.texture = `${this.cellSide.color}_down`
      this.move(-1, -1);
    } else if (direction === "left" && this.rotation === 3) {
      this.cellSide.position.x = this.cellMiddle.position.x - 1;
      this.cellSide.position.y = this.cellMiddle.position.y;
      this.cellMiddle.texture = `${this.cellMiddle.color}_right`
      this.cellSide.texture = `${this.cellSide.color}_left`
      this.move(1, 0);
    } else if (direction === "right" && this.rotation === 0) {
      this.cellSide.position.x = this.cellMiddle.position.x;
      this.cellSide.position.y = this.cellMiddle.position.y - 1;
      this.cellMiddle.texture = `${this.cellMiddle.color}_down`
      this.cellSide.texture = `${this.cellSide.color}_up`
      this.move(-1, 0)
    } else if (direction === "right" && this.rotation === 1) {
      this.cellSide.position.x = this.cellMiddle.position.x + 1;
      this.cellSide.position.y = this.cellMiddle.position.y;
      this.cellMiddle.texture = `${this.cellMiddle.color}_left`
      this.cellSide.texture = `${this.cellSide.color}_right`
    } else if (direction === "right" && this.rotation === 2) {
      this.cellSide.position.x = this.cellMiddle.position.x;
      this.cellSide.position.y = this.cellMiddle.position.y + 1;
      this.cellMiddle.texture = `${this.cellMiddle.color}_up`
      this.cellSide.texture = `${this.cellSide.color}_down`
      this.move(0, -1);
    } else if (direction === "right" && this.rotation === 3) {
      this.cellSide.position.x = this.cellMiddle.position.x - 1;
      this.cellSide.position.y = this.cellMiddle.position.y;
      this.cellMiddle.texture = `${this.cellMiddle.color}_right`
      this.cellSide.texture = `${this.cellSide.color}_left`
      this.move(1, 1);
    } else {
      window.alert("Zabij się (czyt. Coś się wydarzyło, że metoda obracania pilla nie działa)")
    }
  }

  public setRotation(rotation: number) {
    while (this.rotation !== rotation) {
      this.rotate("left");
    }
  }
}
