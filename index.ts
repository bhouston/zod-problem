import { z } from "zod";

enum FileRole {
    AVATAR = 'AVATAR',
    DOCUMENT = 'DOCUMENT',
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO',
    OTHER = 'OTHER',
}

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


  const data = {
    orgName: 'orgName',
    projectName: 'projectName',
    assetName: 'assetName',
    role: FileRole.AVATAR,
  }

  const result = unionSchema.parse(data);
  console.log(result);

