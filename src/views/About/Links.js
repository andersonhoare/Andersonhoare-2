import React from 'react';
import { Center, palette, Typography } from '../../style';
import { route } from '../../routes';
import FooterLink from '../../components/FooterLink';

export default () => {
  return (
    <FooterLink>
      <Typography.LinkLarge to={route.clients}>
        What we offer our clients
      </Typography.LinkLarge>
    </FooterLink>
  );
};
