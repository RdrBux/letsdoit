import { useRef } from 'react';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';

export default function OutsideAlerter(props: any) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.action);

  return <div ref={wrapperRef}>{props.children}</div>;
}
