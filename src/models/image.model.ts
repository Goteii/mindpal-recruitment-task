export interface CustomImage {
  src: string;
  loading: "eager" | "lazy";
  alt: string;
  className?: string;
}
