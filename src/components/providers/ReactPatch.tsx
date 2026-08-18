"use client";

import React from "react";

// Client-side patch for React 19 compatibility with older React 18 sub-dependencies
if (typeof window !== "undefined") {
  try {
    const r = React as unknown as {
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
        ReactCurrentBatchConfig?: { transition: unknown };
      };
      __CLIENT_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
        ReactCurrentBatchConfig?: { transition: unknown };
      };
    };

    const target =
      r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED ||
      r.__CLIENT_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

    if (target && !target.ReactCurrentBatchConfig) {
      target.ReactCurrentBatchConfig = { transition: null };
    }

    if (!r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED && target) {
      r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = target;
    }
  } catch {
    // Ignore if not applicable
  }
}

export function ReactPatch({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
