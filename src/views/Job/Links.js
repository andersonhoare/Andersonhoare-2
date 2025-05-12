import React from 'react';
import { Center, palette, Typography } from '../../style';
import { route } from '../../routes';
import { toPostUrl } from '../../utils';
import FooterLink from '../../components/FooterLink';

export const ApplyNow = ({ job_reference, title, createdAt }) => {
  return (
    <FooterLink>
      <Typography.LinkLarge
        to={`${route.apply}/${toPostUrl({
          createdAt: createdAt,
          title: title,
          job_reference
        })}`}
      >
        Apply now
      </Typography.LinkLarge>
    </FooterLink>
  );
};

export default () => {
  return (
    <FooterLink>
      <Typography.LinkLarge to={route.register}>
        Register your CV
      </Typography.LinkLarge>
    </FooterLink>
  );
};
