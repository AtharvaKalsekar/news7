export enum LoadingStages {
  IDLE = "idle",
  PENDING = "pending",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

export type Loading = {
  loading: LoadingStages;
};
