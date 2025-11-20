import type { HeaderProps } from "./types";

export function useHeader(props: HeaderProps) {
  return {
    title: props.title,
    subtitle: props.subtitle,
  };
}
