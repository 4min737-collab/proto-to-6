import { useEffect, useState } from 'react';

interface Props {
  message: string;
  trigger: number;
}

export default function Toast({ message, trigger }: Props) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!message || trigger === 0) return;
    setText(message);
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, [message, trigger]);

  return (
    <div className={`toast${visible ? ' show' : ''}`}>{text}</div>
  );
}
