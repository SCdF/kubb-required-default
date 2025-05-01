import { getThingsQueryParamsSchema as zodOnlySchema } from "./_generated/zod-only/getThingsSchema.ts";
import { getThingsQueryParamsSchema as zodTypedSchema } from "./_generated/zod-typed/getThingsSchema.ts";

// because my open api schema defines a default for both query params
// - neither of them should be number | undefined
// - the entire type should not be able to be undefined
type ExpectedType = {
  limit: number;
  skip: number;
};
const iExpectThisToWork = (params: ExpectedType) => {
  console.log(params.limit);
  console.log(params.skip);
};

type ZodOnlyActualType =
  | {
      limit: number;
      skip: number;
    }
  | undefined;
const zodOnlyActualType = (params: ZodOnlyActualType) => {
  console.log(params);
};

console.log("Zod Only Schema");
const thingQuery = zodOnlySchema.parse({});
// iExpectThisToWork(thingQuery);
zodOnlyActualType(thingQuery);

type ZodTypedActualType = {
  limit?: number;
  skip?: number;
};
const zodTypedActualType = (params: ZodTypedActualType) => {
  console.log(params);
};
console.log("Zod Typed Schema");
const thingTypedQuery = zodTypedSchema.parse({});
// iExpectThisToWork(thingTypedQuery);
zodTypedActualType(thingTypedQuery);
