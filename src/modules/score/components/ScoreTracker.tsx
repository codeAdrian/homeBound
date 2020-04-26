import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { ReactComponent as ScoreTrackerDeco } from 'assets/icons/circle_star.svg';
import { useScoreServices } from 'modules/score';
import { Heading } from 'components';

const SVG_STYLES = {
  rotation: 0.6,
  strokeLinecap: 'round',
  pathTransitionDuration: 0.5,
  pathColor: `#FF3C3C`,
  trailColor: 'rgba(48,53,72,0.1)',
};

interface Props {
  mode: 'small' | 'large';
}

export const ScoreTracker = ({ mode }: Props) => {
  const [{ userScore }] = useScoreServices();

  const score = userScore ? userScore.score : 0;

  const isLarge = mode === 'large';

  const getClassName = (component: string) =>
    isLarge
      ? `scoretracker__${component} scoretracker__${component}--large`
      : `scoretracker__${component}`;

  const fontSize = isLarge ? 'u-t__fontSize--xlarge' : 'u-t__fontSize--base';
  const mainClass = isLarge
    ? 'scoretracker scoretracker--large u-ab-center'
    : 'scoretracker';

  const textClass = getClassName('text');
  const decoClass = getClassName('deco');

  const valueClass = getClassName('value');
  return (
    <aside className={mainClass}>
      <CircularProgressbar
        value={score > 100 ? score % 100 : score}
        maxValue={100}
        circleRatio={0.8}
        styles={buildStyles(SVG_STYLES)}
      />
      <span className={valueClass}>
        <div
          className={`u-t__fontFamily--secondary ${fontSize} u-t__fontWeight--bold u-c-cta`}
        >
          {score}
        </div>
        <Heading
          tag="div"
          className={`${textClass} u-o-5 u-t__fontFamily--primary u-t__fontSize--xsmall u-t__fontWeight--medium`}
        >
          points
        </Heading>
      </span>
      <div className={decoClass}>
        <ScoreTrackerDeco />
      </div>
    </aside>
  );
};
