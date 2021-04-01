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
    parameters: {
        zeplinLink: "https://app.zeplin.io/project/5f6c0d45d65a054728b3c438/screen/5f6c14780ba84b35e48e7a35",
    },
}

const eventsFromObject = actions({ onChange: 'onChange' });

const Template = (args) => <TextAreaBox {...args} {...eventsFromObject} />
export const Normal = Template.bind({});

Normal.args = {
    isMaxText: true,
    maxLength: 20,
}
