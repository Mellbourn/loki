/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import createAsyncCallback from '@loki/create-async-callback';

import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';
import Logo from './Logo';
import ErrorThrowingComponent from './ErrorThrowingComponent';
import DelayedComponent from './DelayedComponent';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome />
));

storiesOf('Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ))
  .add(
    'loki.skip param story',
    () => (
      <Button>
        <Text>I am skipped</Text>
      </Button>
    ),
    { loki: { skip: true } }
  );

storiesOf('Asynchronous Render', module)
  .add('Logo without delay', () => <Logo />)
  .add('Logo with 1s delay', () => <Logo delay={1000} />)
  .add('createAsyncCallback with 1s delay', () => (
    <DelayedComponent delay={1000} onDone={createAsyncCallback()} />
  ));

storiesOf('Error Handling', module)
  .add('with ErrorThrowingComponent', () => <ErrorThrowingComponent />, {
    loki: { skip: true },
  })
  .add('with console.warn', () => {
    console.warn('This warning should not show up in the screenshot');
    return <Text>This story emits a console.warn</Text>;
  });
