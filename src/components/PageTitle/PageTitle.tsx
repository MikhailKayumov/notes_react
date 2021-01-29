import React from 'react';
import styles from './PageTitle.module.scss';

const PageTitle: React.FC<{ title: string }> = ({ title }): JSX.Element => (
    <div className={[styles.PageTitle, 'container'].join(' ')}>
        <h1>{title}</h1>
    </div>
);

export default PageTitle;