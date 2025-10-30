# Problematic Zod Behavior

This project uses a non-discriminated union:

```tsx
const unionSchema = z.union([
    z.object({
        orgName: z.string(),
        role: z.enum(FileRole).optional(),
    }),
    z.object({
        orgName: z.string(),
        projectName: z.string(),
        role: z.enum(FileRole).optional(),
    }),
    z.object({
        orgName: z.string(),
        projectName: z.string(),
        assetName: z.string(),
        role: z.enum(FileRole).optional(),
    }),
]);
```

It is expected that the data must confirm exactly to one of the sub-schemas in this union, otherwise it will not pass.

But when I try to parse this data:

```tsx
const data = {
    orgName: 'orgName',
    projectName: 'projectName',
    assetName: 'assetName',
    role: FileRole.AVATAR,
}

const result = unionSchema.parse(data);
```

I get this result:
```json
{ orgName: 'orgName', role: 'AVATAR' }
```

It seems that unions do not try to maximize the amount of data that passes through, rather the first match, even if it is lossy, is chosen.

Because this gets the right answer:

```tsx
const unionReserveOrderSchema = z.union([
    z.object({
        orgName: z.string(),
        projectName: z.string(),
        assetName: z.string(),
        role: z.enum(FileRole).optional(),
    }),
    z.object({
        orgName: z.string(),
        projectName: z.string(),
        role: z.enum(FileRole).optional(),
    }),
    z.object({
        orgName: z.string(),
        role: z.enum(FileRole).optional(),
    }),
]);


const result2 = unionReserveOrderSchema.parse(data);
console.log(result2);
```

Which is:

```json
{
  orgName: 'orgName',
  projectName: 'projectName',
  assetName: 'assetName',
  role: 'AVATAR'
}
```