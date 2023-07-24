export function SlotRender (props, ctx) {
  let defaultSlot = ctx.slots.default;
  let { outSlots, slotData, slotName } = props;
  outSlots = outSlots || {};
  let outSlot = outSlots[slotName];
  if (outSlot) {
    return outSlot(slotData);
  } else if (defaultSlot) {
    return defaultSlot(slotData);
  }
};

SlotRender.props = ['outSlots', 'slotData', 'slotName']
