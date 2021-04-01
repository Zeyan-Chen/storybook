import React from 'react';
import { TextAreaBox } from './textarea';
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
                    summary: 'string',
                },
                defaultValue: { summary: '20' }
            },
        },
        isMaxText: {
            description: '目前的字數'
        }
    },
}

const eventsFromObject = actions({ onChange: 'onChange' });

const Template = (args) => <TextAreaBox {...args} {...eventsFromObject} />
export const Normal = Template.bind({});

Normal.args = {
    isMaxText: true,
    maxLength: 20,
}
