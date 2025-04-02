import React from 'react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {(new Date().getFullYear())}</p>
    </footer>
  );
}
