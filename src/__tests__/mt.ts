import {Suggestion} from "wordmap";
import WordMT from "../Translator";

describe("MT", () => {
    it("has no corpus", () => {
        const mt = new WordMT();
        const result = mt.translate("Βίβλος γενέσεως Ἰησοῦ Χριστοῦ υἱοῦ Δαυὶδ υἱοῦ Ἀβραάμ.");
        expect(result.length).toEqual(0);
    });

    it("only has saved alignments", () => {
        const mt = new WordMT();
        const source = "Βίβλος γενέσεως Ἰησοῦ Χριστοῦ υἱοῦ Δαυὶδ υἱοῦ Ἀβραάμ.";
        mt.appendAlignmentMemoryString("Βίβλος", "book");
        mt.appendAlignmentMemoryString("γενέσεως", "genealogy");
        const result: Suggestion[] = mt.translate(source);
        expect(result[0].toString()).toEqual("1 [1|n:βίβλος->n:book] [1|n:γενέσεως->n:genealogy]");
    });

    it("has the input as corpus", () => {
        const mt = new WordMT();
        const source = "Βίβλος γενέσεως Ἰησοῦ Χριστοῦ υἱοῦ Δαυὶδ υἱοῦ Ἀβραάμ.";
        const target = "The book of the genealogy of Jesus Christ, son of David, son of Abraham:";
        mt.appendCorpus([[source, target]]);
        const result: Suggestion[] = mt.translate(source);
        console.log("input as corpus\n", result.map((s) => {
                return s.toString();
            })
        );
    });

    it("has saved alignments, and the input as corpus", () => {
        const mt = new WordMT();
        const source = "Βίβλος γενέσεως Ἰησοῦ Χριστοῦ υἱοῦ Δαυὶδ υἱοῦ Ἀβραάμ.";
        const target = "The book of the genealogy of Jesus Christ, son of David, son of Abraham:";
        mt.appendCorpus([[source, target]]);
        mt.appendAlignmentMemoryString("Βίβλος", "book");
        mt.appendAlignmentMemoryString("γενέσεως", "genealogy");
        mt.appendAlignmentMemoryString("Χριστοῦ", "Christ");
        const result: Suggestion[] = mt.translate(source);
        console.log("input as corpus\n", result.map((s) => {
                return s.toString();
            })
        );
    });
});
