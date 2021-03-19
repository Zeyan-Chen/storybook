import React from 'react';
import { action } from "@storybook/addon-actions";
import { withKnobs, object } from "@storybook/addon-knobs";
import Button from './Button';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['primary', 'secondary', 'success'],
            }
        },
        children: { control: 'text' },
    },
    decorators: [withKnobs],
    parameters: {
        zeplinLink: "https://app.zeplin.io/project/5f6c0d45d65a054728b3c438/screen/5fa25a13dcc940a739bcd7f9",
    },
}

const Template = args => <Button {...args} />

export const PrimaryA = Template.bind({});
PrimaryA.args = {
    variant: "primary",
    children: '安安',
    task: {
        id: "1",
        title: "primary1",
        state: "TASK_INBOX",
    },
}

export const PrimaryB = Template.bind({});
PrimaryB.args = {
    variant: "primary",
    children: '安安',
    task: object('format', {
        title: "primary1",
    }),
}

PrimaryB.defaultProps = {
    variant: "primary",
    children: '安安',
    task: object('format', {
        title: "primary2",
    }),
}
