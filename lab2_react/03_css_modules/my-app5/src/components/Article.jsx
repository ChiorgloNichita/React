import React from 'react';

import styles from './Article/Article.module.scss';

export default function Article({title, text}) {
    return (
      <article className={styles.article}>
        <h2 className={styles.article__title}>{title}</h2>
        <p>{text}</p>
      </article>
    );
}
