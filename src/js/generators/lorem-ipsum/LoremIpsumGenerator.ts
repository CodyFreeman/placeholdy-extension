import { LoremIpsum } from "lorem-ipsum";
import { LoremIpsumGeneratorInterface } from "./LoremIpsumGeneratorInterface";

/**
 * Prototype lorem ipsum generator
 *
 * This prototype will be replaced. UNSTABLE API
 */
export class LoremIpsumGenerator implements LoremIpsumGeneratorInterface {
  constructor(protected LoremIpsum: LoremIpsum) {}

  /**
   * Generates a paragraph
   *
   * This prototype will be replaced. UNSTABLE API
   */
  public generate(maxWords: number): string {
    if (!maxWords || typeof maxWords !== "number" || maxWords < 1) {
      // TODO: handle invalid params (also check Infinity) in real generator
      console.debug(
        `words parameter passed to lorem ipsum generate: ${maxWords}`
      );
      throw new Error("invalid parameters given to lorem ipsum generator");
    }

    return this.generateParagraph(maxWords);
  }

  protected generateParagraph(
    minWords: number,
    currentParagraph: string = ""
  ): string {
    if (minWords <= 0) {
      return currentParagraph;
    }
    const sentence = this.LoremIpsum.generateSentences(1);
    return this.generateParagraph(
      minWords - this.countWords(sentence),
      currentParagraph.concat(sentence, " ")
    );
  }

  protected countWords(text: string): number {
    return text.split(" ").length;
  }
}
