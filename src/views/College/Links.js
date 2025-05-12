import React from 'react';
import { Center, palette, Typography } from '../../style';
import { route } from '../../routes';
import FooterLink from '../../components/FooterLink';

export default () => {
  return (
    <FooterLink>
      <Typography.LinkLarge to={route.blog}>Our blog</Typography.LinkLarge>
    </FooterLink>
  );
};
