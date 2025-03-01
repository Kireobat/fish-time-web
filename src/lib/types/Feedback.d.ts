interface Feedback {
    type: "error" | "success" | "info" | "warn";
    message: string;
}