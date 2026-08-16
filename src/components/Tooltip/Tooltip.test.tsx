import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

describe('Tooltip', () => {
  it('provides supplementary content on focus', async () => {
    render(
      <TooltipProvider delay={0}>
        <Tooltip>
          <TooltipTrigger aria-label="Save changes">Save</TooltipTrigger>
          <TooltipContent>Save changes</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    fireEvent.focus(screen.getByRole('button', { name: 'Save changes' }));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Save changes');
  });
});
