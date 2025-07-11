declare global {
  interface Window {
    plausible: {
      (event: string, options?: { props: Record<string, any> }): void;
      q?: Array<[string, { props: Record<string, any> }]>;
    };
  }
}

export {};
