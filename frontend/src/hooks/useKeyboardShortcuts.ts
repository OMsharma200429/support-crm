import { useEffect } from 'react';

export const useKeyboardShortcuts = ({
  onToggleSearch,
  onSubmitComposer,
}: {
  onToggleSearch?: () => void;
  onSubmitComposer?: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const metaOrCtrl = event.metaKey || event.ctrlKey;

      if (metaOrCtrl && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onToggleSearch?.();
      }

      if (metaOrCtrl && event.key === 'Enter' && onSubmitComposer) {
        event.preventDefault();
        onSubmitComposer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleSearch, onSubmitComposer]);
};
