"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { colors, typography, spacing } from '../styles/constants';

export default function FeedbackPage() {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, name, email, feedback });
    alert('Thank you for your feedback!');
    // Reset form
    setRating(0);
    setFeedback('');
    setName('');
    setEmail('');
  };

  const styles = {
    container: {
      padding: spacing.xl,
      fontFamily: typography.fontFamily.primary,
      maxWidth: '800px',
      margin: '0 auto',
    },
    header: {
      marginBottom: spacing.xl,
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '1.2rem',
      color: '#000',
      marginBottom: '1.5rem',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0,
    },
    backArrow: {
      fontSize: '1.5rem',
      marginRight: '0.5rem',
    },
    title: {
      color: colors.charlesBlue,
      fontSize: '2.5rem',
      fontWeight: typography.fontWeight.bold,
      margin: 0,
      marginBottom: spacing.sm,
    },
    description: {
      fontSize: '1rem',
      color: colors.supportingGrays.dark,
      lineHeight: typography.lineHeight.normal,
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: spacing.lg,
    },
    fieldset: {
      border: 'none',
      padding: 0,
      margin: 0,
    },
    label: {
      display: 'block',
      fontSize: '1.1rem',
      fontWeight: typography.fontWeight.medium,
      color: colors.charlesBlue,
      marginBottom: spacing.sm,
    },
    starsContainer: {
      display: 'flex',
      gap: spacing.sm,
    },
    star: {
      cursor: 'pointer',
      fontSize: '2rem',
    },
    textarea: {
      width: '100%',
      minHeight: '150px',
      padding: spacing.md,
      border: `1px solid ${colors.supportingGrays.medium}`,
      borderRadius: '4px',
      fontSize: '1rem',
      fontFamily: typography.fontFamily.primary,
      resize: 'vertical' as const,
      backgroundColor: colors.white,
      color: colors.charlesBlue,
      outline: 'none',
    },
    input: {
      width: '100%',
      padding: spacing.md,
      border: `1px solid ${colors.supportingGrays.medium}`,
      borderRadius: '4px',
      fontSize: '1rem',
      fontFamily: typography.fontFamily.primary,
      outline: 'none',
			backgroundColor: colors.white,
			color: colors.charlesBlue,
    },
    optional: {
      fontSize: '0.9rem',
      color: colors.supportingGrays.dark,
      marginLeft: spacing.sm,
    },
    submitButton: {
      backgroundColor: colors.freedomTrailRed,
      color: colors.white,
      padding: `${spacing.md} ${spacing.xl}`,
      border: 'none',
      borderRadius: '4px',
      fontSize: '1.1rem',
      fontWeight: typography.fontWeight.medium,
      cursor: 'pointer',
      alignSelf: 'flex-start',
      transition: 'background-color 0.2s',
      ':hover': {
        backgroundColor: '#d32f2f',
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link href="/" passHref>
          <button style={styles.backButton}>
            <span style={styles.backArrow}>←</span>
          </button>
        </Link>
        <h1 style={styles.title}>Share Your Feedback</h1>
        <p style={styles.description}>
          We value your input! Please share your thoughts about our website
          and how we can improve your experience.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <fieldset style={styles.fieldset}>
          <label style={styles.label}>How would you rate your experience?</label>
          <div style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                style={styles.star}
                color={star <= (hover || rating) ? colors.optimisticBlue : colors.supportingGrays.light}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>
        </fieldset>

				<fieldset style={styles.fieldset}>
          <label style={styles.label}>
            Name <span style={styles.optional}>(optional)</span>
          </label>
          <input
            type="text"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </fieldset>

        <fieldset style={styles.fieldset}>
          <label style={styles.label}>
            Email <span style={styles.optional}>(optional)</span>
          </label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
          />
        </fieldset>

        <fieldset style={styles.fieldset}>
          <label style={styles.label}>Your Feedback</label>
          <textarea
            style={styles.textarea}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Please share your thoughts, suggestions, or concerns..."
            required
          />
        </fieldset>

        <button type="submit" style={styles.submitButton}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
} 