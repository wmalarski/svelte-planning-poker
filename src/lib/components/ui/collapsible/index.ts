import { Collapsible as CollapsiblePrimitive } from 'bits-ui';

import Content from './collapsible-content.svelte';

const Root = CollapsiblePrimitive.Root;
const Trigger = CollapsiblePrimitive.Trigger;

export {
	Content,
	Content as CollapsibleContent,
	Root,
	Root as Collapsible,
	Trigger,
	Trigger as CollapsibleTrigger
};
