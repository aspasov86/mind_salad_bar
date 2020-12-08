import { useState } from 'react';

function useHover() {
  const [itemHovered, setItemHovered] = useState(null);

  const mouseEnterHandler = id => () => setItemHovered(id);

  const onMouseLeave = () => setItemHovered(null);

  return [itemHovered, mouseEnterHandler, onMouseLeave];
}

export default useHover;
