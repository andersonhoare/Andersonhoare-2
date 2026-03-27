import React from 'react';
import { Center, palette, Typography } from '../../style';
import FooterLink from '../../components/FooterLink';
import { route } from '../../routes';

export default () => {
  return (
    <FooterLink>
        <Typography.LinkLarge as="a" href="mailto:enquiries@andersonhoare.co.uk">
        Register your CV
      </Typography.LinkLarge>
      <Typography.LinkLarge to={route.jobs}>
        Go to jobs board
      </Typography.LinkLarge>
    </FooterLink>
  );
};
