import React from 'react';
import { Link } from '@/components/next/link';

export const Logo = ({ title }) => {
  return (
    <Link
      href="/"
      style={{
        color: `inherit`
      }}
    >
      {title}
    </Link>
  );
};
