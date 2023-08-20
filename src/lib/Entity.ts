import { UUID, randomUUID } from "crypto";
import Attibute from "./Attribute";
export default class Entity {
  private attributes: Attibute[] = [];
  private constructor(private id: UUID, private name: string) {}
  static withName(name: string): Entity {
    return new Entity(randomUUID(), name);
  }
  addAttribute(attibute: Attibute): Entity {
    this.attributes.push(attibute);
    return this;
  }
  getAttributes() {
    return this.attributes;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
}
