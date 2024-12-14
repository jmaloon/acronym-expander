import { DeepPartial } from "ai";
import { z } from "zod";

// define a schema for the acronym expansions
export const expansionSchema = z.object({
  expansions: z.array(z.string().describe("Text expansion of acronym")),
});

// define a type for the partial notifications during generation
export type PartialExpansion = DeepPartial<typeof expansionSchema>;
