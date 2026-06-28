export type ImageType = {
  title: string;
  thumbnail: string;
  imageUrl: string;
  license: string;
};

export type ImageResponse = {
  pages: number;
  total: number;
  images: ImageType[];
};


