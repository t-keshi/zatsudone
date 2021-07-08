import { ComponentMeta, ComponentStory } from '@storybook/react';
import musicNote from '../../../assets/musicNote.png';
import { CoverImage } from './CoverImage';

export default {
  title: 'UI/CoverImage',
  component: CoverImage,
} as ComponentMeta<typeof CoverImage>;

const Template: ComponentStory<typeof CoverImage> = () => (
  <CoverImage image={musicNote} title="musicNote" />
);

export const Primary = Template.bind({});
Primary.args = {};
