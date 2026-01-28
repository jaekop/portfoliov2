import * as ort from "onnxruntime-web";

let session: ort.InferenceSession | null = null;

export async function loadModel(url: string) {
  session = await ort.InferenceSession.create(url);
  return session;
}

export async function run(input: ort.InferenceSession.OnnxValueMapType) {
  if (!session) {
    throw new Error("Model not loaded");
  }
  return session.run(input);
}
