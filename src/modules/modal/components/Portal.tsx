import React from 'react';
import { createPortal } from 'react-dom';

import { usePortal } from 'modules/modal';

interface Props {
  id: string;
}

const Portal: React.FC<Props> = ({ id, children }) => {
  const target = usePortal(id);
  return createPortal(children, target);
};

export default Portal;
