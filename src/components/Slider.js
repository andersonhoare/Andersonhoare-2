import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Center, palette, media, Typography } from '../style';
import { useGallery } from '../hooks';
import pose from 'react-pose';
import { toPostUrl, formatSalary, truncate } from '../utils';
import { route } from '../routes';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';
import QuoteMarkIcon from './icons/QuoteMark';

const cssOuter = css`
  background: ${palette.grey};
`;

const fade = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const PoseAnim_ = pose.li({
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
});

const PoseAnim = styled(PoseAnim_)`
  /* height: 18rem; */
`;

const TestimonyComponent = styled.div`
  color: ${palette.primary};

  display: grid;

  justify-content: space-between;
  align-items: flex-start;
  grid-gap: 2rem;

  ${media.mobile`
    padding: 0 1rem;
    align-items: center;
    text-align: center;
  `}
}
`;

const Slider = styled.div`
  display: grid;
  grid-template:
    'arrowLeft content arrowRight' auto
    / 1fr 2fr 1fr;
  align-items: center;
  padding: 4rem 0;
  animation: ${fade} 2s linear 1;

  ${media.mobile`
  grid-template:
    'content content' auto
    'arrowLeft arrowRight' auto
    / 1fr 1fr;
    padding: 6rem 0;
    grid-gap: 3rem;
  `};
`;

const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  border: 1px solid
    ${({ orangeArrows }) =>
      orangeArrows ? palette.secondaryAccent : palette.accent};
  border-radius: 100rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${({ css }) => css};
`;

const arrowLeftCss = css`
  justify-self: center;
  grid-area: arrowLeft;

  ${media.mobile`
    justify-self: flex-end;
  `}

  svg {
    width: auto;
    height: 1.6rem;
    margin-left: 0.4rem;
  }
`;

const arrowRightCss = css`
  justify-self: center;
  grid-area: arrowRight;
  ${media.mobile`
    justify-self: flex-start;
  `}
  svg {
    width: auto;
    height: 1.6rem;
    margin-right: 0.4rem;
  }
`;

const DotWrap = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 2rem;
  justify-content: center;
  margin-top: 3rem;
`;

const Dot = styled.li`
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
  ${({ active }) =>
    active
      ? css`
          background: ${palette.accent};
          border: 1px solid ${palette.accent};
        `
      : css`
          background: transparent;
          border: 1px solid ${palette.accent};
        `};
  border-radius: 100rem;
`;

const JobComponent = styled.div`
  color: ${palette.primary};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  /* padding: 0 4rem; */

  > :first-child {
    padding-bottom: 1rem;
  }

  > :last-child {
    padding-top: 3rem;
  }
`;

const Content = styled.div`
  height: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-area: content;
  ${media.mobile`
    height: auto;
  `}
`;

const QuoteMark = styled.div`
  ${media.mobile`
      display: grid;
      justify-items: center;
  `}
  svg {
    display: flex;
    width: 1.8rem;
    height: 1.8rem;
    ${media.mobile`
      width: 2.8rem;
      height: 2.8rem;
  `}
  }
`;

const Testimony = ({ body, name, description, pose, testimonials }) => {
  const info = `${name} — ${description}`;
  return (
    <TestimonyComponent pose={pose}>
      <QuoteMark>
        <QuoteMarkIcon fill={palette.primary} />
      </QuoteMark>
      <Typography.Testimonial>{body}</Typography.Testimonial>
      <Typography.Meta>{info}</Typography.Meta>
    </TestimonyComponent>
  );
};

const Job = ({
  pose,
  id,
  createdAt,
  job_reference,
  job_title,
  job_type,
  job_start,
  job_duration,
  job_industry,
  salary_from,
  salary_to,
  salary_per,
  salary_benefits,
  job_skills,
  job_location,
  job_description
}) => {
  const salary = formatSalary(salary_from, salary_to, salary_per);
  return (
    <JobComponent pose={pose}>
      <Typography.Meta>{job_location}</Typography.Meta>
      <Typography.Input>{job_title}</Typography.Input>
      <Typography.Input>{salary}</Typography.Input>
      <Typography.Link
        to={`${route.jobs}/${toPostUrl({
          createdAt,
          title: job_title,
          job_reference
        })}`}
      >
        Job details
      </Typography.Link>
    </JobComponent>
  );
};

const Item = ({ item, pose }) => {
  let i = null;
  if (!item) return null;
  if (item.type == 'job') {
    i = <Job {...item} />;
  }
  if (item.type == 'testimonial') {
    i = <Testimony {...item} />;
  }
  return <PoseAnim pose={pose}>{i}</PoseAnim>;
};

export default ({ orangeArrows, loop, items: itemsNoType, noDots }) => {
  if (!itemsNoType.length) return null;
  const items = itemsNoType.map(x =>
    Object.assign(x, { type: x.job_reference ? 'job' : 'testimonial' })
  );

  const [isHover, setIsHover] = React.useState(false);

  const { index, pose, onPrev, onNext, onIndex } = useGallery({
    length: items.length,
    loop: loop,
    isHover
  });

  const item = items[index];

  return (
    <Slider
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Circle orangeArrows={orangeArrows} css={arrowLeftCss} onClick={onPrev}>
        <ArrowLeft
          stroke={orangeArrows ? palette.secondaryAccent : palette.accent}
        />
      </Circle>
      <Content>
        <Item item={item} pose={pose} />
        {noDots ? null : (
          <DotWrap>
            {items.length
              ? items.map((_, i) => (
                  <Dot key={i} active={i == index} onClick={onIndex(i)} />
                ))
              : null}
          </DotWrap>
        )}
      </Content>
      <Circle orangeArrows={orangeArrows} css={arrowRightCss} onClick={onNext}>
        <ArrowRight
          stroke={orangeArrows ? palette.secondaryAccent : palette.accent}
        />
      </Circle>
    </Slider>
  );
};
