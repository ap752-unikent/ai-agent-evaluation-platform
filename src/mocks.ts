type EvalScore = {
    score: number;
    reason: string;
}

export const evaluationScores = [{
    score: 86,
    reason: "It was relevant to the conversation"
}, {
    score: 75,
    reason: "It was somewhat relevant to the conversation"
}, {
    score: 50,
    reason: "It was not helpful"
}, {
    score: 25,
    reason: "It was very unhelpful"
}, {
    score: 0,
    reason: "It was completely unhelpful"
}]