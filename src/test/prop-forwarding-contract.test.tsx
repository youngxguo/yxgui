import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Input } from '../components/Input/Input';
import { Radio } from '../components/RadioGroup/RadioGroup';
import { Select } from '../components/Select/Select';
import { Switch } from '../components/Switch/Switch';
import { Textarea } from '../components/Textarea/Textarea';
import { expectForwardedCoreProps } from './propForwardingContract';

describe('public prop forwarding contracts', () => {
  describe('primitive form/control components', () => {
    it('forwards core native props and events on Button', () => {
      const onClick = vi.fn();
      const onFocus = vi.fn();

      render(
        <Button
          id="save-button"
          name="save"
          title="Save changes"
          data-contract="button"
          aria-label="Save"
          className="consumer-button"
          style={{ color: 'tomato' }}
          onClick={onClick}
          onFocus={onFocus}
          data-testid="target"
        >
          Save
        </Button>
      );

      const button = screen.getByTestId('target');
      expectForwardedCoreProps({
        element: button,
        id: 'save-button',
        name: 'save',
        title: 'Save changes',
        ariaLabel: 'Save',
        dataContract: 'button',
        className: 'consumer-button',
        styleColor: 'tomato'
      });

      fireEvent.click(button);
      fireEvent.focus(button);

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('forwards core native props and events on Input', () => {
      const onChange = vi.fn();
      const onFocus = vi.fn();

      render(
        <Input
          id="email"
          name="email"
          title="Email address"
          data-contract="input"
          aria-label="Email"
          className="consumer-input"
          style={{ color: 'tomato' }}
          onChange={onChange}
          onFocus={onFocus}
          data-testid="target"
        />
      );

      const input = screen.getByTestId('target');
      expectForwardedCoreProps({
        element: input,
        id: 'email',
        name: 'email',
        title: 'Email address',
        ariaLabel: 'Email',
        dataContract: 'input',
        className: 'consumer-input',
        styleColor: 'tomato'
      });

      fireEvent.change(input, { target: { value: 'a@example.com' } });
      fireEvent.focus(input);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('forwards core native props and events on Textarea', () => {
      const onChange = vi.fn();
      const onFocus = vi.fn();

      render(
        <Textarea
          id="notes"
          name="notes"
          title="Notes"
          data-contract="textarea"
          aria-label="Notes"
          className="consumer-textarea"
          style={{ color: 'tomato' }}
          onChange={onChange}
          onFocus={onFocus}
          data-testid="target"
        />
      );

      const textarea = screen.getByTestId('target');
      expectForwardedCoreProps({
        element: textarea,
        id: 'notes',
        name: 'notes',
        title: 'Notes',
        ariaLabel: 'Notes',
        dataContract: 'textarea',
        className: 'consumer-textarea',
        styleColor: 'tomato'
      });

      fireEvent.change(textarea, { target: { value: 'Hello' } });
      fireEvent.focus(textarea);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('forwards core native props and events on Select', () => {
      const onChange = vi.fn();
      const onFocus = vi.fn();

      render(
        <Select
          id="plan"
          name="plan"
          title="Plan"
          data-contract="select"
          aria-label="Plan"
          className="consumer-select"
          style={{ color: 'tomato' }}
          onChange={onChange}
          onFocus={onFocus}
          data-testid="target"
        >
          <option value="free">Free</option>
          <option value="pro">Pro</option>
        </Select>
      );

      const select = screen.getByTestId('target');
      expectForwardedCoreProps({
        element: select,
        id: 'plan',
        name: 'plan',
        title: 'Plan',
        ariaLabel: 'Plan',
        dataContract: 'select',
        className: 'consumer-select',
        styleColor: 'tomato'
      });

      fireEvent.change(select, { target: { value: 'pro' } });
      fireEvent.focus(select);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('forwards core native props and events on Checkbox', () => {
      const onChange = vi.fn();
      const onClick = vi.fn();
      const onFocus = vi.fn();

      render(
        <Checkbox
          id="updates"
          name="updates"
          title="Product updates"
          data-contract="checkbox"
          aria-label="Updates"
          className="consumer-checkbox"
          style={{ color: 'tomato' }}
          onChange={onChange}
          onClick={onClick}
          onFocus={onFocus}
          data-testid="target"
        />
      );

      const checkbox = screen.getByTestId('target');
      expectForwardedCoreProps({
        element: checkbox,
        id: 'updates',
        name: 'updates',
        title: 'Product updates',
        ariaLabel: 'Updates',
        dataContract: 'checkbox',
        className: 'consumer-checkbox',
        styleColor: 'tomato'
      });

      fireEvent.click(checkbox);
      fireEvent.change(checkbox, { target: { checked: true } });
      fireEvent.focus(checkbox);

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('forwards core native props and events on Switch', () => {
      const onClick = vi.fn();
      const onFocus = vi.fn();

      render(
        <Switch
          id="autosave"
          name="autosave"
          title="Autosave"
          data-contract="switch"
          aria-label="Autosave"
          className="consumer-switch"
          style={{ color: 'tomato' }}
          onClick={onClick}
          onFocus={onFocus}
          data-testid="target"
        />
      );

      const switchButton = screen.getByTestId('target');
      expectForwardedCoreProps({
        element: switchButton,
        id: 'autosave',
        name: 'autosave',
        title: 'Autosave',
        ariaLabel: 'Autosave',
        dataContract: 'switch',
        className: 'consumer-switch',
        styleColor: 'tomato'
      });

      fireEvent.click(switchButton);
      fireEvent.focus(switchButton);

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('forwards input props/events on Radio and applies className/style to the wrapper label', () => {
      const onChange = vi.fn();
      const onFocus = vi.fn();

      render(
        <Radio
          value="one"
          id="radio-one"
          name="choices"
          title="Choice one"
          data-contract="radio"
          aria-label="Choice one"
          className="consumer-radio"
          style={{ color: 'tomato' }}
          onChange={onChange}
          onFocus={onFocus}
          data-testid="target"
        >
          Choice one
        </Radio>
      );

      const radio = screen.getByTestId('target');
      expectForwardedCoreProps({
        element: radio,
        id: 'radio-one',
        name: 'choices',
        title: 'Choice one',
        ariaLabel: 'Choice one',
        dataContract: 'radio'
      });

      const label = screen.getByText('Choice one').closest('label');
      expect(label).not.toBeNull();
      expect(label?.className).toContain('consumer-radio');
      expect(label?.style.color).toBe('tomato');

      fireEvent.click(radio);
      fireEvent.focus(radio);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });
  });

  it('forwards representative props and handlers on a layout component (Card)', () => {
    const onClick = vi.fn();
    const onFocus = vi.fn();

    render(
      <Card
        id="layout-card"
        title="Card title attr"
        data-contract="card"
        aria-label="Card region"
        className="consumer-card"
        style={{ color: 'tomato' }}
        tabIndex={0}
        onClick={onClick}
        onFocus={onFocus}
        data-testid="target"
      >
        Body
      </Card>
    );

    const card = screen.getByTestId('target');
    expectForwardedCoreProps({
      element: card,
      id: 'layout-card',
      title: 'Card title attr',
      ariaLabel: 'Card region',
      dataContract: 'card',
      className: 'consumer-card',
      styleColor: 'tomato'
    });

    fireEvent.click(card);
    fireEvent.focus(card);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
