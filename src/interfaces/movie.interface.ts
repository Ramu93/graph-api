interface Properties {
  tagline: string;
  title: string;
  release: number;
}

export interface Movie {
  identity: number;
  labels: string[];
  properties: Properties;
}
