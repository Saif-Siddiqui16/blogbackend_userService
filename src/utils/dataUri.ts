import DataURIParser from "datauri/parser";
import path from "path";

export const getBuffer = (file: any) => {
  const parser = new DataURIParser();
  const ext = path.extname(file.oridinalname).toString();
  const dataUri = parser.format(ext, file.buffer);
  return dataUri;
};
