'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Testimonial } from '../../../types/content';
import styles from './TestimonialCard.module.css';

interface TestimonialCardProps extends Testimonial {
  compact?: boolean;
  active?: boolean;
}

export default function TestimonialCard({ name, text, rating, avatar, compact, active }: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const limit = compact ? 140 : 220;
  const isLongText = text.length > limit;
  const displayText = isLongText && !isExpanded ? `${text.substring(0, limit)}...` : text;

  return (
    <div className={`${styles.card} ${compact ? styles.cardCompact : ''} ${active ? styles.cardActive : ''}`}>
      <div className={styles.rating}>
        {Array.from({ length: rating }).map((_, i) => (
          <svg
            key={i}
            className={`${styles.star} ${compact ? styles.starCompact : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className={`${styles.quote} ${compact ? styles.quoteCompact : ''}`}>
        <p>&ldquo;{displayText}&rdquo;</p>
        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.readMoreBtn}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show Less' : 'Read Full Testimonial'}
          </button>
        )}
      </blockquote>
      <div className={`${styles.author} ${compact ? styles.authorCompact : ''}`}>
        <div className={styles.avatarWrapper}>
          <Image
            src={avatar}
            alt={name}
            width={compact ? 36 : 48}
            height={compact ? 36 : 48}
            className={styles.avatar}
          />
        </div>
        <div className={styles.meta}>
          <cite className={`${styles.name} ${compact ? styles.nameCompact : ''}`}>{name}</cite>
          <span className={`${styles.verified} ${compact ? styles.verifiedCompact : ''}`}>Verified Patient</span>
        </div>
      </div>
    </div>
  );
}

