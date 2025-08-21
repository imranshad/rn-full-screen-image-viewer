# Full Screen Image Viewer (React Native)

A lightweight full-screen image viewer with pinch/double-tap zoom and swipe-to-close.

## Install

```bash
npm install @thelonggame/full-screen-image-viewer
```

## Usage

```tsx
import { useState } from 'react';
import { Button } from 'react-native';
import { FullScreenImageViewer } from '@thelonggame/full-screen-image-viewer';

function Example() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button title="Open" onPress={() => setVisible(true)} />
      <FullScreenImageViewer
        visible={visible}
        onRequestClose={() => setVisible(false)}
        imageSrc={{ uri: 'https://picsum.photos/800/1200' }}
        swipeToCloseEnabled
        doubleTapToZoomEnabled
        swipeCloseSensitivity={7}
      />
    </>
  );
}
```

## Props

- imageSrc: Image source.
- visible: Controls modal visibility.
- onRequestClose: Called to close viewer.
- onLongPress?: Long-press callback.
- presentationStyle?: Modal presentation style.
- animationType?: Modal animation type.
- backgroundColor?: Background color.
- swipeToCloseEnabled?: Enable vertical swipe-to-close.
- doubleTapToZoomEnabled?: Enable double tap to zoom.
- delayLongPress?: Long-press delay (ms).
- swipeCloseSensitivity?: 1 (hard) .. 10 (easy) velocity to close.

## License

MIT