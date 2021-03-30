import React from 'react';
import { TextAreaBox } from './Button';
import { actions } from '@storybook/addon-actions';

export default {
    title: 'TextArea',
    component: TextAreaBox,
    argTypes: {
        maxLength: {
            description: '最大字數',
            default: '20',
            table: {
                type: {
                    summary: 'something short',
                    detail: 'something really really long'
                },
                defaultValue: { summary: '20' }
            },
        },
    },
}

const eventsFromObject = actions({ onChange: 'onChange' });

const Template = (args) => <TextAreaBox {...args} {...eventsFromObject} />
export const Normal = Template.bind({});

Normal.args = {
    isMaxText: true,
    maxLength: 20,
    maxLine: 2,
}
