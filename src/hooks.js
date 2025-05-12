import React from 'react';
import {
  uncurryN,
  filter,
  pipe,
  prop,
  map,
  has,
  F,
  T,
  ifElse,
  allPass,
  anyPass,
  contains
} from 'ramda';

export function useGallery({
  length,
  poseIn = 'in',
  poseOut = 'out',
  delay = 300,
  isHover,
  loop
}) {
  const [index, setIndex] = React.useState(0);
  const [hold, setHold] = React.useState(null);
  const [direction, setDirection] = React.useState(null);

  const newIndex = () => {
    switch (direction) {
      case 'next':
        return (index + 1) % length;
      case 'prev':
        return (index - 1 + length) % length;
      case 'index':
        return hold;
    }
  };

  React.useEffect(() => {
    if (direction) {
      setTimeout(() => {
        setIndex(newIndex());
        setHold(null);
        setDirection(null);
      }, delay);
    }
  }, [direction]);

  const interval = userInterval({
    startImmediate: false,
    duration: loop,
    callback: () => {
      if (loop) {
        setDirection('next');
      }
    }
  });

  React.useEffect(() => {
    isHover ? interval.stop() : interval.start();
  }, [isHover]);

  const onChange = d => _event => {
    if (!direction) {
      setDirection(d);
    }
  };

  const onIndex = hold => _event => {
    if (hold <= length) {
      setHold(hold);
      setDirection('index');
    }
  };

  return {
    index,
    pose: !direction ? poseIn : poseOut,
    onPrev: onChange('prev'),
    onNext: onChange('next'),
    onIndex: onIndex
  };
}

export function useToggle(initialState = false) {
  const [toggle, setToggle] = React.useState(initialState);
  return {
    toggle,
    setToggle,
    onToggle: _event => setToggle(!toggle)
  };
}

const getFilterSalary = ({ salary_to, salary_from }, salary = []) => {
  const s = salary.split('-') || [0, 0];
  const to = Number(s[0]);
  const from = Number(s[1]);
  return !(salary_to >= to && salary_from <= from);
};

const filterData = ({ filterSalary, filterType }, jobs) =>
  jobs.filter(job => {
    if (
      filterType &&
      filterType.value !== 'All' &&
      job.job_type !== filterType.value
    )
      return false;
    if (
      filterSalary &&
      filterSalary.value !== 'All' &&
      getFilterSalary(job, filterSalary.value)
    )
      return false;

    return true;
  });

const findDefaults = (options, filter, def) => {
  return options.find(x => filter == x.value) || def;
};

const optionsType = [
  { value: 'All', label: 'All terms' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Permanent', label: 'Permanent' },
  { value: 'Temporary', label: 'Temporary' }
];

const optionsSalary = [
  { value: 'All', label: 'All salaries' },
  { value: '20000-30000', label: '20 - 30k' },
  { value: '30000-50000', label: '30 - 50k' },
  { value: '50000-70000', label: '50 - 70k' },
  { value: '70000+', label: '70k +' }
];

export function useJobFilter({
  jobs = [],
  types = optionsType,
  salarys = optionsSalary,
  defaultSalaryFilter = {},
  defaultTypeFilter = {}
}) {
  const [filterSalary, setFilterSalary] = React.useState(
    findDefaults(optionsSalary, defaultSalaryFilter, optionsSalary[0])
  );
  const [filterType, setFilterType] = React.useState(
    findDefaults(optionsType, defaultTypeFilter, optionsType[0])
  );
  return {
    filteredJobs: filterData({ filterSalary, filterType }, jobs),
    optionsSalary,
    optionsType,
    setFilterSalary,
    filterSalary,
    filterType,
    setFilterType
  };
}

const filterTags = uncurryN(3, (tags, fn) =>
  filter(
    ifElse(
      has('tags'),
      pipe(
        prop('tags'),
        map(prop('tagName')),
        fn(map(contains, map(prop('value'), tags)))
      ),
      F
    )
  )
);

export const useBlogFilter = ({ blogs, tags = [] }) => {
  const defaultAll = { value: 'All', label: 'All tags' };
  const [filter, setBlogFilter] = React.useState(defaultAll);
  const isMulti = Array.isArray(filter);
  const showAll = !filter || filter.value == 'All';
  const filteredBlogs = showAll
    ? blogs
    : filterTags(
        isMulti ? filter : [filter],
        isMulti ? allPass : anyPass,
        blogs
      );

  return {
    filter,
    setBlogFilter,
    filteredBlogs,
    options: [defaultAll].concat(tags)
  };
};

const userInterval = ({ startImmediate, duration, callback }) => {
  const [count, updateCount] = React.useState(0);
  const [intervalState, setIntervalState] = React.useState(
    startImmediate === undefined ? true : startImmediate
  );
  const [intervalId, setIntervalId] = React.useState(null);

  React.useEffect(() => {
    if (intervalState) {
      const intervalId = setInterval(() => {
        updateCount(count + 1);
        callback && callback();
      }, duration);
      setIntervalId(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    };
  }, [intervalState, count]);
  return {
    intervalId,
    start: () => {
      setIntervalState(true);
    },
    stop: () => {
      setIntervalState(false);
    }
  };
};
