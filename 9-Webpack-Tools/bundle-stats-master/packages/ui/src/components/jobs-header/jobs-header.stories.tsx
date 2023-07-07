import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { JobsHeader } from '.';

export default {
  title: 'Components/JobsHeader',
  component: JobsHeader,
  decorators: [getWrapperDecorator()],
};

export const Default = () => (
  <JobsHeader
    jobs={[
      {
        internalBuildNumber: 1,
        meta: {
          webpack: {
            builtAt: '2019-01-01T00:00:00.000Z',
            hash: 'abcd1234',
          },
        },
      },
    ]}
  />
);

export const MultipleJobs = () => (
  <JobsHeader
    jobs={[
      {
        internalBuildNumber: 1,
        meta: {
          webpack: {
            builtAt: '2019-01-01T00:00:00.000Z',
            hash: 'abcd1234',
          },
        },
      },
      {
        internalBuildNumber: 2,
        meta: {
          webpack: {
            builtAt: '2019-01-02T00:00:00.000Z',
            hash: 'efgh1234',
          },
        },
      },
    ]}
  />
);
