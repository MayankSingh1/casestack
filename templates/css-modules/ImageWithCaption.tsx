import Image from 'next/image';
import styles from './ImageWithCaption.module.css';

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1';
}

export function ImageWithCaption({
  src,
  alt,
  caption,
  fullWidth = false,
  aspectRatio = '16/9',
}: ImageWithCaptionProps) {
  const aspectClass = {
    '16/9': styles.aspect169,
    '4/3': styles.aspect43,
    '3/2': styles.aspect32,
    '1/1': styles.aspect11,
  }[aspectRatio];

  return (
    <figure className={`${styles.figure} ${fullWidth ? styles.fullWidth : ''}`}>
      <div className={`${styles.imageWrapper} ${aspectClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className={styles.image}
          sizes={fullWidth ? '100vw' : '(max-width: 768px) 100vw, 800px'}
        />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
