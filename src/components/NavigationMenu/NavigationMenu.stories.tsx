import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuTriggerLink
} from './NavigationMenu';

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  render: (args) => (
    <NavigationMenu {...args} aria-label="Primary navigation">
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink
              description="Compose focused interfaces from a closed visual system."
              href="#components"
            >
              Components
            </NavigationMenuLink>
            <NavigationMenuLink
              description="Use accessible behavior without rebuilding interaction details."
              href="#patterns"
            >
              Patterns
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink description="Start with the package essentials." href="#docs">
              Documentation
            </NavigationMenuLink>
            <NavigationMenuLink description="Review every supported component." href="#storybook">
              Storybook
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTriggerLink href="#about">About</NavigationMenuTriggerLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { defaultValue: 'products' }
};
