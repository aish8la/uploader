import fs from "fs/promises";

export const deleteFile = async (filePath: string) => {
  return await fs.rm(filePath);
};
