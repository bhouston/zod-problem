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

This doesn't make sense because the data returned isn't valid.