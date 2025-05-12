import React from 'react';
import styled from 'styled-components';
import { media, sizes, palette, Typography, MetaCss } from '../style';
import PlayIcon from '../components/icons/Play';
import PauseIcon from '../components/icons/Pause';
import MuteIcon from '../components/icons/Mute';
import UnMuteIcon from '../components/icons/UnMute';
import FullScreenIcon from '../components/icons/FullScreen';

import {
  Media,
  Player as Player_,
  controls,
  withMediaProps
} from 'react-media-player';

const {
  MuteUnmute,
  CurrentTime,
  Progress,
  SeekBar,
  Duration,
  Volume,
  Fullscreen
} = controls;

const Main = styled.div`
  section {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    transition-delay: 0.2s;
  }

  :hover section {
    opacity: 1;
  }

  :hover span {
    opacity: 1;
  }
`;

const Video = withMediaProps(styled.div`
  position: relative;
  background-image: url(${({ cover }) => cover});
  background-size: cover;
  video {
    opacity: ${({ media }) => {
      return media.currentTime == 0 ? 0 : 1;
    }};
  }
`);

const Player = withMediaProps(styled.video`
  display: flex;
  height: auto;
  width: 100%;
  ${media.mobile`
     height: auto;
     width: 100%;
  `};
  ${media.desktop`
      height: auto;
      width: 100%;
  `};
`);

const PlayTime = styled(Typography.Body)`
  color: ${palette.accent};
`;

const Controls = styled.section`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  color: white;
  padding: 2rem 3rem;
  height: 6.5rem;
  background: ${palette.primary};
  grid-template-columns: max-content auto repeat(2, 2rem);
  grid-gap: 3rem;
  align-items: center;
  ${media.mobile`
    display: none;  
  `};

  input {
    width: 100;
  }

  svg {
    width: 2rem;
    height: 2rem;
    display: flex;
  }

  > * {
    font-family: 'Montserrat';
    font-size: 14px;
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    color: ${palette.accent};
  }

  button {
    display: inline-grid;
  }

  input[type='range'] {
    -webkit-appearance: none;
    margin: 0;
    background: transparent;
    width: 100%;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    cursor: pointer;
    background: #ffffff5e;
    border-radius: 0.2rem;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    outline: none;
    height: 1rem;
    width: 1rem;
    border-radius: 10rem;
    background: ${palette.accent};
    cursor: pointer;
  }
`;

const MuteWrap = styled.span`
  svg {
    width: 2.5rem;
    height: 2.3rem;
    top: -1px;
    position: relative;
  }
`;

const FullButton = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  top: 0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.span`
  width: 12rem;
  height: 12rem;
  background: ${palette.accent};
  border-radius: 100rem;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ isPlaying }) => (isPlaying ? 0 : 'initial')};
  transition: opacity 0.2s ease-in-out;
  transition-delay: 0.2s;
  svg {
    margin-left: ${({ isPlaying }) => (isPlaying ? 0 : 0.5)}rem;
  }

  ${media.mobile`
    width: 6rem;
    height: 6rem;
    svg {
      width: 2rem;
      height: 2rem;
    }
  `};
`;

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      controls: false
    };
  }

  render() {
    return (
      <Media>
        <Main>
          <Video cover={this.props.poster} className="media-player">
            <Player as={Player_} autoPlay={false} src={this.props.src} />
            <FullPlayPause />
            <Controls>
              <ShowTime />
              <SeekBar />
              <SmallMuteUnmute />
              <SmallFullScreen />
            </Controls>
          </Video>
        </Main>
      </Media>
    );
  }
}
const memoIsPlaying = comp =>
  withMediaProps(
    React.memo(comp, (p, n) => {
      p.media.isPlaying !== n.media.isPlaying;
    })
  );

function formatTime(current) {
  let h = Math.floor(current / 3600);
  let m = Math.floor((current - h * 3600) / 60);
  let s = Math.floor(current % 60);
  if (s < 10) s = '0' + s;
  if (h > 0) {
    m = m < 10 ? `0${m}` : m;
    return h + ':' + m + ':' + s;
  } else {
    return m + ':' + s;
  }
}

const FullPlayPause = memoIsPlaying(({ style, className, media }) => {
  return (
    <FullButton
      type="button"
      className={className}
      style={style}
      onClick={() => media.playPause()}
    >
      <Circle isPlaying={media.isPlaying}>
        {media.isPlaying ? (
          <PauseIcon fill={'white'} />
        ) : (
          <PlayIcon fill={'white'} />
        )}
      </Circle>
    </FullButton>
  );
});

const SmallPlayPause = memoIsPlaying(({ style, className, media }) => {
  return (
    <div className={className} style={style} onClick={() => media.playPause()}>
      {media.isPlaying ? (
        <PauseIcon fill={palette.accent} />
      ) : (
        <PlayIcon fill={palette.accent} />
      )}
    </div>
  );
});

const SmallMuteUnmute = memoIsPlaying(({ style, className, media }) => {
  return (
    <div className={className} style={style} onClick={() => media.muteUnmute()}>
      {media.isMuted ? (
        <MuteWrap>
          <MuteIcon fill={palette.accent} />
        </MuteWrap>
      ) : (
        <UnMuteIcon fill={palette.accent} />
      )}
    </div>
  );
});

const SmallFullScreen = memoIsPlaying(({ style, className, media }) => {
  return (
    <div className={className} style={style} onClick={() => media.fullscreen()}>
      <FullScreenIcon fill={palette.accent} />
    </div>
  );
});

const ShowTime = memoIsPlaying(({ style, className, media }) => {
  return (
    <PlayTime>
      {formatTime(media.currentTime)}
      {'-'}
      {formatTime(media.duration)}
    </PlayTime>
  );
});
