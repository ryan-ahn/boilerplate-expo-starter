import { ERROR_DISPLAY_MESSAGES } from "@constants/errorMessages";

export type ErrorSource = "repository" | "service";

// 에러 통합 관리
export interface AppErrorOptions {
  source: ErrorSource;
  code: string;
  message: string;
  cause?: unknown;
  context?: Record<string, unknown>;
}

export class AppError extends Error {
  readonly source: ErrorSource;
  readonly code: string;
  readonly context?: Record<string, unknown>;
  readonly cause?: unknown;
  constructor({ source, code, message, cause, context }: AppErrorOptions) {
    super(message);
    this.name = "AppError";
    this.source = source;
    this.code = code;
    this.context = context;
    this.cause = cause;
  }
}

const getCauseMessage = (cause: unknown): string | undefined => {
  if (cause instanceof Error) return cause.message;
  if (
    cause &&
    typeof cause === "object" &&
    "message" in cause &&
    typeof (cause as { message: unknown }).message === "string"
  ) {
    return (cause as { message: string }).message;
  }
  return undefined;
};

export function createRepoError(options: {
  code: string;
  message?: string;
  cause?: unknown;
  context?: Record<string, unknown>;
}): AppError {
  const { code, message, cause, context } = options;
  const baseMessage =
    message ?? getCauseMessage(cause) ?? "레포지토리 오류가 발생했습니다.";
  return new AppError({
    source: "repository",
    code,
    message: baseMessage,
    cause,
    context,
  });
}

export function handleServiceError(
  error: unknown,
  {
    code,
    message,
    context,
  }: {
    code: string;
    message?: string;
    context?: Record<string, unknown>;
  },
): never {
  if (error instanceof AppError) {
    console.log(`🚨\nmessage: ${error.message},\ncode: ${error.code}`);
    throw error;
  }
  console.log(`🚨\nmessage: ${error},\ncode: ${code}`);
  throw new AppError({
    source: "service",
    code,
    message: message ?? "서비스 오류가 발생했습니다.",
    cause: error,
    context,
  });
}

export function getDisplayMessage(error: unknown): string {
  if (error instanceof AppError) {
    return ERROR_DISPLAY_MESSAGES[error.code] ?? error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return ERROR_DISPLAY_MESSAGES["APP/ERROR_DEFAULT"];
}
