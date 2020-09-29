import React from 'react';

import classes from './TextLink.module.scss';

type TextLinkProps = {
  url: string;
  children: React.ReactNode;
  target?: '_new' | '_blank' | '_self';
};

const TextLink: React.FC<TextLinkProps> = ({ url, children, target }) => {
  return (
    <a href={url} className={classes.textLink} target={target || '_self'}>
      {children}
    </a>
  );
};

export default TextLink;
