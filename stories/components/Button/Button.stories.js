import React from 'react';
import Button from './Button';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: { control: 'text' },
        children: { control: 'text' },
        onClick: { action: 'clicked' }
    }
}

/**
 * 1
 */
// export const Primary = () => <Button variant="primary">Primary</Button>
// export const Secondary = () => <Button variant="secondary">Secondary</Button>
// export const Success = () => <Button variant="success">Success</Button>
// export const Danger = () => <Button variant="danger">Danger</Button>

/**
 * 2
 */
const Template = args => <Button {...args} />
export const PrimaryA = Template.bind({});

PrimaryA.args = {
    variant: "primary",
    children: '安安',
}