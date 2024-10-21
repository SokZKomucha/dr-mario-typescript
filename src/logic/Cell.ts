import { Position } from "./Position";
import { Colors } from "../configuration/colors";

export class Cell {
  public position: Position;
  public color: Colors;
  public type: "normal" | "virus" = "normal";
  public texture = "";
  public visible = true;

  public constructor(position: Position, color: Colors) {
    this.position = position;
    this.color = color;
    
  }
}