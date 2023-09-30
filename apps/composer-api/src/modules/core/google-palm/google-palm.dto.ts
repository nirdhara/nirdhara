export interface GenerateTextForm {
  prompt: Prompt;
}

interface Prompt {
  text: string;
}

export interface GenerateTextResult {
  candidates: Candidate[];
}

interface Candidate {
  output: string;
  safetyRatings: SafetyRating[];
}

interface SafetyRating {
  category: string;
  probability: string;
}
