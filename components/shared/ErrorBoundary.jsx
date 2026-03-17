"use client";

import { Component } from "react";

/**
 * Generic error boundary. Catches render errors in child subtrees and shows
 * a minimal fallback instead of crashing the whole app.
 *
 * Usage:
 *   <ErrorBoundary fallback={<div>Something went wrong.</div>}>
 *     <SomeComponent />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Silent in production; can wire to a logging service here if needed
    if (process.env.NODE_ENV !== "production") {
      console.error("[ErrorBoundary]", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
