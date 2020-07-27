import { LoremIpsum } from "lorem-ipsum";
import { LoremIpsumGeneratorInterface } from "./LoremIpsumGeneratorInterface";

export class LoremIpsumGenerator implements LoremIpsumGeneratorInterface {
  constructor(protected LoremIpsum: LoremIpsum) {}

  public generate(words: number): string {
    if (!words || typeof words !== "number" || words < 1) {
      // TODO: handle invalid params (also check Infinity)
      console.debug(`words parameter passed to lorem ipsum generate: ${words}`);
      throw new Error("invalid parameters given to lorem ipsum generator");
    }
    return this.LoremIpsum.generateWords(words);
  }
}
