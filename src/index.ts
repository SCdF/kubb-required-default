import { getThingsQueryParamsSchema as zodOnlySchema } from "./_generated/zod-only/getThingsSchema.ts";
import { getThingsQueryParamsSchema as zodTypedSchema } from "./_generated/zod-typed/getThingsSchema.ts";

/*
  THE ISSUE(s)

  I have two query parameters, both of them are optional with a default:

  parameters:
  - in: query
    name: limit
    description: Maximum number of things to return
    schema:
      type: integer
      minimum: 1
      maximum: 100
      default: 100
  - in: query
    name: skip
    description: Number of things to skip
    schema:
      type: integer
      minimum: 0
      default: 0

I believe both Zod and Typescript plugins are parsing this incorrectly.

Because my open api schema defines a default for both query params, this should
result in a type like so:
*/
type ExpectedType = {
  limit: number;
  skip: number;
};
const iExpectThisToWork = (params: ExpectedType) => {
  console.log(params.limit);
  console.log(params.skip);
};

/*
  However we have two issues.

  The first is that while sod has correctly detected that limit and skip are
  required because they default (https://github.com/kubb-labs/kubb/issues/1290),
  it still thinks the entire type is optional.
*/
type ZodOnlyActualDuckType =
  | {
      limit: number;
      skip: number;
    }
  | undefined;
const zodOnlyActualDuckType = (params: ZodOnlyActualDuckType) => {
  console.log(params);
};

console.log("Zod Only Schema");
const thingQuery = zodOnlySchema.parse({});
iExpectThisToWork(thingQuery); // this should compile!!
zodOnlyActualDuckType(thingQuery);

/*
  The second issue is that the Typescript plugin has incorrectly detected that
  both limit and skip are optional, even though they have defaults.

  Though interestingly it doesn't think that the entire type can be optional.
*/
type ZodTypedActualDuckType = {
  limit?: number;
  skip?: number;
};
const zodTypedActualDuckType = (params: ZodTypedActualDuckType) => {
  console.log(params);
};
console.log("Zod Typed Schema");
const thingTypedQuery = zodTypedSchema.parse({});
iExpectThisToWork(thingTypedQuery); // this should compile!!
zodTypedActualDuckType(thingTypedQuery);
