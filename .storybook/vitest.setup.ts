import '@testing-library/jest-dom/vitest';
import { setProjectAnnotations } from '@storybook/react';

import * as projectAnnotations from './preview';

setProjectAnnotations([projectAnnotations]);
